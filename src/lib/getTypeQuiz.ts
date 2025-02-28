export const getTypeQuiz = (type: string) => {
  const getTypeFromLocal = localStorage.getItem('type-quiz')
  const quizType = type ? type : getTypeFromLocal

  switch (+quizType!) {
    case 1:
      return 'soal-tiga'
    case 2:
      return 'soal-lima'
    case 3:
      return 'soal-enam'
    case 4:
      return 'soal-tujuh'
    default:
      break
  }
}

export const getTypeQuizWithUnderscore = (type: string) => {
  const getTypeFromLocal = localStorage.getItem('type-quiz')
  const quizType = type ? type : getTypeFromLocal

  switch (+quizType!) {
    case 1:
      return 'quiz_tiga'
    case 2:
      return 'quiz_lima'
    case 3:
      return 'quiz_enam'
    case 4:
      return 'quiz_tujuh'
    default:
      break
  }
}
