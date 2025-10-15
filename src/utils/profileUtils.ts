import type { UserProfileData } from '@/types/userTypes'

export const isProfileComplete = (profile: UserProfileData | null): boolean => {
  if (!profile) return false

  // Check if all required fields are present and not empty
  const requiredFields = ['name', 'grade', 'school', 'jurusan'] as const

  return requiredFields.every(field => {
    const value = profile[field]
    return value !== undefined && value !== null && value.toString().trim() !== ''
  })
}