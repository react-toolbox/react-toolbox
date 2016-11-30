import * as React from "react";
export declare namespace ReactToolbox {
  interface Props {
    /**
     * Set a class for the root component.
     */
    className?: string;
    /**
     * Key used to uniquely identify the element within an Array.
     */
    key?: string | number;
    /**
     * Callback called when the component is clicked.
     */
    onClick?: Function;
    /**
     * Fires after the mouse is released from the Component.
     */
    onMouseUp?: Function;
    /**
     * Callback called when the mouse enters the Component.
     */
    onMouseEnter?: Function;
    /**
     * Callback called when the mouse leaves the Component.
     */
    onMouseLeave?: Function;
    /**
     * Callback called when the mouse press the Component.
     */
    onMouseDown?: Function;
    onContextMenu?: Function;
    onDoubleClick?: Function;
    onDrag?: Function;
    onDragEnd?: Function;
    onDragEnter?: Function;
    onDragExit?: Function;
    onDragLeave?: Function;
    onDragOver?: Function;
    onDragStart?: Function;
    onDrop?: Function;
    onMouseMove?: Function;
    onMouseOut?: Function;
    onMouseOver?: Function;
    onTouchCancel?: Function;
    onTouchEnd?: Function;
    onTouchMove?: Function;
    onTouchStart?: Function;
    /**
     * Set inline style for the root component.
     */
    style?: React.CSSProperties;
  }
}

export default ReactToolbox;
