type PointEvent = { pageX: number; pageY: number };
type DocumentEvents = Partial<{
  [K in keyof DocumentEventMap]: (event: DocumentEventMap[K]) => void;
}>;
function listeners(map: DocumentEvents, action: 'addEventListener' | 'removeEventListener') {
  for (const key of Object.keys(map) as (keyof DocumentEventMap)[]) {
    const listener = map[key];
    if (listener) document[action](key, listener as EventListener, false);
  }
}
export default {
  getMousePosition(event: PointEvent) {
    return { x: event.pageX - window.scrollX, y: event.pageY - window.scrollY };
  },
  getTouchPosition(event: { touches: ArrayLike<PointEvent> }) {
    return {
      x: event.touches[0].pageX - window.scrollX,
      y: event.touches[0].pageY - window.scrollY,
    };
  },
  pauseEvent(event: { stopPropagation(): void; preventDefault(): void }) {
    event.stopPropagation();
    event.preventDefault();
  },
  addEventsToDocument(map: DocumentEvents) {
    listeners(map, 'addEventListener');
  },
  removeEventsFromDocument(map: DocumentEvents) {
    listeners(map, 'removeEventListener');
  },
  targetIsDescendant(event: { target: EventTarget | null }, parent: Node) {
    return event.target instanceof Node && parent.contains(event.target);
  },
  addEventListenerOnTransitionEnded(
    element: HTMLElement | null,
    listener: (event: TransitionEvent) => void,
  ) {
    element?.addEventListener('transitionend', listener);
    return !!element;
  },
  removeEventListenerOnTransitionEnded(
    element: HTMLElement | null,
    listener: (event: TransitionEvent) => void,
  ) {
    element?.removeEventListener('transitionend', listener);
    return !!element;
  },
};
