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
  {
    id: "Quiz ma3 loled",
    title: "Quiz ma3 loled",
    description: "Classic family-friendly questions that everyone can enjoy",
    questions: [
      {
        question: "chneya a5yeb hejet ynjm ykon 3andk 7asasiya menhom",
        answers: [
          { text: "mekla", points: 35 },
          { text: "3bed", points: 25 },
          { text: "mé", points: 18 },
          { text: "flous", points: 12 },
          { text: "7aywanet", points: 10 },

        ],
      },
      {
        question: "7ajet kol ma tekber fil 3mor yonkso andek",
        answers: [
          { text: "ch3ar", points: 35 },
          { text: "energy", points: 25 },
          { text: "sennin", points: 18 },
          { text: "virilité", points: 12 },
          { text: "sabr", points: 10 },
        ],
      },
      {
        question: "What s something CS students complain about the most?",
        answers: [
          { text: "Too many assignments", points: 35 },
          { text: "Lack of sleep", points: 25 },
          { text: "Bad Wi-Fi", points: 18 },
          { text: "Long lectures", points: 10 },
          { text: "Old/outdated computers", points: 10 },
        ],
      },
      {
        question: "7ajet yetchakew menhom labed f sbitar",
        answers: [
          { text: "el retard", points: 35 },
          { text: "el mekla", points: 25 },
          { text: "el flous", points: 18 },
          { text: "el ri7a", points: 12 },
          { text: "el service", points: 10 },
        ],
      },
            {
        question: "7ajet ta3malhom wenti chtar re9ed",
        answers: [
          { text: "tetfrj fil tv/serie", points: 35 },
          { text: "ta9ra", points: 25 },
          { text: "ta7ki ma3 chkoun", points: 18 },
          { text: "scrolling", points: 12 },
        ],
      },
        {
        question: "a5yeb blayes ynjm yjik fehom telifoun",
        answers: [
          { text: "wenti tfaski", points: 35 },
          { text: "entretien ta3 5edma", points: 25 },
          { text: "toilette", points: 18 },
          { text: "cinema", points: 12 },
          { text: "jame3", points: 10 },

        ],
      },
      {
        question: "7ajet les parents ywasiw fik bech to7sen testaamalhom / testghalhom",
        answers: [
          { text: "flous", points: 35 },
          { text: "wa9t", points: 25 },
          { text: "dhaw", points: 18 },
          { text: "me", points: 12 },

        ],
      },
      {
        question: "Companies estaghnew ml AI (ma3rofin)",
        answers: [
          { text: "NVIDIA", points: 35 },
          { text: "openAI", points: 25 },
          { text: "google", points: 18 },
          { text: "tesla", points: 12 },
        ],
      },
    ],
  },
]
