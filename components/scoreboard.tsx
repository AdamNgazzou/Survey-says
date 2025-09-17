"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Edit2, Check, X, Crown, Trophy, Medal } from "lucide-react"

interface ScoreboardProps {
  teamScores: { team1: number; team2: number }
  teamNames: { team1: string; team2: string }
  onUpdateTeamNames: (names: { team1: string; team2: string }) => void
}

export function Scoreboard({ teamScores, teamNames, onUpdateTeamNames }: ScoreboardProps) {
  const [editingTeam, setEditingTeam] = useState<"team1" | "team2" | null>(null)
  const [tempName, setTempName] = useState("")

  const startEditing = (team: "team1" | "team2") => {
    setEditingTeam(team)
    setTempName(teamNames[team])
  }

  const saveTeamName = () => {
    if (editingTeam && tempName.trim()) {
      onUpdateTeamNames({
        ...teamNames,
        [editingTeam]: tempName.trim(),
      })
    }
    setEditingTeam(null)
    setTempName("")
  }

  const cancelEditing = () => {
    setEditingTeam(null)
    setTempName("")
  }

  const winningTeam =
    teamScores.team1 > teamScores.team2 ? "team1" : teamScores.team2 > teamScores.team1 ? "team2" : null

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8">
      {(
        [
          ["team1", "Team 1"],
          ["team2", "Team 2"],
        ] as const
      ).map(([team, defaultName], index) => (
        <Card
          key={team}
          className={`border-3 transition-all duration-500 transform hover:scale-[1.02] ${
            winningTeam === team
              ? team === "team1"
                ? "border-blue-500 bg-gradient-to-br from-blue-500/15 via-blue-500/10 to-blue-500/5 shadow-2xl animate-pulse-glow ring-2 ring-blue-500/30"
                : "border-red-500 bg-gradient-to-br from-red-500/15 via-red-500/10 to-red-500/5 shadow-2xl animate-pulse-glow ring-2 ring-red-500/30"
              : team === "team1"
                ? "border-blue-500/30 bg-gradient-to-br from-blue-500/8 via-blue-500/5 to-card shadow-lg hover:border-blue-500/50 hover:shadow-xl"
                : "border-red-500/30 bg-gradient-to-br from-red-500/8 via-red-500/5 to-card shadow-lg hover:border-red-500/50 hover:shadow-xl"
          }`}
        >
          <CardContent className="p-4 sm:p-8 text-center">
            <div className="flex items-center justify-center gap-2 sm:gap-3 mb-4 sm:mb-6">
              {winningTeam === team && (
                <div className="animate-bounce-in">
                  <Crown
                    className={`h-5 w-5 sm:h-7 sm:w-7 ${team === "team1" ? "text-blue-500" : "text-red-500"} fill-current`}
                  />
                </div>
              )}
              {editingTeam === team ? (
                <div className="flex items-center gap-2 w-full">
                  <Input
                    value={tempName}
                    onChange={(e) => setTempName(e.target.value)}
                    className={`h-10 sm:h-12 text-center font-bold text-lg sm:text-xl border-2 ${
                      team === "team1" ? "focus:border-blue-500" : "focus:border-red-500"
                    }`}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") saveTeamName()
                      if (e.key === "Escape") cancelEditing()
                    }}
                    autoFocus
                  />
                  <Button size="sm" variant="ghost" onClick={saveTeamName} className="hover:bg-primary/10">
                    <Check className="h-4 w-4 text-primary" />
                  </Button>
                  <Button size="sm" variant="ghost" onClick={cancelEditing} className="hover:bg-accent/10">
                    <X className="h-4 w-4 text-accent" />
                  </Button>
                </div>
              ) : (
                <div className="flex items-center gap-2 sm:gap-3 group">
                  <h3
                    className={`text-lg sm:text-2xl font-black transition-colors duration-300 ${
                      team === "team1"
                        ? "text-blue-600 group-hover:text-blue-500"
                        : "text-red-600 group-hover:text-red-500"
                    }`}
                  >
                    {teamNames[team]}
                  </h3>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => startEditing(team)}
                    className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-primary/10"
                  >
                    <Edit2 className="h-4 w-4 text-primary" />
                  </Button>
                </div>
              )}
            </div>

            <div className="relative mb-4 sm:mb-6">
              <div
                className={`text-4xl sm:text-7xl font-black transition-all duration-500 ${
                  winningTeam === team
                    ? team === "team1"
                      ? "bg-gradient-to-r from-blue-500 to-blue-400 bg-clip-text text-transparent animate-bounce-in"
                      : "bg-gradient-to-r from-red-500 to-red-400 bg-clip-text text-transparent animate-bounce-in"
                    : team === "team1"
                      ? "text-blue-600"
                      : "text-red-600"
                }`}
              >
                {teamScores[team]}
              </div>
              {winningTeam === team && (
                <div
                  className="absolute -top-2 sm:-top-3 -right-2 sm:-right-3 animate-bounce-in"
                  style={{ animationDelay: "200ms" }}
                >
                  <Trophy
                    className={`h-6 w-6 sm:h-10 sm:w-10 ${team === "team1" ? "text-blue-500" : "text-red-500"} fill-current`}
                  />
                </div>
              )}
              {winningTeam && winningTeam !== team && teamScores[team] > 0 && (
                <div
                  className="absolute -top-1 sm:-top-2 -right-1 sm:-right-2 animate-bounce-in"
                  style={{ animationDelay: "300ms" }}
                >
                  <Medal
                    className={`h-6 w-6 sm:h-8 sm:w-8 ${team === "team1" ? "text-blue-400" : "text-red-400"} fill-current`}
                  />
                </div>
              )}
            </div>

            <div className="mt-4">
              <div
                className={`inline-flex items-center px-3 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-bold transition-all duration-300 ${
                  winningTeam === team
                    ? team === "team1"
                      ? "bg-blue-100 text-blue-800 ring-2 ring-blue-500/30"
                      : "bg-red-100 text-red-800 ring-2 ring-red-500/30"
                    : teamScores[team] > 0
                      ? team === "team1"
                        ? "bg-blue-50 text-blue-700"
                        : "bg-red-50 text-red-700"
                      : "bg-gray-100 text-gray-800 border border-gray-300"
                }`}
              >
                {winningTeam === team
                  ? "🏆 Leading the Game"
                  : teamScores[team] > 0
                    ? "💪 Scoring Points"
                    : "🎯 Ready to Play"}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
