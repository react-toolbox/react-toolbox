import __ReactToolbox from "../index.d.ts";

export interface ChipTheme {
  /**
   * Added to the root element when the component includes an avatar.
   */
  avatar?: string;
  /**
   * Used for the root element.
   */
  chip?: string;
  /**
   * Added to the root element when the component is deletable.
   */
  deletable?: string;
  /**
   * Used for the delete element wrapper.
   */
  delete?: string;
  /**
   * Used for the delete icon.
   */
  deleteIcon?: string;
  /**
   * Used for the delete svg inner layer.
   */
  deleteX?: string;
}

interface ChipProps extends __ReactToolbox.Props {
  /**
   * Children to pass through the component.
   */
  children?: __React.ReactNode;
  /**
   * If true, the chip will be rendered with a delete icon.
   * @default false
   */
  deletable?: boolean;
  /**
   * Callback to be invoked when the delete icon is clicked.
   */
  onDeleteClick?: __React.MouseEventHandler;
  /**
   * Classnames object defining the component style.
   */
  theme?: ChipTheme;
}

export class Chip extends __React.Component<ChipProps, {}> { }

export default Chip;
