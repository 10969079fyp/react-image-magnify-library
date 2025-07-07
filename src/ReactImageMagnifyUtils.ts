export type MagnifierShape = 'circle' | 'rounded-rectangle';

export function getTouchDistance(touches: React.TouchList): number {
  const [touch1, touch2] = [touches[0], touches[1]];
  const dx = touch2.clientX - touch1.clientX;
  const dy = touch2.clientY - touch1.clientY;
  return Math.sqrt(dx * dx + dy * dy);
}

export function getBorderRadius(shape: MagnifierShape): string {
  switch (shape) {
    case 'circle':
      return '50%';
    case 'rounded-rectangle':
      return '15px';
    default:
      return '50%';
  }
}
