export const changeStructur = (answers: (string | number | string[] | null)[]) => {
  const transformedAnswers = answers.map((answer, index) => {
    const soalID = index + 1
    const answerValue = answer
    const typeOfAnswerValue = typeof answer

    let transformedAnswer: string | number | string[] | null
    switch (typeOfAnswerValue) {
      case 'string':
        transformedAnswer = answerValue as string
        break
      case 'number':
        transformedAnswer = Number(answerValue)
        break
      case 'object':
        transformedAnswer = answerValue
        break
      default:
        transformedAnswer = null
    }

    return {
      soalID,
      answer: transformedAnswer,
    }
  })

  return transformedAnswers
}
