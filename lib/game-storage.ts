export interface Answer {
  text: string
  points: number
}

export interface Question {
  question: string
  answers: Answer[]
}

export interface Game {
  id: string
  title: string
  questions: Question[]
  createdAt: string
}

export const gameStorage = {
  // Get all saved games
  getGames: (): Game[] => {
    if (typeof window === "undefined") return []
    try {
      const games = localStorage.getItem("surveyGames")
      return games ? JSON.parse(games) : []
    } catch (error) {
      console.error("Error loading games:", error)
      return []
    }
  },

  // Save a new game
  saveGame: (game: Omit<Game, "id" | "createdAt">): Game => {
    const newGame: Game = {
      ...game,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    }

    const existingGames = gameStorage.getGames()
    const updatedGames = [...existingGames, newGame]

    try {
      localStorage.setItem("surveyGames", JSON.stringify(updatedGames))
      return newGame
    } catch (error) {
      console.error("Error saving game:", error)
      throw new Error("Failed to save game")
    }
  },

  // Delete a game
  deleteGame: (gameId: string): void => {
    const existingGames = gameStorage.getGames()
    const updatedGames = existingGames.filter((game) => game.id !== gameId)

    try {
      localStorage.setItem("surveyGames", JSON.stringify(updatedGames))
    } catch (error) {
      console.error("Error deleting game:", error)
      throw new Error("Failed to delete game")
    }
  },

  // Get a specific game by ID
  getGame: (gameId: string): Game | null => {
    const games = gameStorage.getGames()
    return games.find((game) => game.id === gameId) || null
  },

  // Update an existing game
  updateGame: (gameId: string, updates: Partial<Omit<Game, "id" | "createdAt">>): Game | null => {
    const existingGames = gameStorage.getGames()
    const gameIndex = existingGames.findIndex((game) => game.id === gameId)

    if (gameIndex === -1) return null

    const updatedGame = {
      ...existingGames[gameIndex],
      ...updates,
    }

    existingGames[gameIndex] = updatedGame

    try {
      localStorage.setItem("surveyGames", JSON.stringify(existingGames))
      return updatedGame
    } catch (error) {
      console.error("Error updating game:", error)
      throw new Error("Failed to update game")
    }
  },
}

// Default sample games for first-time users
export const sampleGames: Game[] = [
  {
    id: "sample-1",
    title: "Family Favorites",
    createdAt: new Date().toISOString(),
    questions: [
      {
        question: "Name something you do every morning",
        answers: [
          { text: "Brush teeth", points: 32 },
          { text: "Take a shower", points: 28 },
          { text: "Drink coffee", points: 24 },
          { text: "Check phone", points: 16 },
        ],
      },
      {
        question: "Name a popular pizza topping",
        answers: [
          { text: "Pepperoni", points: 40 },
          { text: "Cheese", points: 30 },
          { text: "Sausage", points: 15 },
          { text: "Mushrooms", points: 10 },
          { text: "Peppers", points: 5 },
        ],
      },
    ],
  },
]
