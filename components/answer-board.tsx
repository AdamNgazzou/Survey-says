"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Eye, Users, Zap, Crown, Trophy } from "lucide-react"

interface Answer {
  text: string
  points: number
}

interface AnswerBoardProps {
  answers: Answer[]
  revealedAnswers: Set<number>
  onRevealAnswer: (index: number, points: number) => void
  pendingAssignment: number | null
  onShowTeamSelector: (index: number, points: number) => void
  answerAssignments: Record<number, "team1" | "team2" | null>
}

export function AnswerBoard({
  answers,
  revealedAnswers,
  onRevealAnswer,
  pendingAssignment,
  onShowTeamSelector,
  answerAssignments,
}: AnswerBoardProps) {
  const getGridCols = () => {
    const count = answers.length
    if (count <= 2) return "grid-cols-1 sm:grid-cols-2"
    if (count === 3) return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
    if (count === 4) return "grid-cols-1 sm:grid-cols-2"
    if (count === 5) return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
    return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
  }

  return (
    <div className={`grid gap-3 sm:gap-6 ${getGridCols()}`}>
      {answers.map((answer, index) => {
        const isRevealed = revealedAnswers.has(index)
        const isPending = pendingAssignment === index
        const assignedTeam = answerAssignments[index]

        return (
          <Card
            key={index}
            className={`border-2 transition-all duration-700 transform hover:scale-[1.02] ${
              isRevealed
                ? isPending
                  ? "border-accent bg-gradient-to-br from-accent/20 via-accent/10 to-accent/5 shadow-2xl ring-4 ring-accent/30 backdrop-blur-sm animate-pulse-glow"
                  : assignedTeam === "team1"
                    ? "border-blue-500 bg-gradient-to-br from-blue-500/20 via-blue-500/10 to-blue-500/5 shadow-xl backdrop-blur-sm animate-flip-card ring-2 ring-blue-500/30"
                    : assignedTeam === "team2"
                      ? "border-red-500 bg-gradient-to-br from-red-500/20 via-red-500/10 to-red-500/5 shadow-xl backdrop-blur-sm animate-flip-card ring-2 ring-red-500/30"
                      : "border-primary/50 bg-gradient-to-br from-primary/15 via-primary/10 to-primary/5 shadow-xl backdrop-blur-sm animate-flip-card"
                : "border-dashed border-muted-foreground/40 hover:border-primary/60 hover:shadow-lg hover:bg-gradient-to-br hover:from-primary/8 hover:to-accent/8 backdrop-blur-sm cursor-pointer"
            }`}
          >
            <CardContent className="p-3 sm:p-6">
              {isRevealed ? (
                <div className="space-y-3 sm:space-y-4 animate-bounce-in">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 sm:gap-2 mb-2 sm:mb-3">
                      {index === 0 && <Crown className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-500 fill-yellow-500" />}
                      {index === 1 && <Trophy className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 fill-gray-400" />}
                      <span className="text-base sm:text-lg font-black text-primary">#{index + 1}</span>
                      {index === 0 && <Crown className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-500 fill-yellow-500" />}
                      {index === 1 && <Trophy className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 fill-gray-400" />}
                    </div>

                    <div className="text-sm sm:text-lg font-bold text-foreground leading-relaxed tracking-wide mb-2 sm:mb-3 text-balance">
                      {answer.text}
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-0">
                    <Badge
                      variant="secondary"
                      className="text-base sm:text-lg font-black bg-gradient-to-r from-primary via-primary/90 to-accent text-primary-foreground px-3 sm:px-5 py-1.5 sm:py-2.5 shadow-lg border-2 border-primary/20"
                    >
                      <Zap className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                      {answer.points}
                    </Badge>

                    {!isPending && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onShowTeamSelector(index, answer.points)}
                        className={`h-8 sm:h-9 px-3 sm:px-4 text-xs sm:text-sm gap-1 sm:gap-2 transition-all duration-300 font-semibold w-full sm:w-auto ${
                          assignedTeam === "team1"
                            ? "bg-gradient-to-r from-blue-500/20 to-blue-500/10 hover:from-blue-500/30 hover:to-blue-500/15 border-blue-500/60 hover:border-blue-500/80 text-blue-600"
                            : assignedTeam === "team2"
                              ? "bg-gradient-to-r from-red-500/20 to-red-500/10 hover:from-red-500/30 hover:to-red-500/15 border-red-500/60 hover:border-red-500/80 text-red-600"
                              : "bg-gradient-to-r from-accent/15 to-accent/10 hover:from-accent/25 hover:to-accent/15 border-accent/50 hover:border-accent/70"
                        }`}
                      >
                        <Users className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                        {assignedTeam ? "Reassign" : "Assign"}
                      </Button>
                    )}
                    {isPending && (
                      <Badge
                        variant="outline"
                        className="text-xs sm:text-sm border-accent text-accent animate-pulse font-semibold px-2 sm:px-3 py-1"
                      >
                        <Users className="h-3 w-3 mr-1" />
                        Assigning...
                      </Badge>
                    )}
                  </div>

                  {assignedTeam && (
                    <div className="text-center">
                      <Badge
                        variant="outline"
                        className={`text-xs font-medium px-2 sm:px-3 py-1 ${
                          assignedTeam === "team1"
                            ? "border-blue-500/50 text-blue-600 bg-blue-500/10"
                            : "border-red-500/50 text-red-600 bg-red-500/10"
                        }`}
                      >
                        Assigned to {assignedTeam === "team1" ? "Team 1" : "Team 2"}
                      </Badge>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center justify-between group">
                  <div className="flex-1 h-6 sm:h-8 bg-gradient-to-r from-muted via-muted/80 to-muted/60 rounded-xl flex items-center justify-center shadow-inner border border-muted-foreground/20">
                    <span className="text-muted-foreground font-mono text-sm sm:text-base font-bold tracking-wider">
                      #{index + 1}
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onRevealAnswer(index, answer.points)}
                    className="ml-2 sm:ml-4 h-8 sm:h-9 px-3 sm:px-4 text-xs sm:text-sm gap-1 sm:gap-2 hover:bg-gradient-to-r hover:from-primary/15 hover:to-accent/15 hover:text-primary transition-all duration-300 rounded-xl group-hover:scale-110 font-semibold"
                  >
                    <Eye className="h-3 w-3 sm:h-4 sm:w-4" />
                    Reveal
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
