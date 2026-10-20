export const angleFromPositions = (cx: number, cy: number, ex: number, ey: number) =>
  ((Math.atan2(ey - cy, ex - cx) + Math.PI / 2) * 180) / Math.PI;
export const angle360FromPositions = (cx: number, cy: number, ex: number, ey: number) => {
  const angle = angleFromPositions(cx, cy, ex, ey);
  return angle < 0 ? 360 + angle : angle;
};
