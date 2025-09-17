"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Play, Users, HelpCircle, Sparkles, Plus, Calendar, Trash2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { gameStorage, type Game } from "@/lib/game-storage"
import { useState } from "react"

interface GameSelectorProps {
  games: Game[]
  onSelectGame: (game: Game) => void
  onRefreshGames: () => void
}

export function GameSelector({ games, onSelectGame, onRefreshGames }: GameSelectorProps) {
  const router = useRouter()
  const [deletingGame, setDeletingGame] = useState<string | null>(null)

  const handleCreateGame = () => {
    router.push("/create")
  }

  const handleDeleteGame = async (gameId: string, event: React.MouseEvent) => {
    event.stopPropagation()

    if (confirm("Are you sure you want to delete this game?")) {
      setDeletingGame(gameId)
      try {
        gameStorage.deleteGame(gameId)
        onRefreshGames()
      } catch (error) {
        alert("Failed to delete game. Please try again.")
      } finally {
        setDeletingGame(null)
      }
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  const customGames = games.filter((game) => !game.id.startsWith("sample-"))
  const sampleGamesList = games.filter((game) => game.id.startsWith("sample-"))

  return (
    <div className="container mx-auto px-2 sm:px-4 py-8 sm:py-16">
      <div className="text-center mb-12 sm:mb-16 animate-bounce-in">
        <div className="relative inline-block">
          <h1 className="text-4xl sm:text-7xl md:text-8xl font-black bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent mb-4 sm:mb-6 text-balance leading-tight">
            Survey Says!
          </h1>
          <Sparkles className="absolute -top-2 sm:-top-4 -right-2 sm:-right-4 h-6 w-6 sm:h-8 sm:w-8 text-accent animate-pulse" />
          <Sparkles className="absolute -bottom-1 sm:-bottom-2 -left-3 sm:-left-6 h-4 w-4 sm:h-6 sm:w-6 text-primary animate-pulse delay-300" />
        </div>
        <p className="text-base sm:text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto text-pretty leading-relaxed px-4">
          Host your own <span className="font-semibold text-primary">Family Feud</span> style game show. Create custom
          games or select from our collection to get started!
        </p>
      </div>

      {/* Create Game Button */}
      <div className="text-center mb-12 animate-slide-up" style={{ animationDelay: "200ms" }}>
        <Button
          onClick={handleCreateGame}
          className="gap-3 !bg-gradient-to-r !from-accent !to-primary hover:!from-accent/90 hover:!to-primary/90 !text-white font-bold text-lg h-14 px-8 shadow-xl hover:shadow-2xl transition-all duration-300 animate-pulse-glow"
          size="lg"
        >
          <Plus className="h-6 w-6" />
          Create New Game
        </Button>
      </div>

      {/* Custom Games Section */}
      {customGames.length > 0 && (
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-8 animate-slide-up" style={{ animationDelay: "300ms" }}>
            <div className="h-1 bg-gradient-to-r from-primary to-accent rounded-full flex-1"></div>
            <h2 className="text-2xl sm:text-3xl font-black text-primary">Your Games</h2>
            <div className="h-1 bg-gradient-to-r from-accent to-primary rounded-full flex-1"></div>
          </div>

          <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
            {customGames.map((game, index) => (
              <Card
                key={game.id}
                className="group hover:shadow-2xl transition-all duration-500 border-2 hover:border-primary/30 hover:scale-105 bg-card/80 backdrop-blur-sm hover:bg-card animate-slide-up cursor-pointer"
                style={{ animationDelay: `${400 + index * 100}ms` }}
                onClick={() => onSelectGame(game)}
              >
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <CardTitle className="flex items-center gap-3 text-primary group-hover:text-accent transition-colors duration-300 flex-1">
                      <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-accent/10 transition-colors duration-300">
                        <HelpCircle className="h-5 w-5 sm:h-6 sm:w-6" />
                      </div>
                      <span className="text-lg sm:text-xl font-bold text-balance">{game.title}</span>
                    </CardTitle>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => handleDeleteGame(game.id, e)}
                      disabled={deletingGame === game.id}
                      className="h-8 w-8 p-0 hover:bg-red-500/10 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-all duration-300"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
                    <Calendar className="h-3 w-3 sm:h-4 sm:w-4" />
                    <span>Created {formatDate(game.createdAt)}</span>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                      <Users className="h-4 w-4" />
                      <span>{game.questions.length} Questions</span>
                    </div>
                    <Badge className="bg-blue-100 text-blue-800 border-blue-200 font-bold">Custom Game</Badge>
                  </div>
                  <Button
                    onClick={(e) => {
                      e.stopPropagation()
                      onSelectGame(game)
                    }}
                    className="w-full font-bold text-base sm:text-lg h-10 sm:h-12 bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 group-hover:animate-pulse-glow"
                    size="lg"
                  >
                    <Play className="h-4 w-4 sm:h-5 sm:w-5 mr-2 sm:mr-3 group-hover:scale-110 transition-transform duration-300" />
                    Start Game
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Sample Games Section */}
      {sampleGamesList.length > 0 && (
        <div>
          <div
            className="flex items-center gap-3 mb-8 animate-slide-up"
            style={{ animationDelay: `${customGames.length > 0 ? 600 : 300}ms` }}
          >
            <div className="h-1 bg-gradient-to-r from-accent to-primary rounded-full flex-1"></div>
            <h2 className="text-2xl sm:text-3xl font-black text-accent">Sample Games</h2>
            <div className="h-1 bg-gradient-to-r from-primary to-accent rounded-full flex-1"></div>
          </div>

          <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
            {sampleGamesList.map((game, index) => (
              <Card
                key={game.id}
                className="group hover:shadow-2xl transition-all duration-500 border-2 hover:border-primary/30 hover:scale-105 bg-card/80 backdrop-blur-sm hover:bg-card animate-slide-up cursor-pointer"
                style={{ animationDelay: `${(customGames.length > 0 ? 700 : 400) + index * 100}ms` }}
                onClick={() => onSelectGame(game)}
              >
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-3 text-primary group-hover:text-accent transition-colors duration-300">
                    <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-accent/10 transition-colors duration-300">
                      <HelpCircle className="h-5 w-5 sm:h-6 sm:w-6" />
                    </div>
                    <span className="text-lg sm:text-xl font-bold text-balance">{game.title}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                      <Users className="h-4 w-4" />
                      <span>{game.questions.length} Questions</span>
                    </div>
                    <Badge className="bg-green-100 text-green-800 border-green-200 font-bold">Ready to Play</Badge>
                  </div>
                  <Button
                    onClick={(e) => {
                      e.stopPropagation()
                      onSelectGame(game)
                    }}
                    className="w-full font-bold text-base sm:text-lg h-10 sm:h-12 bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 group-hover:animate-pulse-glow"
                    size="lg"
                  >
                    <Play className="h-4 w-4 sm:h-5 sm:w-5 mr-2 sm:mr-3 group-hover:scale-110 transition-transform duration-300" />
                    Start Game
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      <div
        className="text-center mt-12 sm:mt-16 animate-slide-up"
        style={{ animationDelay: `${(customGames.length + sampleGamesList.length) * 100 + 800}ms` }}
      >
        <p className="text-muted-foreground text-base sm:text-lg">
          🎉 Get ready for the ultimate game show experience! 🎉
        </p>
      </div>
    </div>
  )
}
