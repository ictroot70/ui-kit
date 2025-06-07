export const getToastProgress = (createdAt: number, duration = 5000): number => {
  const elapsed = Date.now() - createdAt

  return 1 - elapsed / duration
}
