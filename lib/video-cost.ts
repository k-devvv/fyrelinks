export function costPerAcceptedMinute(spend: number, acceptedSeconds: number): number | null {
  if (!Number.isFinite(spend) || !Number.isFinite(acceptedSeconds) || spend < 0 || acceptedSeconds < 0) return null;
  if (acceptedSeconds === 0) return null;
  const result = spend / acceptedSeconds * 60;
  return Number.isFinite(result) ? result : null;
}
