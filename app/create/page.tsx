"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Plus, Trash2, Save, Gamepad2, Sparkles, Users, Trophy } from "lucide-react"
import { useRouter } from "next/navigation"
import { gameStorage, type Question } from "@/lib/game-storage"

interface Game {
  id: string
  title: string
  questions: Question[]
  createdAt: string
}

export default function CreateGamePage() {
  const router = useRouter()
  const [gameTitle, setGameTitle] = useState("")
  const [questions, setQuestions] = useState<Question[]>([
    {
      question: "",
      answers: [
        { text: "", points: 0 },
        { text: "", points: 0 },
        { text: "", points: 0 },
        { text: "", points: 0 },
      ],
    },
  ])

  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        question: "",
        answers: [
          { text: "", points: 0 },
          { text: "", points: 0 },
          { text: "", points: 0 },
          { text: "", points: 0 },
        ],
      },
    ])
  }

  const removeQuestion = (questionIndex: number) => {
    if (questions.length > 1) {
      setQuestions(questions.filter((_, index) => index !== questionIndex))
    }
  }

  const updateQuestion = (questionIndex: number, question: string) => {
    const updatedQuestions = [...questions]
    updatedQuestions[questionIndex].question = question
    setQuestions(updatedQuestions)
  }

  const addAnswer = (questionIndex: number) => {
    if (questions[questionIndex].answers.length < 8) {
      const updatedQuestions = [...questions]
      updatedQuestions[questionIndex].answers.push({ text: "", points: 0 })
      setQuestions(updatedQuestions)
    }
  }

  const removeAnswer = (questionIndex: number, answerIndex: number) => {
    if (questions[questionIndex].answers.length > 2) {
      const updatedQuestions = [...questions]
      updatedQuestions[questionIndex].answers = updatedQuestions[questionIndex].answers.filter(
        (_, index) => index !== answerIndex,
      )
      setQuestions(updatedQuestions)
    }
  }

  const updateAnswer = (
    questionIndex: number,
    answerIndex: number,
    field: "text" | "points",
    value: string | number,
  ) => {
    const updatedQuestions = [...questions]
    updatedQuestions[questionIndex].answers[answerIndex][field] = value as any
    setQuestions(updatedQuestions)
  }

  const saveGame = () => {
    if (!gameTitle.trim()) {
      alert("Please enter a game title")
      return
    }

    const hasValidQuestions = questions.every(
      (q) => q.question.trim() && q.answers.some((a) => a.text.trim() && a.points > 0),
    )

    if (!hasValidQuestions) {
      alert("Please ensure all questions have a title and at least one answer with points")
      return
    }

    try {
      gameStorage.saveGame({
        title: gameTitle.trim(),
        questions: questions.map((q) => ({
          question: q.question.trim(),
          answers: q.answers.filter((a) => a.text.trim()).sort((a, b) => b.points - a.points), // Sort by points descending
        })),
      })

      router.push("/")
    } catch (error) {
      alert("Failed to save game. Please try again.")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-8 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 animate-slide-up">
          <Button
            variant="outline"
            onClick={() => router.push("/")}
            className="gap-2 bg-card/80 backdrop-blur-sm border-2 hover:border-primary/50 hover:bg-primary/10 transition-all duration-300 font-semibold w-full sm:w-auto"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Menu
          </Button>

          <div className="text-center flex-1">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Gamepad2 className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
              <h1 className="text-2xl sm:text-4xl font-black bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                Create New Game
              </h1>
              <Sparkles className="h-4 w-4 sm:h-6 sm:w-6 text-accent animate-pulse" />
            </div>
            <Badge
              variant="secondary"
              className="bg-gradient-to-r from-primary/20 to-accent/20 border-primary/30 text-sm font-bold px-3 py-1"
            >
              Build Your Survey Says Game
            </Badge>
          </div>

          <Button
            onClick={saveGame}
            className="gap-2 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground font-semibold shadow-lg w-full sm:w-auto"
          >
            <Save className="h-4 w-4" />
            Save Game
          </Button>
        </div>

        {/* Game Title */}
        <Card
          className="border-2 border-primary/30 bg-card/90 backdrop-blur-sm shadow-xl animate-slide-up"
          style={{ animationDelay: "100ms" }}
        >
          <CardHeader className="bg-gradient-to-r from-primary/10 via-accent/5 to-primary/10">
            <CardTitle className="text-xl sm:text-2xl font-black text-primary flex items-center gap-2">
              <Trophy className="h-5 w-5 sm:h-6 sm:w-6" />
              Game Details
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-6">
            <div className="space-y-2">
              <Label htmlFor="gameTitle" className="text-sm font-semibold text-foreground">
                Game Title
              </Label>
              <Input
                id="gameTitle"
                value={gameTitle}
                onChange={(e) => setGameTitle(e.target.value)}
                placeholder="Enter your game title..."
                className="h-12 text-lg font-semibold border-2 focus:border-primary/50"
              />
            </div>
          </CardContent>
        </Card>

        {/* Questions */}
        <div className="space-y-6">
          {questions.map((question, questionIndex) => (
            <Card
              key={questionIndex}
              className="border-2 border-primary/30 bg-card/90 backdrop-blur-sm shadow-xl animate-slide-up"
              style={{ animationDelay: `${200 + questionIndex * 100}ms` }}
            >
              <CardHeader className="bg-gradient-to-r from-primary/10 via-accent/5 to-primary/10">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg sm:text-xl font-black text-primary flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Question {questionIndex + 1}
                  </CardTitle>
                  {questions.length > 1 && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => removeQuestion(questionIndex)}
                      className="gap-2 hover:bg-red-500/10 hover:border-red-500/50 hover:text-red-600"
                    >
                      <Trash2 className="h-4 w-4" />
                      Remove
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 space-y-6">
                {/* Question Input */}
                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-foreground">Question Text</Label>
                  <Textarea
                    value={question.question}
                    onChange={(e) => updateQuestion(questionIndex, e.target.value)}
                    placeholder="Enter your survey question..."
                    className="min-h-[80px] text-base border-2 focus:border-primary/50 resize-none"
                  />
                </div>

                {/* Answers */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm font-semibold text-foreground">Answers (sorted by points)</Label>
                    {question.answers.length < 8 && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => addAnswer(questionIndex)}
                        className="gap-2 hover:bg-primary/10 hover:border-primary/50"
                      >
                        <Plus className="h-4 w-4" />
                        Add Answer
                      </Button>
                    )}
                  </div>

                  <div className="grid gap-3">
                    {question.answers.map((answer, answerIndex) => (
                      <div
                        key={answerIndex}
                        className="flex flex-col sm:flex-row gap-2 sm:gap-3 p-3 bg-muted/30 rounded-lg border border-muted"
                      >
                        <div className="flex-1">
                          <Input
                            value={answer.text}
                            onChange={(e) => updateAnswer(questionIndex, answerIndex, "text", e.target.value)}
                            placeholder={`Answer ${answerIndex + 1}...`}
                            className="border-2 focus:border-primary/50"
                          />
                        </div>
                        <div className="flex items-center gap-2">
                          <Input
                            type="number"
                            value={answer.points}
                            onChange={(e) =>
                              updateAnswer(questionIndex, answerIndex, "points", Number.parseInt(e.target.value) || 0)
                            }
                            placeholder="Points"
                            className="w-20 sm:w-24 border-2 focus:border-primary/50"
                            min="0"
                            max="100"
                          />
                          {question.answers.length > 2 && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => removeAnswer(questionIndex, answerIndex)}
                              className="h-10 w-10 p-0 hover:bg-red-500/10 hover:border-red-500/50 hover:text-red-600"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Add Question Button */}
        <div className="text-center animate-slide-up" style={{ animationDelay: `${400 + questions.length * 100}ms` }}>
          <Button
            variant="outline"
            onClick={addQuestion}
            className="gap-2 bg-card/80 backdrop-blur-sm border-2 hover:border-primary/50 hover:bg-primary/10 transition-all duration-300 font-semibold"
          >
            <Plus className="h-4 w-4" />
            Add New Question
          </Button>
        </div>
      </div>
    </div>
  )
}
