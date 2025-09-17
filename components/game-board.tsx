"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, RotateCcw, ChevronRight, ChevronLeft, Gamepad2, Sparkles } from "lucide-react"
import { Scoreboard } from "@/components/scoreboard"
import { AnswerBoard } from "@/components/answer-board"
import { TeamSelector } from "@/components/team-selector"

interface GameBoardProps {
  game: any
  onBackToMenu: () => void
}

export function GameBoard({ game, onBackToMenu }: GameBoardProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [teamScores, setTeamScores] = useState({ team1: 0, team2: 0 })
  const [teamNames, setTeamNames] = useState({ team1: "Team 1", team2: "Team 2" })
  const [revealedAnswers, setRevealedAnswers] = useState<Set<number>>(new Set())
  const [showTeamSelector, setShowTeamSelector] = useState(false)
  const [pendingPoints, setPendingPoints] = useState<number>(0)
  const [pendingAssignment, setPendingAssignment] = useState<number | null>(null)
  const [answerAssignments, setAnswerAssignments] = useState<Record<number, "team1" | "team2" | null>>({})

  const currentQuestion = game.questions[currentQuestionIndex]

  const handleRevealAnswer = (answerIndex: number, points: number) => {
    setRevealedAnswers((prev) => new Set([...prev, answerIndex]))
  }

  const handleShowTeamSelector = (answerIndex: number, points: number) => {
    setPendingPoints(points)
    setPendingAssignment(answerIndex)
    setShowTeamSelector(true)
  }

  const handleAssignPoints = (team: "team1" | "team2") => {
    const currentAssignment = answerAssignments[pendingAssignment!]
    if (currentAssignment && currentAssignment !== team) {
      // Remove points from the previously assigned team
      setTeamScores((prev) => ({
        ...prev,
        [currentAssignment]: prev[currentAssignment] - pendingPoints,
      }))
    }

    if (currentAssignment !== team) {
      setTeamScores((prev) => ({
        ...prev,
        [team]: prev[team] + pendingPoints,
      }))
    }

    setAnswerAssignments((prev) => ({
      ...prev,
      [pendingAssignment!]: team,
    }))

    setPendingPoints(0)
    setPendingAssignment(null)
    setShowTeamSelector(false)
  }

  const nextQuestion = () => {
    if (currentQuestionIndex < game.questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1)
      setRevealedAnswers(new Set())
      setPendingAssignment(null)
      setShowTeamSelector(false)
      setAnswerAssignments({})
    }
  }

  const prevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1)
      setRevealedAnswers(new Set())
      setPendingAssignment(null)
      setShowTeamSelector(false)
      setAnswerAssignments({})
    }
  }

  const resetGame = () => {
    setCurrentQuestionIndex(0)
    setTeamScores({ team1: 0, team2: 0 })
    setRevealedAnswers(new Set())
    setPendingPoints(0)
    setPendingAssignment(null)
    setShowTeamSelector(false)
    setAnswerAssignments({})
  }

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-8 space-y-4 sm:space-y-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 animate-slide-up">
          <Button
            variant="outline"
            onClick={onBackToMenu}
            className="gap-2 bg-card/80 backdrop-blur-sm border-2 hover:border-primary/50 hover:bg-primary/10 transition-all duration-300 font-semibold w-full sm:w-auto"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Menu
          </Button>

          <div className="text-center flex-1">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Gamepad2 className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
              <h1 className="text-2xl sm:text-4xl font-black bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                {game.title}
              </h1>
              <Sparkles className="h-4 w-4 sm:h-6 sm:w-6 text-accent animate-pulse" />
            </div>
            <Badge
              variant="secondary"
              className="mt-2 bg-gradient-to-r from-primary/20 to-accent/20 border-primary/30 text-sm sm:text-lg font-bold px-3 sm:px-4 py-1 sm:py-2"
            >
              Question {currentQuestionIndex + 1} of {game.questions.length}
            </Badge>
          </div>

          <Button
            variant="outline"
            onClick={resetGame}
            className="gap-2 bg-card/80 backdrop-blur-sm border-2 hover:border-accent/50 hover:bg-accent/10 transition-all duration-300 font-semibold w-full sm:w-auto"
          >
            <RotateCcw className="h-4 w-4" />
            Reset
          </Button>
        </div>

        <div className="animate-slide-up" style={{ animationDelay: "100ms" }}>
          <Scoreboard teamScores={teamScores} teamNames={teamNames} onUpdateTeamNames={setTeamNames} />
        </div>

        <Card
          className="border-3 border-primary/30 bg-gradient-to-r from-card/90 via-card to-card/90 backdrop-blur-sm shadow-2xl animate-slide-up"
          style={{ animationDelay: "200ms" }}
        >
          <CardHeader className="text-center bg-gradient-to-r from-primary/10 via-accent/5 to-primary/10 py-4 sm:py-8">
            <CardTitle className="text-xl sm:text-3xl md:text-4xl font-black bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent text-balance leading-tight px-2">
              {currentQuestion.question}
            </CardTitle>
          </CardHeader>
        </Card>

        <div className="animate-slide-up" style={{ animationDelay: "300ms" }}>
          <AnswerBoard
            answers={currentQuestion.answers}
            revealedAnswers={revealedAnswers}
            onRevealAnswer={handleRevealAnswer}
            pendingAssignment={pendingAssignment}
            onShowTeamSelector={handleShowTeamSelector}
            answerAssignments={answerAssignments}
          />
        </div>

        <div
          className="flex flex-col sm:flex-row justify-between items-center gap-4 animate-slide-up"
          style={{ animationDelay: "400ms" }}
        >
          <Button
            variant="outline"
            onClick={prevQuestion}
            disabled={currentQuestionIndex === 0}
            className="gap-2 bg-card/80 backdrop-blur-sm border-2 hover:border-primary/50 hover:bg-primary/10 transition-all duration-300 font-semibold disabled:opacity-50 w-full sm:w-auto order-2 sm:order-1"
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Button>

          <div className="text-center bg-card/80 backdrop-blur-sm rounded-lg px-4 sm:px-6 py-3 border-2 border-muted order-1 sm:order-2 w-full sm:w-auto">
            <p className="text-sm sm:text-lg font-semibold text-foreground mb-1">
              Progress: {revealedAnswers.size} / {currentQuestion.answers.length}
            </p>
            <div className="w-full sm:w-32 h-2 bg-muted rounded-full overflow-hidden mx-auto">
              <div
                className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-500"
                style={{ width: `${(revealedAnswers.size / currentQuestion.answers.length) * 100}%` }}
              />
            </div>
          </div>

          <Button
            variant="outline"
            onClick={nextQuestion}
            disabled={currentQuestionIndex === game.questions.length - 1}
            className="gap-2 bg-card/80 backdrop-blur-sm border-2 hover:border-primary/50 hover:bg-primary/10 transition-all duration-300 font-semibold disabled:opacity-50 w-full sm:w-auto order-3"
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        {/* Team Selector Modal */}
        {showTeamSelector && (
          <TeamSelector
            pendingPoints={pendingPoints}
            teamNames={teamNames}
            onAssignPoints={handleAssignPoints}
            onCancel={() => {
              setShowTeamSelector(false)
              setPendingAssignment(null)
            }}
          />
        )}
      </div>
    </div>
  )
}
