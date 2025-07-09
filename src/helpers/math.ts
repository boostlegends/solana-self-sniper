export function percent(value: number, total: number): number {
  return total === 0 ? 0 : (value / total) * 100;
}
