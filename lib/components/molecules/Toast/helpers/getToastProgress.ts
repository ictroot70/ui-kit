export const getToastProgress = (createdAt: number, duration = 5000): number => {
  if (duration <= 0) {
    return 0
  }

  const elapsed = Date.now() - createdAt
  const percent = 100 - (elapsed / duration) * 100

  return Math.min(100, Math.max(0, percent))
}
