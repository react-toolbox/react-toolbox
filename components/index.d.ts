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
    // onClick?: Function;
    onClick?: React.MouseEventHandler<React.ReactNode>;

    /**
     * Fires after the mouse is released from the Component.
     */
    onMouseUp?: React.MouseEventHandler<React.ReactNode>;
    /**
     * Callback called when the mouse enters the Component.
     */
    onMouseEnter?: React.MouseEventHandler<React.ReactNode>;
    /**
     * Callback called when the mouse leaves the Component.
     */
    onMouseLeave?: React.MouseEventHandler<React.ReactNode>;
    /**
     * Callback called when the mouse press the Component.
     */
    onMouseDown?: React.MouseEventHandler<React.ReactNode>;
    onContextMenu?: React.MouseEventHandler<React.ReactNode>;
    onDoubleClick?: React.MouseEventHandler<React.ReactNode>;
    onDrag?: React.DragEventHandler<React.ReactNode>;
    onDragEnd?: React.DragEventHandler<React.ReactNode>;
    onDragEnter?: React.DragEventHandler<React.ReactNode>;
    onDragExit?: React.DragEventHandler<React.ReactNode>;
    onDragLeave?: React.DragEventHandler<React.ReactNode>;
    onDragOver?: React.DragEventHandler<React.ReactNode>;
    onDragStart?: React.DragEventHandler<React.ReactNode>;
    onDrop?: React.DragEventHandler<React.ReactNode>;
    onMouseMove?: React.MouseEventHandler<React.ReactNode>;
    onMouseOut?: React.MouseEventHandler<React.ReactNode>;
    onMouseOver?: React.MouseEventHandler<React.ReactNode>;
    onTouchCancel?: React.TouchEventHandler<React.ReactNode>;
    onTouchEnd?: React.TouchEventHandler<React.ReactNode>;
    onTouchMove?: React.TouchEventHandler<React.ReactNode>;
    onTouchStart?: React.TouchEventHandler<React.ReactNode>;
    /**
     * Set inline style for the root component.
     */
    style?: React.CSSProperties;
  }
}

export default ReactToolbox;
