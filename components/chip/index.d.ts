import __ReactToolbox from "../index.d.ts";

export interface ChipTheme {
  avatar?: string;
  chip?: string;
  deletable?: string;
  delete?: string;
  deleteIcon?: string;
  deleteX?: string;
}

interface ChipProps extends __ReactToolbox.Props {
  /**
   * Children to pass through the component.
   */
  children?: __React.ReactNode;
  deleteable?: boolean;
  onDeleteClick?: __React.MouseEventHandler;
  /**
   * Classnames object defining the component style.
   */
  theme?: ChipTheme;
}

export class Chip extends __React.Component<ChipProps, {}> { }

export default Chip;
