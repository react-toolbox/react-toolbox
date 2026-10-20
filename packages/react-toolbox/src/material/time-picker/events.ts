type PointEvent = { clientX: number; clientY: number };
export default {
  getMousePosition(event: PointEvent) {
    return { x: event.clientX, y: event.clientY };
  },
  getTouchPosition(event: { touches: ArrayLike<PointEvent> }) {
    return { x: event.touches[0].clientX, y: event.touches[0].clientY };
  },
};
