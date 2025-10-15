type QuizPrivilege = 'none' | 'quiz' | 'riasec' | 'full'

interface QuizType {
  id: number
  title: string
  description: string
  typeQuiz: number
  instructionImage: string
  quiz: string
  disabled?: boolean
  notReady?: boolean
}

export const filterQuizzesByPrivileges = (
  quizzes: QuizType[],
  privileges: QuizPrivilege
): QuizType[] => {
  if (privileges === 'none') {
    return []
  }

  if (privileges === 'full') {
    return quizzes
  }

  return quizzes.filter((quiz) => {
    const quizType = quiz.typeQuiz

    if (privileges === 'quiz') {
      return [1, 2, 3, 4, 5].includes(quizType)
    }

    if (privileges === 'riasec') {
      return quizType === 6
    }

    return false
  })
}