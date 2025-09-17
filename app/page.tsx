"use client"

import { useState, useEffect } from "react"
import { GameSelector } from "@/components/game-selector"
import { GameBoard } from "@/components/game-board"
import { gameStorage, sampleGames, type Game } from "@/lib/game-storage"

export default function Home() {
  const [selectedGame, setSelectedGame] = useState<Game | null>(null)
  const [allGames, setAllGames] = useState<Game[]>([])

  useEffect(() => {
    const savedGames = gameStorage.getGames()

    // If no saved games exist, initialize with sample games
    if (savedGames.length === 0) {
      sampleGames.forEach((game) => {
        gameStorage.saveGame({
          title: game.title,
          questions: game.questions,
        })
      })
      setAllGames(gameStorage.getGames())
    } else {
      setAllGames(savedGames)
    }
  }, [])

  const refreshGames = () => {
    setAllGames(gameStorage.getGames())
  }

  if (!selectedGame) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 animate-slide-up">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-accent/10"></div>
        <div className="relative z-10">
          <GameSelector games={allGames} onSelectGame={setSelectedGame} onRefreshGames={refreshGames} />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-accent/5"></div>
      <div className="relative z-10">
        <GameBoard game={selectedGame} onBackToMenu={() => setSelectedGame(null)} />
      </div>
    </div>
  )
}
