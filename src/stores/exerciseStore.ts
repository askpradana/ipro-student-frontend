import { defineStore } from 'pinia'

interface ExerciseState {
  exerciseQuiz1: string
  exerciseQuiz2: string
  exerciseQuiz3: string
  exerciseQuiz4: string
  exerciseQuiz5: string
  exerciseQuiz6: string
}

export const useExerciseStore = defineStore('excerciseType', {
  state: (): ExerciseState => ({
    exerciseQuiz1: '0',
    exerciseQuiz2: '0',
    exerciseQuiz3: '0',
    exerciseQuiz4: '0',
    exerciseQuiz5: '0',
    exerciseQuiz6: '0',
  }),

  actions: {
    updateExercise(nameOfExercise: number) {
      switch (nameOfExercise) {
        case 1:
          this.exerciseQuiz1 = '1'
          break
        case 2:
          this.exerciseQuiz2 = '2'
          break
        case 3:
          this.exerciseQuiz3 = '3'
          break
        case 4:
          this.exerciseQuiz4 = '4'
          break
        case 5:
          this.exerciseQuiz5 = '5'
          break
        case 6:
          this.exerciseQuiz6 = '6'
          break
        case 0:
          this.exerciseQuiz1 = '0'
          this.exerciseQuiz2 = '0'
          this.exerciseQuiz3 = '0'
          this.exerciseQuiz4 = '0'
          this.exerciseQuiz5 = '0'
          this.exerciseQuiz6 = '0'
          break
        default:
          break
      }
    },
  },
})
