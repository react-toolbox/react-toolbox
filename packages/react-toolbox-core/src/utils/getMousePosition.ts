import { MouseEvent } from 'react';
import { Coordinates } from './types';

export default function getMousePosition(event: MouseEvent<any>): Coordinates {
  return {
    x: event.pageX - (window.scrollX || window.pageXOffset),
    y: event.pageY - (window.scrollY || window.pageYOffset),
  };
}
