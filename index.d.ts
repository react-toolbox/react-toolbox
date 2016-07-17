// Type definitions for react-toolbox
// Project: https://github.com/react-toolbox/react-toolbox
// Definitions by: Per Bergqwist <https://github.com/normano64>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

declare module "react-toolbox" {
  export import AppBar = __ReactToolbox.AppBar;
  export import Autocomplete = __ReactToolbox.Autocomplete;
  export import Avatar = __ReactToolbox.Avatar;
  export import Button = __ReactToolbox.Button.Button;
  export import IconButton = __ReactToolbox.Button.IconButton;
  export import Card = __ReactToolbox.Card.Card;
  export import CardTitle = __ReactToolbox.Card.CardTitle;
  export import CardMedia = __ReactToolbox.Card.CardMedia;
  export import CardText = __ReactToolbox.Card.CardText;
  export import CardActions = __ReactToolbox.Card.CardActions;
  export import Checkbox = __ReactToolbox.Checkbox;
  export import Chip = __ReactToolbox.Chip;
  export import DatePicker = __ReactToolbox.DatePicker;
  export import Dialog = __ReactToolbox.Dialog;
  export import Drawer = __ReactToolbox.Drawer;
  export import Dropdown = __ReactToolbox.Dropdown;
  export import FontIcon = __ReactToolbox.FontIcon;
  export import Input = __ReactToolbox.Input;
  export import Layout = __ReactToolbox.Layout.Layout;
  export import Panel = __ReactToolbox.Layout.Panel;
  export import NavDrawer = __ReactToolbox.Layout.NavDrawer;
  export import Sidebar = __ReactToolbox.Layout.Sidebar;
  export import Link = __ReactToolbox.Link;
  export import List = __ReactToolbox.List.List;
  export import ListCheckbox = __ReactToolbox.List.ListCheckbox;
  export import ListItem = __ReactToolbox.List.ListItem;
  export import ListDivider = __ReactToolbox.List.ListDivider;
  export import ListSubHeader = __ReactToolbox.List.ListSubHeader;
  export import Menu = __ReactToolbox.Menu.Menu;
  export import MenuDivider = __ReactToolbox.Menu.MenuDivider;
  export import MenuItem = __ReactToolbox.Menu.MenuItem;
  export import IconMenu = __ReactToolbox.Menu.IconMenu;
  export import Navigation = __ReactToolbox.Navigation;
  export import ProgressBar = __ReactToolbox.ProgressBar;
  export import RadioGroup = __ReactToolbox.Radio.RadioGroup;
  export import RadioButton = __ReactToolbox.Radio.RadioButton;
  export import Ripple = __ReactToolbox.Ripple;
  export import Slider = __ReactToolbox.Slider;
  export import Snackbar = __ReactToolbox.Snackbar;
  export import Switch = __ReactToolbox.Switch;
  export import Tabs = __ReactToolbox.Tabs.Tabs;
  export import Tab = __ReactToolbox.Tabs.Tab;
  export import TimePicker = __ReactToolbox.TimePicker;
  export import Tooltip = __ReactToolbox.Tooltip;

  export import AppBarTheme = __ReactToolbox.AppBarTheme;
  export import AutocompleteTheme = __ReactToolbox.AutocompleteTheme;
  export import AvatarTheme = __ReactToolbox.AvatarTheme;
  export import ButtonTheme = __ReactToolbox.Button.ButtonTheme;
  export import IconButtonTheme = __ReactToolbox.Button.IconButtonTheme;
  export import CardTheme = __ReactToolbox.Card.CardTheme;
  export import CardTitleTheme = __ReactToolbox.Card.CardTitleTheme;
  export import CardMediaTheme = __ReactToolbox.Card.CardMediaTheme;
  export import CardTextTheme = __ReactToolbox.Card.CardTextTheme;
  export import CardActionsTheme = __ReactToolbox.Card.CardActionsTheme;
  export import CheckboxTheme = __ReactToolbox.CheckboxTheme;
  export import ChipTheme = __ReactToolbox.ChipTheme;
  export import DatePickerTheme = __ReactToolbox.DatePickerTheme;
  export import DialogTheme = __ReactToolbox.DialogTheme;
  export import DrawerTheme = __ReactToolbox.DrawerTheme;
  export import DropdownTheme = __ReactToolbox.DropdownTheme;
  export import InputTheme = __ReactToolbox.InputTheme;
  export import LayoutTheme = __ReactToolbox.Layout.LayoutTheme;
  export import PanelTheme = __ReactToolbox.Layout.PanelTheme;
  export import NavDrawerTheme = __ReactToolbox.Layout.NavDrawerTheme;
  export import SidebarTheme = __ReactToolbox.Layout.SidebarTheme;
  export import LinkTheme = __ReactToolbox.LinkTheme;
  export import ListTheme = __ReactToolbox.List.ListTheme;
  export import ListCheckboxTheme = __ReactToolbox.List.ListCheckboxTheme;
  export import ListItemTheme = __ReactToolbox.List.ListItemTheme;
  export import ListDividerTheme = __ReactToolbox.List.ListDividerTheme;
  export import ListSubHeaderTheme = __ReactToolbox.List.ListSubHeaderTheme;
  export import MenuTheme = __ReactToolbox.Menu.MenuTheme;
  export import MenuDividerTheme = __ReactToolbox.Menu.MenuDividerTheme;
  export import MenuItemTheme = __ReactToolbox.Menu.MenuItemTheme;
  export import IconMenuTheme = __ReactToolbox.Menu.IconMenuTheme;
  export import NavigationTheme = __ReactToolbox.NavigationTheme;
  export import ProgressBarTheme = __ReactToolbox.ProgressBarTheme;
  export import RadioButtonTheme = __ReactToolbox.Radio.RadioButtonTheme;
  export import RippleTheme = __ReactToolbox.RippleTheme;
  export import SliderTheme = __ReactToolbox.SliderTheme;
  export import SnackbarTheme = __ReactToolbox.SnackbarTheme;
  export import SwitchTheme = __ReactToolbox.SwitchTheme;
  export import TabsTheme = __ReactToolbox.Tabs.TabsTheme;
  export import TabTheme = __ReactToolbox.Tabs.TabTheme;
  export import TimePickerTheme = __ReactToolbox.TimePickerTheme;
  export import TooltipTheme = __ReactToolbox.TooltipTheme;
}

declare namespace __ReactToolbox {
  import React = __React;

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
    onClick?: React.MouseEventHandler;
    /**
     * Set inline style for the root component.
     */
    style?: React.CSSProperties;
  }

  export interface AppBarTheme {
    /**
     * Used for the component root element.
     */
    appBar?: string;
    /**
     * Added to the root element when the app bar is fixed.
     */
    fixed?: string;
    /**
     * Added to the root element when the app bar is flat.
     */
    flat?: string;
  }
  interface AppBarProps extends Props {
    /**
     * Children to pass through the component.
     */
    children?: React.ReactNode;
    /**
     * Determine if the bar should have position fixed or relative.
     * @default false
     */
    fixed?: boolean;
    /**
     * If true, the AppBar shows a shadow.
     * @default false
     */
    flat?: boolean;
    /**
     * Classnames object defining the component style.
     */
    theme?: AppBarTheme;
  }
  export class AppBar extends React.Component<AppBarProps, {}> {
  }

  export interface AutocompleteTheme {
    /**
     * Used for a suggestion when it's active.
     */
    active?: string;
    /**
     * Used for the root element.
     */
    autocomplete?: string;
    /**
     * Used when the input is focused.
     */
    focus?: string;
    /**
     * Used to style the Input component.
     */
    input?: string;
    /**
     * Used for the label.
     */
    label?: string;
    /**
     * Used to style each suggestion.
     */
    suggestion?: string;
    /**
     * Used to style the suggestions container.
     */
    suggestions?: string;
    /**
     * Used for the suggestions when it's opening to the top.
     */
    up?: string;
    /**
     * Classname used for a single value.
     */
    value?: string;
    /**
     * Classname used for the values container.
     */
    values?: string;
  }
  interface AutocompleteProps extends Props {
    /**
     * Determines the opening direction. It can be auto, up or down.
     * @default auto
     */
    direction?: "auto" | "up" | "down";
    /**
     * If true, component will be disabled.
     */
    disabled?: boolean;
    /**
     * Sets the error string for the internal input element.
     * @default false
     */
    error?: string;
    /**
     * The text string to use for the floating label element.
     */
    label?: string;
    /**
     * If true, component can hold multiple values.
     */
    multiple?: boolean;
    /**
     * Callback function that is fired when the components's value changes.
     * @default auto
     */
    onChange?: React.FormEventHandler;
    /**
     * Determines if the selected list is shown above or below input. It can be above or below.
     * @default above
     */
    selectedPosition?: "above" | "below";
    /**
     * If true, the list of suggestions will not be filtered when a value is selected.
     * @default false
     */
    showSuggestionsWHenValueIsSet?: boolean;
    /**
     * Object of key/values or array representing all items suggested.
     */
    source?: any;
    /**
     * Determines how suggestions are supplied.
     * @default start
     */
    suggestionMatch?: "start" | "anywhere" | "word";
    /**
     * Classnames object defining the component style.
     */
    theme?: AutocompleteTheme;
    /**
     * Value or array of values currently selected component.
     */
    value?: any;
  }
  export class Autocomplete extends React.Component<AutocompleteProps, {}> {
  }

  export interface AvatarTheme {
    /**
     * Used for the root class of the element.
     */
    avatar?: string;
    /**
     * Added to the root element when the component has image.
     */
    image?: string;
    /**
     * Used for the root element if the component shows the letter.
     */
    letter?: string;
  }
  interface AvatarProps extends Props {
    /**
     * Children to pass through the component.
     */
    children?: React.ReactNode;
    /**
     * Set to true if your image is not squared so it will be used as a cover for the element.
     */
    cover?: boolean;
    /**
     * A key to identify an Icon from Material Design Icons or a custom Icon Element.
     */
    icon?: React.ReactNode | string;
    /**
     * An image source or an image element.
     */
    image?: React.ReactNode | string;
    /**
     * Classnames object defining the component style.
     */
    theme?: AvatarTheme;
    /**
     * A title for the image. If no image is provided, the first letter will be displayed as the avatar.
     */
    title?: string;
  }
  export class Avatar extends React.Component<AvatarProps, {}> {
  }

  namespace Button {
    export interface ButtonTheme {
      /**
       * Used for the root in case button is accent.
       */
      accent?: string;
      /**
       * Used for the root element in any button.
       */
      button?: string;
      /**
       * Used when the button is flat for the root element.
       */
      flat?: string;
      /**
       * Used when the button is floating for the root element.
       */
      floating?: string;
      /**
       * For the icon inside a button.
       */
      icon?: string;
      /**
       * Used when colors are inverted.
       */
      inverse?: string;
      /**
       * Used for mini floating buttons.
       */
      mini?: string;
      /**
       * Used for neutral colored buttons.
       */
      neutral?: string;
      /**
       * Used for primary buttons when button is primary.
       */
      primary?: string;
      /**
       * Used when the button is raised for root element.
       */
      raised?: string;
      /**
       * Used for the ripple element.
       */
      rippleWrapper?: string;
      /**
       * Used for toggle buttons in the root element.
       */
      toggle?: string;
    }
    interface ButtonProps extends Props {
      /**
       * Indicates if the button should have accent color.
       * @default false
       */
      accent?: boolean;
      /**
       * Children to pass through the component.
       */
      children?: React.ReactNode;
      /**
       * If true, component will be disabled.
       * @default false
       */
      disabled?: boolean;
      /**
       * If true, the button will have a flat look.
       * @default false
       */
      flat?: boolean;
      /**
       * If true, the button will have a floating look.
       * @default false
       */
      floating?: boolean;
      /**
       * Creates a link for the button.
       */
      href?: string;
      /**
       * Value of the icon (See Font Icon Component).
       */
      icon?: React.ReactNode | string;
      /**
       * If true, the neutral colors are inverted. Useful to put a button over a dark background.
       */
      inverse?: boolean;
      /**
       * The text string to use for the name of the button.
       */
      label?: string;
      /**
       * To be used with floating button. If true, the button will be smaller.
       * @default false
       */
      mini?: boolean;
      /**
       * Set it to false if you don't want the neutral styles to be included.
       * @default true
       */
      neutral?: boolean;
      /**
       * Fires after the mouse leaves the Component.
       */
      onMouseLeave?: React.MouseEventHandler;
      /**
       * Fires after the mouse is released from the Component.
       */
      OnMouseUp?: React.MouseEventHandler;
      /**
       * Indicates if the button should have primary color.
       * @default false
       */
      primary?: boolean;
      /**
       * If true, the button will have a raised look.
       * @default false
       */
      raised?: boolean;
      /**
       * If true, component will have a ripple effect on click.
       * @default true
       */
      ripple?: boolean;
      /**
       * Classnames object defining the component style.
       */
      theme?: ButtonTheme;
    }
    export class Button extends React.Component<ButtonProps, {}> {
    }

    export interface IconButtonTheme {
      /**
       * Used for the root in case button is accent.
       */
      accent?: string;
      /**
       * Used for the root element in any button.
       */
      button?: string;
      /**
       * For the icon inside a button.
       */
      icon?: string;
      /**
       * Used when colors are inverted.
       */
      inverse?: string;
      /**
       * Used for neutral colored buttons.
       */
      neutral?: string;
      /**
       * Used for primary buttons when button is primary.
       */
      primary?: string;
      /**
       * Used for the ripple element.
       */
      rippleWrapper?: string;
      /**
       * Used for toggle buttons in the root element.
       */
      toggle?: string;
    }
    interface IconButtonProps extends Props {
      /**
       * Indicates if the button should have accent color.
       * @default false
       */
      accent?: boolean;
      /**
       * Children to pass through the component.
       */
      children?: React.ReactNode;
      /**
       * If true, component will be disabled.
       * @default false
       */
      disabled?: boolean;
      /**
       * Creates a link for the button.
       */
      href?: string;
      /**
       * Value of the icon (See Font Icon Component).
       */
      icon?: React.ReactNode | string;
      /**
       * If true, the neutral colors are inverted. Useful to put a button over a dark background.
       */
      inverse?: boolean;
      /**
       * Set it to false if you don't want the neutral styles to be included.
       * @default true
       */
      neutral?: boolean;
      /**
       * Fires after the mouse leaves the Component.
       */
      onMouseLeave?: React.MouseEventHandler;
      /**
       * Fires after the mouse is released from the Component.
       */
      OnMouseUp?: React.MouseEventHandler;
      /**
       * Indicates if the button should have primary color.
       * @default false
       */
      primary?: boolean;
      /**
       * If true, component will have a ripple effect on click.
       * @default true
       */
      ripple?: boolean;
      /**
       * Classnames object defining the component style.
       */
      theme?: IconButtonTheme;
    }
    export class IconButton extends React.Component<IconButtonProps, {}> {
    }
  }

  namespace Card {
    export interface CardTheme {
      card?: string;
      raised?: string;
    }
    interface CardProps extends Props {
      /**
       * Children to pass through the component.
       */
      children?: React.ReactNode;
      raised?: boolean;
      /**
       * Classnames object defining the component style.
       */
      theme?: CardTheme;
    }
    export class Card extends React.Component<CardProps, {}> {
    }

    export interface CardActionsTheme {
      cardActions?: string;
    }
    interface CardActionsProps extends Props {
      /**
       * Children to pass through the component.
       */
      children?: React.ReactNode;
      /**
       * Classnames object defining the component style.
       */
      theme?: CardActionsTheme;
    }
    export class CardActions extends React.Component<CardActionsProps, {}> {
    }

    export interface CardMediaTheme {
      cardMedia?: string;
      content?: string;
      contentOverlay?: string;
      square?: string;
      wide?: string;
    }
    interface CardMediaProps extends Props {
      aspectRatio?: "wide" | "square";
      /**
       * Children to pass through the component.
       */
      children?: React.ReactNode;
      color?: string;
      contentOverlay?: boolean;
      image?: React.ReactNode | string;
      /**
       * Classnames object defining the component style.
       */
      theme?: CardMediaTheme;
    }
    export class CardMedia extends React.Component<CardMediaProps, {}> {
    }

    export interface CardTextTheme {
      cardText?: string;
    }
    interface CardTextProps extends Props {
      /**
       * Children to pass through the component.
       */
      children?: React.ReactNode;
      /**
       * Classnames object defining the component style.
       */
      theme?: CardTextTheme;
    }
    export class CardText extends React.Component<CardTextProps, {}> {
    }

    export interface CardTitleTheme {
      large?: string;
      title?: string;
      small?: string;
      subtitle?: string;
    }
    interface CardTitleProps extends Props {
      avatar?: React.ReactNode | string;
      /**
       * Children to pass through the component.
       */
      children?: React.ReactNode;
      subtitle?: React.ReactNode | string;
      /**
       * Classnames object defining the component style.
       */
      theme?: CardTitleTheme;
      title?: React.ReactNode | string;
    }
    export class CardTitle extends React.Component<CardTitleProps, {}> {
    }
  }

  export interface CheckboxTheme {
    check?: string;
    checked?: string;
    disabled?: string;
    field?: string;
    input?: string;
    ripple?: string;
  }
  interface CheckboxProps extends Props {
    checked?: boolean;
    disabled?: boolean;
    label?: React.ReactNode | string;
    name?: string;
    onChange?: React.MouseEventHandler;
    /**
     * Classnames object defining the component style.
     */
    theme?: CheckboxTheme;
  }
  export class Checkbox extends React.Component<CheckboxProps, {}> {
  }

  export interface ChipTheme {
    avatar?: string;
    chip?: string;
    deletable?: string;
    delete?: string;
    deleteIcon?: string;
    deleteX?: string;
  }
  interface ChipProps extends Props {
    /**
     * Children to pass through the component.
     */
    children?: React.ReactNode;
    deleteable?: boolean;
    onDeleteClick?: React.MouseEventHandler;
    /**
     * Classnames object defining the component style.
     */
    theme?: ChipTheme;
  }
  export class Chip extends React.Component<ChipProps, {}> {
  }

  export interface DatePickerTheme {
    active?: string;
    button?: string;
    calendar?: string;
    calendarWrapper?: string;
    date?: string;
    day?: string;
    days?: string;
    dialog?: string;
    disabled?: string;
    header?: string;
    input?: string;
    month?: string;
    monthsDisplay?: string;
    next?: string;
    prev?: string;
    title?: string;
    week?: string;
    year?: string;
    years?: string;
    yearsDisplay?: string;
  }
  interface DatePickerProps extends Props {
    autoOk?: boolean;
    error?: string;
    icon?: React.ReactNode | string;
    inputClassName?: string;
    inputFormat?: Function;
    label?: string;
    maxDate?: Date;
    minDate?: Date;
    name?: string;
    onChange?: React.MouseEventHandler;
    onEscKeyDown?: React.KeyboardEventHandler;
    onOverlayClick?: React.MouseEventHandler;
    /**
     * Classnames object defining the component style.
     */
    theme?: DatePickerTheme;
    value?: Date | string;
  }
  export class DatePicker extends React.Component<DatePickerProps, {}> {
  }

  export interface DialogTheme {
    active?: string;
    body?: string;
    button?: string;
    dialog?: string;
    navigation?: string;
    title?: string;
  }
  interface DialogActionProps {
    label?: string;
  }
  interface DialogProps extends Props {
    actions?: DialogActionProps[];
    active?: boolean;
    /**
     * Children to pass through the component.
     */
    children?: React.ReactNode;
    onEscKeyDown?: React.KeyboardEventHandler;
    onOverlayClick?: React.MouseEventHandler;
    onOverlayMouseDown?: React.MouseEventHandler;
    onOverlayMouseMove?: React.MouseEventHandler;
    onOverlayMouseUp?: React.MouseEventHandler;
    /**
     * Classnames object defining the component style.
     */
    theme?: DialogTheme;
    title?: string;
    type?: string;
  }
  export class Dialog extends React.Component<DialogProps, {}> {
  }

  export interface DrawerTheme {
    active?: string;
    content?: string;
    drawer?: string;
    left?: string;
    right?: string;
  }
  interface DrawerProps extends Props {
    active?: boolean;
    /**
     * Children to pass through the component.
     */
    children?: React.ReactNode;
    onOverlayClick?: React.MouseEventHandler;
    /**
     * Classnames object defining the component style.
     */
    theme?: DrawerTheme;
    type?: "left" | "right";
  }
  export class Drawer extends React.Component<DrawerProps, {}> {
  }

  export interface DropdownTheme {
    active?: string;
    disabled?: string;
    dropdown?: string;
    error?: string;
    errored?: string;
    field?: string;
    label?: string;
    selected?: string;
    templateValue?: string;
    up?: string;
    value?: string;
    values?: string;
  }
  interface DropdownProps extends Props {
    allowBlank?: boolean;
    auto?: boolean;
    disabled?: boolean;
    error?: string;
    label?: string;
    name?: string;
    onBlur?: React.FocusEventHandler;
    onChange?: React.FormEventHandler;
    onFocus?: React.FocusEventHandler;
    source: any[];
    template?: Function;
    /**
     * Classnames object defining the component style.
     */
    theme?: DropdownTheme;
    value?: string | number;
  }
  export class Dropdown extends React.Component<DropdownProps, {}> {
  }

  interface FontIconProps extends Props {
    /**
     * Children to pass through the component.
     */
    children?: React.ReactNode;
    value?: React.ReactNode | string;
  }
  export class FontIcon extends React.Component<FontIconProps, {}> {
  }

  export interface InputTheme {
    bar?: string;
    counter?: string;
    disabled?: string;
    error?: string;
    errored?: string;
    hidden?: string;
    hint?: string;
    icon?: string;
    input?: string;
    inputElement?: string;
    required?: string;
    withIcon?: string;
  }
  interface InputProps extends Props {
    /**
     * Children to pass through the component.
     */
    children?: React.ReactNode;
    disabled?: boolean;
    error?: string;
    floating?: boolean;
    hint?: string;
    icon?: React.ReactNode | string;
    label?: string;
    maxLength?: number;
    multiLine?: boolean;
    name?: string;
    onBlur?: React.FocusEventHandler;
    onChange?: React.FormEventHandler;
    onFocus?: React.FocusEventHandler;
    onKeyPress?: React.MouseEventHandler;
    required?: boolean;
    /**
     * Classnames object defining the component style.
     */
    theme?: InputTheme;
    type?: string;
    value?: any;
  }
  export class Input extends React.Component<InputProps, {}> {
  }

  namespace Layout {
    export interface LayoutTheme {
      layout?: string;
    }
    interface LayoutProps extends Props {
      /**
       * Children to pass through the component.
       */
      children?: [NavDrawer | Panel | Sidebar];
      /**
       * Classnames object defining the component style.
       */
      theme?: LayoutTheme;
    }
    export class Layout extends React.Component<LayoutProps, {}> {
    }

    export interface NavDrawerTheme {
      active?: string;
      drawerContent?: string;
      lgPermangent?: string;
      mdPermangent?: string;
      navDrawer?: string;
      pinned?: string;
      scrim?: string;
      scrollY?: string;
      smPermanent?: string;
      wide?: string;
      xlPermanent?: string;
      xxlPermangent?: string;
      xxxlPermangent?: string;
    }
    interface NavDrawerProps extends Props {
      active?: boolean;
      /**
       * Children to pass through the component.
       */
      children?: React.ReactNode;
      onOverlayClick?: React.MouseEventHandler;
      permanentAt?: "sm" | "md" | "lg" | "xl" | "xxl" | "xxxl";
      pinned?: boolean;
      scrollY?: boolean;
      /**
       * Classnames object defining the component style.
       */
      theme?: NavDrawerTheme;
      width?: "normal" | "wide";
    }
    export class NavDrawer extends React.Component<NavDrawerProps, {}> {
    }

    export interface PanelTheme {
      panel?: string;
      scrollY?: string;
    }
    interface PanelProps extends Props {
      /**
       * Children to pass through the component.
       */
      children?: React.ReactNode;
      scrollY?: boolean;
      /**
       * Classnames object defining the component style.
       */
      theme?: PanelTheme;
    }
    export class Panel extends React.Component<PanelProps, {}> {
    }

    export interface SidebarTheme {
      pinned?: string;
      scrollY?: string;
      sidebar?: string;
      sidebarContent?: string;
    }
    interface SidebarProps extends Props {
      /**
       * Children to pass through the component.
       */
      children?: React.ReactNode;
      pinned?: boolean;
      scrollY?: boolean;
      /**
       * Classnames object defining the component style.
       */
      theme?: SidebarTheme;
      width?: number; // 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 25 | 33 | 50 | 66 | 75 | 100;
    }
    export class Sidebar extends React.Component<SidebarProps, {}> {
    }
  }

  export interface LinkTheme {
    active?: string;
    icon?: string;
    link?: string;
  }
  interface LinkProps extends Props {
    active?: boolean;
    /**
     * Children to pass through the component.
     */
    children?: React.ReactNode;
    count?: number;
    icon?: React.ReactNode | string;
    label?: string;
    /**
     * Classnames object defining the component style.
     */
    theme?: LinkTheme;
  }
  export class Link extends React.Component<LinkProps, {}> {
  }


  namespace List {
    export interface ListTheme {
      list?: string;
    }
    interface ListProps extends Props {
      /**
       * Children to pass through the component.
       */
      children?: React.ReactNode;
      ripple?: boolean;
      selectable?: boolean;
      /**
       * Classnames object defining the component style.
       */
      theme?: ListTheme;
    }
    export class List extends React.Component<ListProps, {}> {
    }

    export interface ListCheckboxTheme {
      checkbox?: string;
      checkboxItem?: string;
      disabled?: string;
      item?: string;
      itemContentRoot?: string;
      itemText?: string;
      large?: string;
      primary?: string;
    }
    interface ListCheckboxProps extends Props {
      caption?: string;
      checked?: boolean;
      disabled?: boolean;
      legend?: string;
      name?: string;
      onBlur?: React.FocusEventHandler;
      onChange?: React.FormEventHandler;
      onFocus?: React.FocusEventHandler;
      /**
       * Classnames object defining the component style.
       */
      theme?: ListCheckboxTheme;
    }
    export class ListCheckbox extends React.Component<ListCheckboxProps, {}> {
    }

    export interface ListDividerTheme {
      divider?: string;
      inset?: string;
    }
    interface ListDividerProps extends Props {
      inset?: boolean;
      /**
       * Classnames object defining the component style.
       */
      theme?: ListDividerTheme;
    }
    export class ListDivider extends React.Component<ListDivider, {}> {
    }

    export interface ListItemTheme {
      disabled?: string;
      item?: string;
      itemAction?: string;
      large?: string;
      left?: string;
      listItem?: string;
      primary?: string;
      right?: string;
      selectable?: string;
    }
    interface ListItemProps extends Props {
      avatar?: React.ReactNode | string;
      caption?: string;
      /**
       * Children to pass through the component.
       */
      children?: React.ReactNode;
      disabled?: boolean;
      itemContent?: React.ReactNode;
      leftActions?: React.ReactNode;
      leftIcon?: React.ReactNode | string;
      rightIcon?: React.ReactNode | string;
      ripple?: boolean;
      selectable?: boolean;
      /**
       * Classnames object defining the component style.
       */
      theme?: ListItemTheme;
      to?: string;
    }
    export class ListItem extends React.Component<ListItemProps, {}> {
    }

    export interface ListSubHeaderTheme {
      subheader?: string;
    }
    interface ListSubHeaderProps extends Props {
      caption?: boolean;
      /**
       * Classnames object defining the component style.
       */
      theme?: ListSubHeaderTheme;
    }
    export class ListSubHeader extends React.Component<ListSubHeaderProps, {}> {
    }
  }


  namespace Menu {
    export interface MenuTheme {
      active?: string;
      bottomLeft?: string;
      bottomRight?: string;
      menu?: string;
      menuInner?: string;
      outline?: string;
      rippled?: string;
      static?: string;
      topLeft?: string;
      topRight?: string;
    }
    interface MenuProps extends Props {
      active?: boolean;
      /**
       * Children to pass through the component.
       */
      children?: React.ReactNode;
      onHide?: Function;
      onSelect?: Function;
      onShow?: Function;
      position?: "auto" | "static" | "topLeft" | "topRight" | "bottomLeft" | "bottomRight";
      ripple?: boolean;
      selectable?: boolean;
      selected?: any;
      /**
       * Classnames object defining the component style.
       */
      theme?: MenuTheme;
    }
    export class Menu extends React.Component<MenuProps, {}> {
    }

    export interface IconMenuTheme {
      icon?: string;
      iconMenu?: string;
    }
    interface IconMenuProps extends Props {
      /**
       * Children to pass through the component.
       */
      children?: React.ReactNode;
      icon?: React.ReactNode | string;
      iconRipple?: boolean;
      menuRipple?: boolean;
      onSelect?: Function;
      onShow?: Function;
      position?: "auto" | "static" | "topLeft" | "topRight" | "bottomLeft" | "bottomRight";
      selectable?: boolean;
      selected?: any;
      /**
       * Classnames object defining the component style.
       */
      theme?: IconMenuTheme;
    }
    export class IconMenu extends React.Component<IconMenuProps, {}> {
    }

    export interface MenuDividerTheme {
      menuDivider?: string;
    }
    interface MenuDividerProps extends Props {
      /**
       * Classnames object defining the component style.
       */
      theme?: MenuDividerTheme;
    }
    export class MenuDivider extends React.Component<MenuDividerProps, {}> {
    }

    export interface ListDividerTheme {
      divider?: string;
      inset?: string;
    }
    interface ListDividerProps extends Props {
      inset?: boolean;
      /**
       * Classnames object defining the component style.
       */
      theme?: ListDividerTheme;
    }
    export class ListDivider extends React.Component<ListDivider, {}> {
    }

    export interface MenuItemTheme {
      caption?: string;
      disabled?: string;
      icon?: string;
      menuItem?: string;
      selected?: string;
      shortcut?: string;
    }
    interface MenuItemProps extends Props {
      caption?: string;
      /**
       * Children to pass through the component.
       */
      children?: React.ReactNode;
      disabled?: boolean;
      icon?: React.ReactNode | string;
      selected?: boolean;
      /**
       * Classnames object defining the component style.
       */
      theme?: MenuItemTheme;
    }
    export class MenuItem extends React.Component<MenuItemProps, {}> {
    }
  }

  export interface NavigationTheme {
    button?: string;
    horizontal?: string;
    link?: string;
    vertical?: string;
  }
  interface NavigationProps extends Props {
    actions?: any[];
    /**
     * Children to pass through the component.
     */
    children?: React.ReactNode;
    routes?: any[];
    /**
     * Classnames object defining the component style.
     */
    theme?: NavigationTheme;
    type?: "vertical" | "horizontal";
  }
  export class Navigation extends React.Component<NavigationProps, {}> {
  }

  export interface ProgressBarTheme {
    buffer?: string;
    circle?: string;
    circular?: string;
    indeterminate?: string;
    linear?: string;
    multicolor?: string;
    path?: string;
    value?: string;
  }
  interface ProgressBarProps extends Props {
    buffer?: number;
    max?: number;
    min?: number;
    mode?: "determinate" | "indeterminate";
    multicolor?: boolean;
    /**
     * Classnames object defining the component style.
     */
    theme?: ProgressBarTheme;
    type?: "linear" | "circular";
    value?: number;
  }
  export class ProgressBar extends React.Component<ProgressBarProps, {}> {
  }


  namespace Radio {
    interface RadioGroupProps extends Props {
      /**
       * Children to pass through the component.
       */
      children?: React.ReactNode;
      disabled?: boolean;
      name?: string;
      onChange?: Function;
      value?: number;
    }
    export class RadioGroup extends React.Component<RadioGroupProps, {}> {
    }

    export interface RadioButtonTheme {
      radio?: string;
      radioChecked?: string;
      ripple?: string;
      disabled?: string;
      field?: string;
      input?: string;
      text?: string;
    }
    interface RadioButtonProps extends Props {
      checked?: boolean;
      disabled?: boolean;
      label?: React.ReactNode | string;
      name?: string;
      onBlur?: React.FocusEventHandler;
      onChange?: React.FormEventHandler;
      onFocus?: React.FocusEventHandler;
      /**
       * Classnames object defining the component style.
       */
      theme?: RadioButtonTheme;
      value?: any;
    }
    export class RadioButton extends React.Component<RadioButtonProps, {}> {
    }
  }

  export interface RippleTheme {
    ripple?: string;
    rippleActive?: string;
    rippleRestarting?: string;
    riplleWrapper?: string;
  }
  interface RippleProps {
    /**
     * Children to pass through the component.
     */
    children?: React.ReactNode;
    disabled?: boolean;
    onRippleEnded?: Function;
    spread?: number;
    /**
     * Classnames object defining the component style.
     */
    theme?: RippleTheme;
  }
  export class Ripple extends React.Component<RippleProps, {}> {
  }

  export interface SliderTheme {
    container?: string;
    editable?: string;
    innerknob?: string;
    innerprogress?: string;
    input?: string;
    knob?: string;
    pinned?: string;
    pressed?: string;
    progress?: string;
    ring?: string;
    slider?: string;
    snap?: string;
    snaps?: string;
  }
  interface SliderProps {
    editable?: boolean;
    max?: number;
    min?: number;
    onChange?: Function;
    pinned?: boolean;
    snaps?: boolean;
    step?: number;
    /**
     * Classnames object defining the component style.
     */
    theme?: RippleTheme;
    value?: number;
  }
  export class Slider extends React.Component<SliderProps, {}> {
  }

  export interface SnackbarTheme {
    accept?: string;
    active?: string;
    button?: string;
    cancel?: string;
    icon?: string;
    label?: string;
    snackbar?: string;
    warning?: string;
  }
  interface SnackbarProps {
    action?: string;
    active?: boolean;
    icon?: React.ReactNode | string;
    label?: string;
    onTimeout?: Function;
    /**
     * Classnames object defining the component style.
     */
    theme?: SnackbarTheme;
    timeout?: number;
    type?: "accept" | "cancel" | "warning";
  }
  export class Snackbar extends React.Component<SnackbarProps, {}> {
  }

  export interface SwitchTheme {
    disabled?: string;
    field?: string;
    input?: string;
    off?: string;
    on?: string;
    ripple?: string;
    text?: string;
    thumb?: string;
  }
  interface SwitchProps {
    checked?: boolean;
    disabled?: boolean;
    label?: string;
    name?: string;
    onBlur?: React.FocusEventHandler;
    onChange?: React.FormEventHandler;
    onFocus?: React.FocusEventHandler;
    /**
     * Classnames object defining the component style.
     */
    theme?: SwitchTheme;
  }
  export class Switch extends React.Component<SwitchProps, {}> {
  }

  export interface TableTheme {
    editable?: string;
    row?: string;
    selectable?: string;
    selected?: string;
    table?: string;
  }
  interface TableProps {
    heading?: boolean;
    model?: any;
    onChange?: Function;
    onSelect?: React.FormEventHandler;
    selectable?: boolean;
    multiSelectable?: boolean;
    selected?: any[];
    source?: any[];
    /**
     * Classnames object defining the component style.
     */
    theme?: TableTheme;
  }
  export class Table extends React.Component<TableProps, {}> {
  }


  namespace Tabs {
    export interface TabsTheme {
      active?: string;
      navigation?: string;
      pointer?: string;
      tabs?: string;
      tab?: string;
    }
    interface TabsProps extends Props {
      /**
       * Children to pass through the component.
       */
      children?: React.ReactNode;
      disableAnimatedBottomBorder?: boolean;
      index?: number;
      onChange?: Function;
      /**
       * Classnames object defining the component style.
       */
      theme?: TabsTheme;
    }
    export class Tabs extends React.Component<TabsProps, {}> {
    }

    export interface TabTheme {
      active?: string;
      disabled?: string;
      hidden?: string;
      label?: string;
    }
    interface TabProps extends Props {
      active?: boolean;
      activeClassName?: string;
      disabled?: boolean;
      hidden?: boolean;
      label?: string;
      onActive?: Function;
      /**
       * Classnames object defining the component style.
       */
      theme?: TabTheme;
    }
    export class Tab extends React.Component<TabProps, {}> {
    }
  }

  export interface TimePickerTheme {
    active?: string;
    am?: string;
    amFormat?: string;
    ampm?: string;
    button?: string;
    clock?: string;
    clockWrapper?: string;
    dialog?: string;
    face?: string;
    hand?: string;
    header?: string;
    hours?: string;
    hoursDisplay?: string;
    input?: string;
    knob?: string;
    minutes?: string;
    minutesDisplay?: string;
    number?: string;
    placeholder?: string;
    pm?: string;
    pmFormat?: string;
    separator?: string;
    small?: string;
  }
  interface TimePickerProps {
    error?: string;
    inputClassName?: string;
    format?: "24hr" | "ampm";
    label?: string;
    onChange?: Function;
    /**
     * Classnames object defining the component style.
     */
    theme?: TimePickerTheme;
    value?: Date;
  }
  export class TimePicker extends React.Component<TimePickerProps, {}> {
  }

  export interface TooltipTheme {
    tooltip?: string;
    tooltipActive?: string;
    tooltipWrapper?: string;
  }
  interface TooltipProps {
    onMouseEnter?: React.MouseEventHandler;
    onMouseLeave?: React.MouseEventHandler;
    /**
     * Classnames object defining the component style.
     */
    theme?: TooltipTheme;
    tooltip?: string;
    tooltipDelay?: number;
    tooltipHideOnClick?: boolean;
  }
  class TooltipComponent<P, S> extends React.Component<P, S> {
    props: P & TooltipProps;
  }
  interface TooltippedComponentClass<P> extends TooltipProps {
    new (props?: P, context?: any): TooltipComponent<P, any>;
  }
  export function Tooltip<P>(componentClass: React.ComponentClass<P>): TooltippedComponentClass<P>;
}

declare module "react-toolbox/lib/app_bar" {
  export import AppBar = __ReactToolbox.AppBar;
  export default AppBar;

  export import AppBarTheme = __ReactToolbox.AppBarTheme;
}

declare module "react-toolbox/lib/autocomplete" {
  export import Autocomplete = __ReactToolbox.Autocomplete;
  export default Autocomplete;

  export import AutocompleteTheme = __ReactToolbox.Autocomplete;
}

declare module "react-toolbox/lib/avatar" {
  export import Avatar = __ReactToolbox.Avatar;
  export default Avatar;

  export import AvatarTheme = __ReactToolbox.AvatarTheme;
}

declare module "react-toolbox/lib/button" {
  export import Button = __ReactToolbox.Button.Button;
  export import IconButton = __ReactToolbox.Button.IconButton;
  export default { Button, IconButton };

  export import ButtonTheme = __ReactToolbox.Button.ButtonTheme;
  export import IconButtonTheme = __ReactToolbox.Button.IconButtonTheme;
}

declare module "react-toolbox/lib/card" {
  export import Card = __ReactToolbox.Card.Card;
  export import CardActions = __ReactToolbox.Card.CardActions;
  export import CardMedia = __ReactToolbox.Card.CardMedia;
  export import CardText = __ReactToolbox.Card.CardText;
  export import CardTitle = __ReactToolbox.Card.CardTitle;
  export default { Card, CardActions, CardMedia, CardText, CardTitle };

  export import CardTheme = __ReactToolbox.Card.CardTheme;
  export import CardActionsTheme = __ReactToolbox.Card.CardActionsTheme;
  export import CardMediaTheme = __ReactToolbox.Card.CardMediaTheme;
  export import CardTextTheme = __ReactToolbox.Card.CardTextTheme;
  export import CardTitleTheme = __ReactToolbox.Card.CardTitleTheme;
}

declare module "react-toolbox/lib/checkbox" {
  export import Checkbox = __ReactToolbox.Checkbox;
  export default Checkbox;

  export import CheckboxTheme = __ReactToolbox.CheckboxTheme;
}

declare module "react-toolbox/lib/chip" {
  export import Chip = __ReactToolbox.Chip;
  export default Chip;

  export import ChipTheme = __ReactToolbox.ChipTheme;
}

declare module "react-toolbox/lib/date_picker" {
  export import DatePicker = __ReactToolbox.DatePicker;
  export default DatePicker;

  export import DatePickerTheme = __ReactToolbox.DatePickerTheme;
}

declare module "react-toolbox/lib/dialog" {
  export import Dialog = __ReactToolbox.Dialog;
  export default Dialog;

  export import DialogTheme = __ReactToolbox.DialogTheme;
}

declare module "react-toolbox/lib/drawer" {
  export import Drawer = __ReactToolbox.Drawer;
  export default Drawer;

  export import DrawerTheme = __ReactToolbox.DrawerTheme;
}

declare module "react-toolbox/lib/dropdown" {
  export import Dropdown = __ReactToolbox.Dropdown;
  export default Dropdown;

  export import DropdownTheme = __ReactToolbox.DropdownTheme;
}

declare module "react-toolbox/lib/font_icon" {
  export import FontIcon = __ReactToolbox.FontIcon;
  export default FontIcon;
}

declare module "react-toolbox/lib/input" {
  export import Input = __ReactToolbox.Input;
  export default Input;

  export import InputTheme = __ReactToolbox.InputTheme;
}

declare module "react-toolbox/lib/layout" {
  export import Layout = __ReactToolbox.Layout.Layout;
  export import NavDrawer = __ReactToolbox.Layout.NavDrawer;
  export import Panel = __ReactToolbox.Layout.Panel;
  export import Sidebar = __ReactToolbox.Layout.Sidebar;
  export default { Layout, NavDrawer, Panel, Sidebar }

  export import LayoutTheme = __ReactToolbox.Layout.LayoutTheme;
  export import NavDrawerTheme = __ReactToolbox.Layout.NavDrawerTheme;
  export import PanelTheme = __ReactToolbox.Layout.PanelTheme;
  export import SidebarTheme = __ReactToolbox.Layout.SidebarTheme;
}

declare module "react-toolbox/lib/link" {
  export import Link = __ReactToolbox.Link;
  export default Link;

  export import LinkTheme = __ReactToolbox.LinkTheme;
}

declare module "react-toolbox/lib/list" {
  export import List = __ReactToolbox.List.List;
  export import ListCheckbox = __ReactToolbox.List.ListCheckbox;
  export import ListDivider = __ReactToolbox.List.ListDivider;
  export import ListItem = __ReactToolbox.List.ListItem;
  export import ListSubHeader = __ReactToolbox.List.ListSubHeader;
  export default { List, ListCheckbox, ListDivider, ListItem, ListSubHeader };

  export import ListTheme = __ReactToolbox.List.ListTheme;
  export import ListCheckboxTheme = __ReactToolbox.List.ListCheckboxTheme;
  export import ListDividerTheme = __ReactToolbox.List.ListDividerTheme;
  export import ListItemTheme = __ReactToolbox.List.ListItemTheme;
  export import ListSubHeaderTheme = __ReactToolbox.List.ListSubHeaderTheme;
}

declare module "react-toolbox/lib/menu" {
  export import Menu = __ReactToolbox.Menu.Menu;
  export import IconMenu = __ReactToolbox.Menu.IconMenu;
  export import MenuDivider = __ReactToolbox.Menu.MenuDivider;
  export import MenuItem = __ReactToolbox.Menu.MenuItem;
  export default { Menu, IconMenu, MenuDivider, MenuItem };
}

declare module "react-toolbox/lib/navigation" {
  export import Navigation = __ReactToolbox.Navigation;
  export default Navigation;
}

declare module "react-toolbox/lib/progress_bar" {
  export import Progressbar = __ReactToolbox.ProgressBar;
  export default Progressbar;
}

declare module "react-toolbox/lib/radio" {
  export import RadioGroup = __ReactToolbox.Radio.RadioGroup;
  export import RadioButton = __ReactToolbox.Radio.RadioButton;
  export default { RadioGroup, RadioButton };
}

declare module "react-toolbox/lib/ripple" {
  export import Ripple = __ReactToolbox.Ripple;
  export default Ripple;
}

declare module "react-toolbox/lib/slider" {
  export import Slider = __ReactToolbox.Slider;
  export default Slider;
}

declare module "react-toolbox/lib/snackbar" {
  export import Snackbar = __ReactToolbox.Snackbar;
  export default Snackbar;
}

declare module "react-toolbox/lib/switch" {
  export import Switch = __ReactToolbox.Switch;
  export default Switch;
}

declare module "react-toolbox/lib/table" {
  export import Table = __ReactToolbox.Table;
  export default Table;
}

declare module "react-toolbox/lib/tabs" {
  export import Tab = __ReactToolbox.Tabs.Tab;
  export import Tabs = __ReactToolbox.Tabs.Tabs;
  export default { Tab, Tabs };
}

declare module "react-toolbox/lib/time_picker" {
  export import TimePicker = __ReactToolbox.TimePicker;
  export default TimePicker;
}

declare module "react-toolbox/lib/tooltip" {
  export import Tooltip = __ReactToolbox.Tooltip;
  export default Tooltip;
}
