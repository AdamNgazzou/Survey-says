"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, X, Trophy, Zap, Star } from "lucide-react"

interface TeamSelectorProps {
  pendingPoints: number
  teamNames: { team1: string; team2: string }
  onAssignPoints: (team: "team1" | "team2") => void
  onCancel: () => void
}

export function TeamSelector({ pendingPoints, teamNames, onAssignPoints, onCancel }: TeamSelectorProps) {
  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-slide-up">
      <Card className="w-full max-w-2xl border-3 border-primary shadow-2xl bg-card/95 backdrop-blur-md animate-bounce-in">
        <CardHeader className="text-center bg-gradient-to-r from-primary/15 via-primary/10 to-accent/15 border-b border-primary/30">
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center gap-4 text-2xl font-black">
              <div className="p-3 rounded-full bg-gradient-to-r from-primary/20 to-accent/20 ring-2 ring-primary/30">
                <Trophy className="h-7 w-7 text-primary" />
              </div>
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Assign Points
              </span>
            </span>
            <Button variant="ghost" size="sm" onClick={onCancel} className="hover:bg-accent/10 rounded-full">
              <X className="h-6 w-6 text-muted-foreground hover:text-accent transition-colors" />
            </Button>
          </CardTitle>
          <div className="flex items-center justify-center gap-3 mt-4">
            <Star className="h-6 w-6 text-accent fill-accent animate-pulse" />
            <Badge
              variant="secondary"
              className="text-3xl font-black py-4 px-8 bg-gradient-to-r from-accent via-accent/90 to-accent/80 text-accent-foreground shadow-xl animate-pulse-glow border-2 border-accent/30"
            >
              <Zap className="h-7 w-7 mr-3" />+{pendingPoints} Points
            </Badge>
            <Star className="h-6 w-6 text-accent fill-accent animate-pulse" />
          </div>
        </CardHeader>
        <CardContent className="p-10 space-y-8">
          <p className="text-center text-xl font-semibold text-muted-foreground">Which team guessed this answer?</p>
          <div className="grid grid-cols-2 gap-8">
            <Button
              onClick={() => onAssignPoints("team1")}
              className="h-24 text-2xl font-black bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 border-2 border-blue-500/30 hover:border-blue-400/50"
              variant="default"
            >
              <div className="flex flex-col items-center gap-3">
                <Users className="h-8 w-8" />
                <span className="text-balance leading-tight">{teamNames.team1}</span>
              </div>
            </Button>
            <Button
              onClick={() => onAssignPoints("team2")}
              className="h-24 text-2xl font-black bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 border-2 border-red-500/30 hover:border-red-400/50"
              variant="secondary"
            >
              <div className="flex flex-col items-center gap-3">
                <Users className="h-8 w-8" />
                <span className="text-balance leading-tight">{teamNames.team2}</span>
              </div>
            </Button>
          </div>
          <p className="text-center text-sm text-muted-foreground/80 italic">
            Click a team to assign the points, or press ESC to cancel
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
