// Type definitions for react-toolbox 1.0.2
// Project: https://github.com/react-toolbox/react-toolbox
// Definitions by: Per Bergqwist <https://github.com/normano64>

// __ReactToolbox
declare namespace __ReactToolbox {
  import React = __React;

  interface Props {
    className?: string;
    key?: string | number;
    onClick?: React.MouseEventHandler;
    style?: React.CSSProperties;
  }

  /**
   * <AppBar/>
   */
  interface AppBarThemeProps {
    appBar?: string;
    fixed?: string;
    flat?: string;
  }
  interface AppBarProps extends Props {
    children?: React.ReactNode;
    fixed?: boolean;
    flat?: boolean;
    theme?: AppBarThemeProps;
  }
  export class AppBar extends React.Component<AppBarProps, {}> {
  }

  /**
   * <Autocomplete/>
   */
  interface AutocompleteThemeProps {
    active?: string;
    autocomplete?: string;
    focus?: string;
    input?: string;
    label?: string;
    suggestion?: string;
    suggestions?: string;
    up?: string;
    value?: string;
    values?: string;
  }
  interface AutocompleteProps extends Props {
    direction?: "auto" | "up" | "down";
    disabled?: boolean;
    error?: string;
    label?: string;
    multiple?: boolean;
    onChange?: React.FormEventHandler;
    selectedPosition?: "above" | "below";
    showSuggestionsWHenValueIsSet?: boolean;
    source?: any;
    suggestionMatch?: "start" | "anywhere" | "word";
    style?: React.CSSProperties;
    theme?: AutocompleteThemeProps;
    value?: any;
  }
  export class Autocomplete extends React.Component<AutocompleteProps, {}> {
  }

  /**
   * <Avatar/>
   */
  interface AvatarThemeProps {
    avatar?: string;
    image?: string;
    letter?: string;
  }
  interface AvatarProps extends Props {
    children?: React.ReactNode;
    cover?: boolean;
    icon?: React.ReactNode | string;
    image?: React.ReactNode | string;
    theme?: AvatarThemeProps;
    title?: string;
  }
  export class Avatar extends React.Component<AvatarProps, {}> {
  }

  // Button
  namespace Button {
    /**
     * <Button/>
     */
    interface ButtonThemeProps {
      accent?: string;
      button?: string;
      flat?: string;
      floating?: string;
      icon?: string;
      inverse?: string;
      mini?: string;
      neutral?: string;
      primary?: string;
      raised?: string;
      rippleWrapper?: string;
      toggle?: string;
    }
    interface ButtonProps extends Props {
      accent?: boolean;
      children?: React.ReactNode;
      disabled?: boolean;
      flat?: boolean;
      floating?: boolean;
      href?: string;
      icon?: React.ReactNode | string;
      inverse?: boolean;
      label?: string;
      mini?: boolean;
      neutral?: boolean;
      onMouseLeave?: React.MouseEventHandler;
      OnMouseUp?: React.MouseEventHandler;
      primary?: boolean;
      raised?: boolean;
      ripple?: boolean;
      theme?: ButtonThemeProps;
    }
    export class Button extends React.Component<ButtonProps, {}> {
    }

    /**
     * <IconButton/>
     */
    interface IconButtonThemeProps {
      accent?: string;
      button?: string;
      icon?: string;
      inverse?: string;
      neutral?: string;
      primary?: string;
      rippleWrapper?: string;
      toggle?: string;
    }
    interface IconButtonProps extends Props {
      accent?: boolean;
      children?: React.ReactNode;
      disabled?: boolean;
      href?: string;
      icon?: React.ReactNode | string;
      inverse?: boolean;
      neutral?: boolean;
      onMouseLeave?: React.MouseEventHandler;
      OnMouseUp?: React.MouseEventHandler;
      primary?: boolean;
      ripple?: boolean;
      theme?: IconButtonThemeProps;
    }
    export class IconButton extends React.Component<IconButtonProps, {}> {
    }
  } // Button

  // Card
  namespace Card {
    /**
     * <Card/>
     */
    interface CardThemeProps {
      card?: string;
      raised?: string;
    }
    interface CardProps extends Props {
      children?: React.ReactNode;
      raised?: boolean;
      theme?: CardThemeProps;
    }
    export class Card extends React.Component<CardProps, {}> {
    }

    /**
     * <CardActions/>
     */
    interface CardActionsThemeProps {
      cardActions?: string;
    }
    interface CardActionsProps extends Props {
      children?: React.ReactNode;
      theme?: CardActionsThemeProps;
    }
    export class CardActions extends React.Component<CardActionsProps, {}> {
    }

    /**
     * <CardMedia/>
     */
    interface CardMediaThemeProps {
      cardMedia?: string;
      content?: string;
      contentOverlay?: string;
      square?: string;
      wide?: string;
    }
    interface CardMediaProps extends Props {
      aspectRatio?: "wide" | "square";
      children?: React.ReactNode;
      color?: string;
      contentOverlay?: boolean;
      image?: React.ReactNode | string;
      theme?: CardMediaThemeProps;
    }
    export class CardMedia extends React.Component<CardMediaProps, {}> {
    }

    /**
     * <CardText/>
     */
    interface CardTextThemeProps {
      cardText?: string;
    }
    interface CardTextProps extends Props {
      children?: React.ReactNode;
      theme?: CardTextThemeProps;
    }
    export class CardText extends React.Component<CardTextProps, {}> {
    }

    /**
     * <CardTitle/>
     */
    interface CardTitleThemeProps {
      large?: string;
      title?: string;
      small?: string;
      subtitle?: string;
    }
    interface CardTitleProps extends Props {
      avatar?: React.ReactNode | string;
      children?: React.ReactNode;
      subtitle?: React.ReactNode | string;
      theme?: CardTitleThemeProps;
      title?: React.ReactNode | string;
    }
    export class CardTitle extends React.Component<CardTitleProps, {}> {
    }
  } // Card

  /**
   * <Checkbox/>
   */
  interface CheckboxThemeProps {
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
    theme?: CheckboxThemeProps;
  }
  export class Checkbox extends React.Component<CheckboxProps, {}> {
  }

  /**
   * <Chip/>
   */
  interface ChipThemeProps {
    avatar?: string;
    chip?: string;
    deletable?: string;
    delete?: string;
    deleteIcon?: string;
    deleteX?: string;
  }
  interface ChipProps extends Props {
    children?: React.ReactNode;
    deleteable?: boolean;
    onDeleteClick?: React.MouseEventHandler;
    theme?: ChipThemeProps;
  }
  export class Chip extends React.Component<ChipProps, {}> {
  }

  /**
   * <DatePicker/>
   */
  interface DatePickerThemeProps {
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
    theme?: DatePickerThemeProps;
    value?: Date | string;
  }
  export class DatePicker extends React.Component<DatePickerProps, {}> {
  }

  /**
   * <Dialog/>
   */
  interface DialogThemeProps {
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
    children?: React.ReactNode;
    onEscKeyDown?: React.KeyboardEventHandler;
    onOverlayClick?: React.MouseEventHandler;
    onOverlayMouseDown?: React.MouseEventHandler;
    onOverlayMouseMove?: React.MouseEventHandler;
    onOverlayMouseUp?: React.MouseEventHandler;
    theme?: DialogThemeProps;
    title?: string;
    type?: string;
  }
  export class Dialog extends React.Component<DialogProps, {}> {
  }

  /**
   * <Drawer/>
   */
  interface DrawerThemeProps {
    active?: string;
    content?: string;
    drawer?: string;
    left?: string;
    right?: string;
  }
  interface DrawerProps extends Props {
    active?: boolean;
    children?: React.ReactNode;
    onOverlayClick?: React.MouseEventHandler;
    theme?: DrawerThemeProps;
    type?: "left" | "right";
  }
  export class Drawer extends React.Component<DrawerProps, {}> {
  }

  /**
   * <Dropdown/>
   */
  interface DropdownThemeProps {
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
    theme?: DropdownThemeProps;
    value?: string | number;
  }
  export class Dropdown extends React.Component<DropdownProps, {}> {
  }

  /**
   * <FontIcon/>
   */
  interface FontIconProps extends Props {
    children?: React.ReactNode;
    value?: React.ReactNode | string;
  }
  export class FontIcon extends React.Component<FontIconProps, {}> {
  }

  /**
   * <Input/>
   */
  interface InputThemeProps {
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
    theme?: InputThemeProps;
    type?: string;
    value?: any;
  }
  export class Input extends React.Component<InputProps, {}> {
  }

  // Layout
  namespace Layout {
    /**
     * <Layout/>
     */
    interface LayoutThemeProps {
      layout?: string;
    }
    interface LayoutProps extends Props {
      children?: [NavDrawer | Panel | Sidebar];
      theme?: LayoutThemeProps;
    }
    export class Layout extends React.Component<LayoutProps, {}> {
    }

    /**
     * <NavDrawer/>
     */
    interface NavDrawerThemeProps {
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
      children?: React.ReactNode;
      onOverlayClick?: React.MouseEventHandler;
      permanentAt?: "sm" | "md" | "lg" | "xl" | "xxl" | "xxxl";
      pinned?: boolean;
      scrollY?: boolean;
      theme?: NavDrawerThemeProps;
      width?: "normal" | "wide";
    }
    export class NavDrawer extends React.Component<NavDrawerProps, {}> {
    }

    /**
     * <Panel/>
     */
    interface PanelThemeProps {
      panel?: string;
      scrollY?: string;
    }
    interface PanelProps extends Props {
      children?: React.ReactNode;
      scrollY?: boolean;
      theme?: PanelThemeProps;
    }
    export class Panel extends React.Component<PanelProps, {}> {
    }

    /**
     * <Sidebar/>
     */
    interface SidebarThemeProps {
      pinned?: string;
      scrollY?: string;
      sidebar?: string;
      sidebarContent?: string;
    }
    interface SidebarProps extends Props {
      children?: React.ReactNode;
      pinned?: boolean;
      scrollY?: boolean;
      theme?: SidebarThemeProps;
      width?: number; // 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 25 | 33 | 50 | 66 | 75 | 100;
    }
    export class Sidebar extends React.Component<SidebarProps, {}> {
    }

  } // Layout

  /**
   * <Link/>
   */
  interface LinkThemeProps {
    active?: string;
    icon?: string;
    link?: string;
  }
  interface LinkProps extends Props {
    active?: boolean;
    children?: React.ReactNode;
    count?: number;
    icon?: React.ReactNode | string;
    label?: string;
    theme?: LinkThemeProps;
  }
  export class Link extends React.Component<LinkProps, {}> {
  }

  // List
  namespace List {
    /**
     * <List/>
     */
    interface ListThemeProps {
      list?: string;
    }
    interface ListProps extends Props {
      children?: React.ReactNode;
      ripple?: boolean;
      selectable?: boolean;
      theme?: ListThemeProps;
    }
    export class List extends React.Component<ListProps, {}> {
    }

    /**
     * <ListCheckbox/>
     */
    interface ListCheckboxThemeProps {
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
      theme?: ListCheckboxThemeProps;
    }
    export class ListCheckbox extends React.Component<ListCheckboxProps, {}> {
    }

    /**
     * <ListDivider/>
     */
    interface ListDividerThemeProps {
      divider?: string;
      inset?: string;
    }
    interface ListDividerProps extends Props {
      inset?: boolean;
      theme?: ListDividerThemeProps;
    }
    export class ListDivider extends React.Component<ListDivider, {}> {
    }

    /**
     * <ListItem/>
     */
    interface ListItemThemeProps {
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
      children?: React.ReactNode;
      disabled?: boolean;
      itemContent?: React.ReactNode;
      leftActions?: React.ReactNode;
      leftIcon?: React.ReactNode | string;
      rightIcon?: React.ReactNode | string;
      ripple?: boolean;
      selectable?: boolean;
      theme?: ListItemThemeProps;
      to?: string;
    }
    export class ListItem extends React.Component<ListItemProps, {}> {
    }

    /**
     * <ListSubHeader/>
     */
    interface ListSubHeaderThemeProps {
      subheader?: string;
    }
    interface ListSubHeaderProps extends Props {
      caption?: boolean;
      theme?: ListSubHeaderThemeProps;
    }
    export class ListSubHeader extends React.Component<ListSubHeaderProps, {}> {
    }
  } // List

  // Menu
  namespace Menu {
    /**
     * <Menu/>
     */
    interface MenuThemeProps {
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
      children?: React.ReactNode;
      onHide?: Function;
      onSelect?: Function;
      onShow?: Function;
      position?: "auto" | "static" | "topLeft" | "topRight" | "bottomLeft" | "bottomRight";
      ripple?: boolean;
      selectable?: boolean;
      selected?: any;
      theme?: MenuThemeProps;
    }
    export class Menu extends React.Component<MenuProps, {}> {
    }

    /**
     * <IconMenu/>
     */
    interface IconMenuThemeProps {
      icon?: string;
      iconMenu?: string;
    }
    interface IconMenuProps extends Props {
      children?: React.ReactNode;
      icon?: React.ReactNode | string;
      iconRipple?: boolean;
      menuRipple?: boolean;
      onSelect?: Function;
      onShow?: Function;
      position?: "auto" | "static" | "topLeft" | "topRight" | "bottomLeft" | "bottomRight";
      selectable?: boolean;
      selected?: any;
      theme?: IconMenuThemeProps;
    }
    export class IconMenu extends React.Component<IconMenuProps, {}> {
    }

    /**
     * <MenuDivider/>
     */
    interface MenuDividerThemeProps {
      menuDivider?: string;
    }
    interface MenuDividerProps extends Props {
      theme?: MenuDividerThemeProps;
    }
    export class MenuDivider extends React.Component<MenuDividerProps, {}> {
    }

    /**
     * <ListDivider/>
     */
    interface ListDividerThemeProps {
      divider?: string;
      inset?: string;
    }
    interface ListDividerProps extends Props {
      inset?: boolean;
      theme?: ListDividerThemeProps;
    }
    export class ListDivider extends React.Component<ListDivider, {}> {
    }

    /**
     * <MenuItem/>
     */
    interface MenuItemThemeProps {
      caption?: string;
      disabled?: string;
      icon?: string;
      menuItem?: string;
      selected?: string;
      shortcut?: string;
    }
    interface MenuItemProps extends Props {
      caption?: string;
      children?: React.ReactNode;
      disabled?: boolean;
      icon?: React.ReactNode | string;
      selected?: boolean;
      theme?: MenuItemThemeProps;
    }
    export class MenuItem extends React.Component<MenuItemProps, {}> {
    }
  } // Menu

  /**
   * <Navigation/>
   */
  interface NavigationThemeProps {
    button?: string;
    horizontal?: string;
    link?: string;
    vertical?: string;
  }
  interface NavigationProps extends Props {
    actions?: any[];
    children?: React.ReactNode;
    routes?: any[];
    theme?: NavigationThemeProps;
    type?: "vertical" | "horizontal";
  }
  export class Navigation extends React.Component<NavigationProps, {}> {
  }

  /**
   * <ProgressBar/>
   */
  interface ProgressBarThemeProps {
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
    theme?: ProgressBarThemeProps;
    type?: "linear" | "circular";
    value?: number;
  }
  export class ProgressBar extends React.Component<ProgressBarProps, {}> {
  }

  // Radio
  namespace Radio {
    /**
     * <RadioGroup/>
     */
    interface RadioGroupProps extends Props {
      children?: React.ReactNode;
      disabled?: boolean;
      name?: string;
      onChange?: Function;
      value?: number;
    }
    export class RadioGroup extends React.Component<RadioGroupProps, {}> {
    }

    /**
     * <RadioButton/>
     */
    interface RadioButtonThemeProps {
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
      theme?: RadioButtonThemeProps;
      value?: any;
    }
    export class RadioButton extends React.Component<RadioButtonProps, {}> {
    }
  } // Radio

  /**
   * <RadioButton/>
   */
  interface RippleThemeProps {
    ripple?: string;
    rippleActive?: string;
    rippleRestarting?: string;
    riplleWrapper?: string;
  }
  interface RippleProps {
    children?: React.ReactNode;
    disabled?: boolean;
    onRippleEnded?: Function;
    spread?: number;
    theme?: RippleThemeProps;
  }
  export class Ripple extends React.Component<RippleProps, {}> {
  }

  /**
   * <Slider/>
   */
  interface SliderThemeProps {
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
    theme?: RippleThemeProps;
    value?: number;
  }
  export class Slider extends React.Component<SliderProps, {}> {
  }

  /**
   * <Snackbar/>
   */
  interface SnackbarThemeProps {
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
    theme?: SnackbarThemeProps;
    timeout?: number;
    type?: "accept" | "cancel" | "warning";
  }
  export class Snackbar extends React.Component<SnackbarProps, {}> {
  }

  /**
   * <Switch/>
   */
  interface SwitchThemeProps {
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
    theme?: SwitchThemeProps;
  }
  export class Switch extends React.Component<SwitchProps, {}> {
  }

  /**
   * <Table/>
   */
  interface TableThemeProps {
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
    theme?: TableThemeProps;
  }
  export class Table extends React.Component<TableProps, {}> {
  }

  // Tabs
  namespace Tabs {
    /**
     * <Tabs/>
     */
    interface TabsThemeProps {
      active?: string;
      navigation?: string;
      pointer?: string;
      tabs?: string;
      tab?: string;
    }
    interface TabsProps extends Props {
      children?: React.ReactNode;
      disableAnimatedBottomBorder?: boolean;
      index?: number;
      onChange?: Function;
      theme?: TabsThemeProps;
    }
    export class Tabs extends React.Component<TabsProps, {}> {
    }

    /**
     * <Tab/>
     */
    interface TabThemeProps {
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
      theme?: TabThemeProps;
    }
    export class Tab extends React.Component<TabProps, {}> {
    }
  } // Tabs

  /**
   * <TimePicker/>
   */
  interface TimePickerThemeProps {
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
    theme?: TimePickerThemeProps;
    value?: Date;
  }
  export class TimePicker extends React.Component<TimePickerProps, {}> {
  }

  /**
   * <TooltipComponent/>
   */
  interface TooltipThemeProps {
    tooltip?: string;
    tooltipActive?: string;
    tooltipWrapper?: string;
  }
  interface TooltipProps {
    onMouseEnter?: React.MouseEventHandler;
    onMouseLeave?: React.MouseEventHandler;
    theme?: TooltipThemeProps;
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
} // __ReactToolbox

declare module "react-toolbox/lib/app_bar" {
  export import AppBar = __ReactToolbox.AppBar;
  export default AppBar;
}

declare module "react-toolbox/lib/autocomplete" {
  export import Autocomplete = __ReactToolbox.Autocomplete;
  export default Autocomplete;
}

declare module "react-toolbox/lib/avatar" {
  export import Avatar = __ReactToolbox.Avatar;
  export default Avatar;
}

declare module "react-toolbox/lib/button" {
  export import Button = __ReactToolbox.Button.Button;
  export import IconButton = __ReactToolbox.Button.IconButton;
  export default { Button, IconButton };
}

declare module "react-toolbox/lib/card" {
  export import Card = __ReactToolbox.Card.Card;
  export import CardActions = __ReactToolbox.Card.CardActions;
  export import CardMedia = __ReactToolbox.Card.CardMedia;
  export import CardText = __ReactToolbox.Card.CardText;
  export import CardTitle = __ReactToolbox.Card.CardTitle;
  export default { Card, CardActions, CardMedia, CardText, CardTitle };
}

declare module "react-toolbox/lib/checkbox" {
  export import Checkbox = __ReactToolbox.Checkbox;
  export default Checkbox;
}

declare module "react-toolbox/lib/chip" {
  export import Chip = __ReactToolbox.Chip;
  export default Chip;
}

declare module "react-toolbox/lib/date_picker" {
  export import DatePicker = __ReactToolbox.DatePicker;
  export default DatePicker;
}

declare module "react-toolbox/lib/dialog" {
  export import Dialog = __ReactToolbox.Dialog;
  export default Dialog;
}

declare module "react-toolbox/lib/drawer" {
  export import Drawer = __ReactToolbox.Drawer;
  export default Drawer;
}

declare module "react-toolbox/lib/dropdown" {
  export import Dropdown = __ReactToolbox.Dropdown;
  export default Dropdown;
}

declare module "react-toolbox/lib/font_icon" {
  export import FontIcon = __ReactToolbox.FontIcon;
  export default FontIcon;
}

declare module "react-toolbox/lib/input" {
  export import Input = __ReactToolbox.Input;
  export default Input;
}

declare module "react-toolbox/lib/layout" {
  export import Layout = __ReactToolbox.Layout.Layout;
  export import NavDrawer = __ReactToolbox.Layout.NavDrawer;
  export import Panel = __ReactToolbox.Layout.Panel;
  export import Sidebar = __ReactToolbox.Layout.Sidebar;
  export default { Layout, NavDrawer, Panel, Sidebar };
}

declare module "react-toolbox/lib/link" {
  export import Link = __ReactToolbox.Link;
  export default Link;
}

declare module "react-toolbox/lib/list" {
  export import List = __ReactToolbox.List.List;
  export import ListCheckbox = __ReactToolbox.List.ListCheckbox;
  export import ListDivider = __ReactToolbox.List.ListDivider;
  export import ListItem = __ReactToolbox.List.ListItem;
  export import ListSubHeader = __ReactToolbox.List.ListSubHeader;
  export default { List, ListCheckbox, ListDivider, ListItem, ListSubHeader };
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

declare module "react-toolbox" {
  import AppBar from "react-toolbox/lib/app_bar";
  import Autocomplete from "react-toolbox/lib/autocomplete";
  import Avatar from "react-toolbox/lib/avatar";
  import { Button, IconButton } from "react-toolbox/lib/button";
  import { Card, CardTitle, CardMedia, CardText, CardActions } from "react-toolbox/lib/card";
  import Checkbox from "react-toolbox/lib/checkbox";
  import Chip from "react-toolbox/lib/chip";
  import DatePicker from "react-toolbox/lib/date_picker";
  import Dialog from "react-toolbox/lib/dialog";
  import Drawer from "react-toolbox/lib/drawer";
  import Dropdown from "react-toolbox/lib/dropdown";
  import FontIcon from "react-toolbox/lib/font_icon";
  import Input from "react-toolbox/lib/input";
  import { Layout, Panel, NavDrawer, Sidebar } from "react-toolbox/lib/layout";
  import Link from "react-toolbox/lib/link";
  import { List, ListCheckbox, ListItem, ListDivider, ListSubHeader } from "react-toolbox/lib/list";
  import { Menu, MenuDivider, MenuItem, IconMenu } from "react-toolbox/lib/menu";
  import Navigation from "react-toolbox/lib/navigation";
  import ProgressBar from "react-toolbox/lib/progress_bar";
  import { RadioButton, RadioGroup } from "react-toolbox/lib/radio";
  import Ripple from "react-toolbox/lib/ripple";
  import Slider from "react-toolbox/lib/slider";
  import Snackbar from "react-toolbox/lib/snackbar";
  import Switch from "react-toolbox/lib/switch";
  import { Tabs, Tab } from "react-toolbox/lib/tabs";
  import TimePicker from "react-toolbox/lib/time_picker";
  import Tooltip from "react-toolbox/lib/tooltip";

  export {
    AppBar,
    Autocomplete,
    Avatar,
    Button,
    IconButton,
    Card,
    CardTitle,
    CardMedia,
    CardText,
    CardActions,
    Checkbox,
    Chip,
    DatePicker,
    Dialog,
    Drawer,
    Dropdown,
    FontIcon,
    Input,
    Layout,
    Panel,
    NavDrawer,
    Sidebar,
    Link,
    List,
    ListCheckbox,
    ListItem,
    ListDivider,
    ListSubHeader,
    Menu,
    MenuDivider,
    MenuItem,
    IconMenu,
    Navigation,
    ProgressBar,
    RadioButton,
    RadioGroup,
    Ripple,
    Slider,
    Snackbar,
    Switch,
    Tabs,
    Tab,
    TimePicker,
    Tooltip
  }
}
