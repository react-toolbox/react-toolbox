// Type definitions for react-toolbox 0.16.2
// Project: http://react-toolbox.com/
// Definitions by: @xogeny (Michael M. Tiller), @hsrobflavorus (Robert Parker)
/*  CHANGES
    * 04/27/2016: Updates for 0.16.2, added <Chip>, <Overlay>, and ActivableRendererFactory definitions, misc. tweaks and fixes.
    * 02/03/2016:
        * Fixed for TypeScript 1.8.0 stricter var declaration requirements (move `declare var ...` inside each individual module).
        * Removed triple-slash reference to React to fix npm install compatibility (you'll need to make sure you're referencing react.d.ts somewhere in your project!).
        * Hopefully fixed the default exports where applicable
    * 01/13/2016: Minor changes, add a few missing props, add IconButton to react-toolbox/lib/button
    * 12/21/2015: Fix "import * as Input from 'react-toolbox/lib/input'" style imports, which now correctly import only the necessary component(s).
        * NOTE that you must use "import * as {Component Name}" not just "import {Component Name}" for this to work.
    * 12/20/2015: Should be compatible with 0.14.0. Refactor modules into 'react-toolbox/lib/*' format. 
        Unfortunately importing them directly in that manner doesn't seem to work
        i.e. "import Input from 'react-toolbox/lib/input'" resolves to undefined, whereas "import { Input } from 'react-toolbox'" works fine!
        ... Any ideas welcome!
    * 12/20/2015: Add AppBar, Avatar, and refactor Card and its child Components to match the documentation.
    * 12/18/2015: Update to react-toolbox 0.13.1 (from 0.12.11)
    * 12/18/2015: Use JSDoc-style comments to provide Intellisense where supported
*/
/*
    MISSING COMPONENTS (Contributions welcome)
    * Ripple HOC
*/

declare namespace __RT {
    import React = __React;

    // Properties that all components have
    export interface Props {
        /**
         * Sets a CSS class on the component.
         */
        className?: string,
        id?: string;
        /**
         * A key used to uniquely identify the element within an Array
         */
        key?: string,
        /**
         * Inline style
         */
        style?: any,
        /**
         * Tooltip text
         * APPLIES ONLY IF THE COMPONENT IS WRAPPED WITH Tooltip.
         * @see http://react-toolbox.com/#/components/tooltip
         */
        tooltip?: string,
        /**
         * Amount of time in miliseconds spent before the tooltip is visible.
         * APPLIES ONLY IF THE COMPONENT IS WRAPPED WITH Tooltip.
         * @see http://react-toolbox.com/#/components/tooltip
         */
        tooltipDelay?: number,
        /**
         * If true, the Tooltip hides after a click in the host component.
         * APPLIES ONLY IF THE COMPONENT IS WRAPPED WITH Tooltip.
         * @default true
         * @see http://react-toolbox.com/#/components/tooltip
         */
        tooltipHideOnClick?: boolean,
    }

    /**
     * Properties of modal components (Drawer, Dialog)
     */
    export interface Modal {
        /**
         * If true, the dialog will be active.
         */
        active: boolean,
        /**
         * Callback called when the ESC key is pressed with the overlay active.
         */
        onEscKeyDown?: Function,
        /**
         * Callback to be invoked when the dialog overlay is clicked.
         */
        onOverlayClick?: Function,
        /**
         * Callback called when the mouse button is pressed on the overlay.
         */
        onOverlayMouseDown?: Function,
        /**
         * Callback called when the mouse is moving over the overlay.
         */
        onOverlayMouseMove?: Function,
        /**
         * Callback called when the mouse button is released over the overlay.
         */
        onOverlayMouseUp?: Function,
    }

    // Interface for components with icons
    export interface Iconic {
        /**
         * Value of the icon (See icon component).
         */
        icon?: string | __React.ReactElement<any> | __React.ReactHTMLElement<any>,
    }

    export interface Conditional {
        /**
         * If true, component will be disabled
         * @default false
         */
        disabled?: boolean
    }

    /**
     * Properties of components that have values that can be changed (T is the type of the value)
     */
    export interface Changeable<T> {
        /**
         * Callback called when the picker value is changed.
         * @param v Type of the value
         */
        onChange?: (v: T) => void
    }

    /**
     * Properties of components that can be clicked
     */
    export interface Clickable {
        /**
         *  Callback called when the button is clicked.
         */
        onClick?: Function
    }

    export interface Option<T> {
        label: string,
        value: T,
    }

    ////////////////////////////////
    /// Component definitions
    ////////////////////////////////
    export interface AppBarProps extends Props {
        /**
         * If true, the AppBar shows a shadow.
         * @default false
         */
        flat?: boolean,
        /**
         * Determine if the bar should have position fixed (true) or relative (false)
         * @default false
         */
        fixed?: boolean,
    }
    /**
     * The app bar is a special kind of toolbar that’s used for branding, navigation, search, and actions. 
     * Usually it contains controls on the right and left side and a title with the current section or app name. 
     * You should give the content with children elements.
     */
    class AppBar extends React.Component<AppBarProps, {}> {
        render(): React.DOMElement<any, any>;
    }
    export interface AvatarProps extends Props, Iconic {
        children?: any,
        image?: string | __React.ReactElement<any> | __React.ReactHTMLElement<any> | __React.ClassicComponent<any, any>,
        title?: string | boolean,
    }
    /**
     * Avatars can be used to represent people. 
     * For personal avatars, offer personalization options. 
     * As users may choose not to personalize an avatar, provide delightful defaults. 
     * When used with a specific logo, avatars can also be used to represent brand.
     */
    class Avatar extends React.Component<AvatarProps, {}> {
        render(): React.DOMElement<any, any>;
    }
    interface AutocompleteProps extends Props, Conditional, Changeable<string | Array<any>> {
        /**
         * Sets the error string for the internal input element.
         */
        error?: string,
        /**
         * The text string to use for the floating label element.
         */
        label?: string,
        /**
         * If true, component can hold multiple values.
         * @default true
         */
        multiple?: boolean,
        /**
         * 	Object of key/values or array representing all items suggested.
         */
        source: Object | Array<any>,
        /**
         * If true, the list of suggestions will not be filtered when a value is selected, until the query is modified.
         * @default false
         */
        showSuggestionsWhenValueIsSet?: boolean,
        /**
         * Type of the input element. It can be a valid HTML5 input type
         * @default text
         */
        type?: string,
        /**
         * 	Value or array of values currently selected component.Current value of the input element.
         */
        value?: string | Array<any>,
    }
    /**
     * An input field with a set of predeterminated labeled values. When it's focused it shows a list of hints that are filtered by label as the user types. 
     * They can be simple or multiple depending on the amount of values that can be selected. 
     * The opening direction is determined at opening time depending on the current position.
     */
    class Autocomplete extends React.Component<AutocompleteProps, {}> {
        render(): React.DOMElement<any, any>;
    }
    interface ButtonProps extends Props, Clickable, Conditional, Iconic {
        /**
         * Indicates if the button should have accent color.
         * @default false
         */
        accent?: boolean,
        /**
         * If true, the button will have a flat look.
         * @default false
         */
        flat?: boolean,
        /**
         * If true, the button will have a floating look.
         * @default false
         */
        floating?: boolean,
        /**
         * If specified, the button will be rendered as an <a>
         */
        href?: string,
        /**
         * The text string to use for the name of the button.
         */
        label?: string,
        /**
         * If true, component will be disabled and show a loading animation.
         * @default false
         */
        loading?: boolean,
        /**
         * To be used with floating button. If true the button will be smaller. 
         * @default false
         */
        mini?: boolean,
        /**
         * Indicates if the button should have primary color.
         * @default false
         */
        primary?: boolean,
        /**
         * If true, the button will have a raised look.
         * @default false
         */
        raised?: boolean,
        /**
         * If true, component will have a ripple effect on click.
         * @default true
         */
        ripple?: boolean,
    }
    /**
     * A button clearly communicates what action will occur when the user touches it. 
     * It consists of text, an image, or both, designed in accordance with your app’s color theme.
     */
    class Button extends React.Component<ButtonProps, {}> {
        render(): React.DOMElement<any, any>;
    }
    class IconButton extends React.Component<ButtonProps, {}> {
        render(): React.DOMElement<any, any>;
    }
    interface CardProps extends Props, Clickable {
        /**
         * Child components, usually Card subcomponents.
         */
        children?: any,
        /**
         * Increases the shadow depth to appear elevated.
         */
        raised?: boolean,
        /**
         * Array of objects describing actions. These actions will be rendered as buttons and the object fields will be transferred to those.
         * @default []
         */
        actions?: Array<ButtonProps>,
        /**
         * Sets HEX or RGBA color to add a colored layer to the heading.
         */
        color?: string,
        /**
         * URL to set as a background image in the heading.
         */
        image?: string,
        
        /**
         * Type of the component to display general modifications. It can be 'wide' for a larger card, 'image' if it's an image card or 'event' which shows just a title on top.
         */
        type?: string,
    }
    /**
     * A Card is a piece of paper with unique related data that serves as an entry point to more detailed information. 
     * For example, a card could contain a photo, text, and a link about a single subject.
     * Cards are composed of multiple subcomponents in React Toolbox. 
     * You can combine each of the subcomponents to create all different Material Design Cards given in the spec.
     */
    export class Card extends React.Component<CardProps, {}> {
        render(): React.DOMElement<any, any>;
    }
    export interface CardTitleProps extends Props {
        avatar?: string | __React.ReactElement<any> | __React.ReactHTMLElement<any> | __React.ClassicComponent<any, any>,
        /**
         * Children to pass through the component.
         */
        children?: any,
        /**
         * Sets a complementary smaller text under the title.
         */
        subtitle?: string,
        /**
         * Sets the title of the card.
         */
        title?: string | boolean,
    }
    /**
     * A versatile title block that can be used in various places on the card, including the media area. 
     * This component can also display an avatar next to the title content.
     */
    export class CardTitle extends React.Component<CardTitleProps, {}> {
        render(): React.DOMElement<any, any>;
    }
    export interface CardMediaProps extends Props {
        /**
         * Forces a ('wide' 16:9) or ('square' 1:1) aspect ratio respectively. 
         * Unset, the media area will have a flexible height.
         * @default ''
         */
        aspectRatio?: string,
        /**
         * Usually an image/video element or a <CardTitle> component.
         */
        children?: any,
        /**
         * Sets the background color
         */
        color?: string,
        /**
         * Creates a dark overlay underneath the child components.
         */
        contentOverlay?: boolean,
        /**
         * Can be used instead of children. Accepts an element or a URL string.
         */
        image?: string | __React.ReactElement<any> | __React.ReactHTMLElement<any> | __React.ClassicComponent<any, any>,
    }
    /**
     * Used for displaying media such as images or videos on a card. 
     * Can also be used with a solid background color instead of an image.
     */
    export class CardMedia extends React.Component<CardMediaProps, {}> {
        render(): React.DOMElement<any, any>;
    }
    export interface CardTextProps extends Props {
        /**
         * Children to pass through the component.
         */
        children?: any,
    }
    /**
     * Basic card content container. 
     * Good for small descriptions or other supplementary text.
     */
    export class CardText extends React.Component<CardTextProps, {}> {
        render(): React.DOMElement<any, any>;
    }
    export interface CardActionsProps extends Props {
        /**
         * Children to pass through the component.
         */
        children?: any,
    }
    /**
     * This component is used as a container for supplemental card actions. 
     * Supplemental actions within the card are explicitly called out using icons, text, and UI controls, typically placed at the bottom of the card.
     */
    export class CardActions extends React.Component<CardActionsProps, {}> {
        render(): React.DOMElement<any, any>;
    }
    export interface CheckboxProps extends Props, Changeable<boolean>, Conditional {
        /**
         * Value for the checkbox, can be true or false.
         * @default false
         */
        checked?: boolean,
        /**
         * Text label to attach next to the checkbox element.
         */
        label?: string,
        /**
         * The name of the field to set in the input checkbox.
         */
        name?: string,
        /**
         * Callback called when the checkbox is blurred.
         */
        onBlur?: Function,
        /**
         * Callback called when the checkbox is focused
         */
        onFocus?: Function,
    }
    export class Checkbox extends React.Component<CheckboxProps, {}> {
        render(): React.DOMElement<any, any>;
    }

    export interface ChipProps extends Props {
        /**
         * 	Child components, usually Avatar and inline elements
         */
        children?: React.ReactNode;
        /**
         * If true, the chip will be rendered with a delete icon.
         */
        deletable?: boolean;
        /**
         * Callback to be invoked when the delete icon is clicked.
         */
        onDeleteClick?: React.MouseEventHandler
    }
    /**
     * Avatars can be used to represent people. 
     * For personal avatars, offer personalization options. 
     * As users may choose not to personalize an avatar, provide delightful defaults. 
     * When used with a specific logo, avatars can also be used to represent brand.
     */
    class Chip extends React.Component<ChipProps, {}> {
        render(): React.ReactElement<any>;
    }
    export interface DatePickerProps extends Props, Changeable<Date> {
        /**
         * Date object with the maximum selectable date.
         */
        maxDate?: Date,
        /**
         * Date object with the minimum selectable date.
         */
        minDate?: Date,
        /**
         * The text string to use like a input placeholder.
         */
        placeholder?: string,
        /**
         * Date object with the currently selected date.
         */
        value?: Date,
    }
    export class DatePicker extends React.Component<DatePickerProps, {}> {
        render(): React.DOMElement<any, any>;
    }
    export interface DialogProps extends Props, Modal {
        /**
         * An array of objects representing the buttons for the dialog navigation area. The properties will be transferred to the buttons.
         * @default []
         */
        actions?: Array<ButtonProps>,
        /**
         * The text string to use as standar title of the dialog.
         */
        title?: string | boolean,
        /**
         * Used to determine the size of the dialog. It can be small, normal or large.
         * @default normal
         */
        type?: string,
    }
    export class Dialog extends React.Component<DialogProps, {}> {
        render(): React.DOMElement<any, any>;
    }
    export interface DrawerProps extends Props, Modal {
        /**
         * Type of drawer. It can be 'left' or 'right' to display the drawer on the left or right side of the screen.
         * @default left
         */
        type?: string
    }
    export class Drawer extends React.Component<DrawerProps, {}> {
        render(): React.DOMElement<any, any>;
    }

    export interface DropdownProps extends Props, Changeable<any>, Conditional {
        /**
         * If true, the dropdown will open up or down depending on the position in the screen.
         */
        auto?: boolean,
        /**
         * The text string to use for the floating label element.
         */
        label?: string,
        /**
         * Array of data objects with the data to represent in the dropdown.
         */
        source: Array<Option<any>>,
        /**
         * Callback function that returns a JSX template to represent the element.
         */
        template?: Function,
        /**
         * Default value using JSON data.
         */
        value: string,
    }
    class Dropdown extends React.Component<DropdownProps, {}> {
        render(): React.DOMElement<any, any>;
    }

    interface FontIconProps extends Props {
        value: string
    }
    class FontIcon extends React.Component<FontIconProps, {}> {
        render(): React.DOMElement<any, any>;
    }

    interface InputProps extends Props, Conditional, Changeable<string>, Iconic {
        /**
         * Give an error string to display under the field.
         */
        error?: string,
        /**
         * Indicates if the label is floating in the input field or not.
         * @default true
         */
        floating?: boolean,
        /**
         * The text string to use for the floating label element.
         */
        label?: string,
        /**
         * Specifies the maximum number of characters allowed in the component.
         */
        maxLength?: number,
        /**
         * If true, a textarea element will be rendered. The textarea also grows and shrinks according to the number of lines.
         * @default false
         */
        multiline?: boolean,
        /**
         * Callback function that is fired when components is blurred.
         */
        onBlur?: Function,
        /**
         * Callback function that is fired when components is focused.
         */
        onFocus?: Function,
        /**
         * Callback function that is fired when a key is pressed down.
         */
        onKeyDown?: Function,
        /**
         * Callback function that is fired when a key is pressed.
         */
        onKeyPress?: Function,
        /**
         * Callback function that is fired when a key is released.
         */
        onKeyUp?: Function,
        /**
         * If true, the html input has a required value.
         * @default false
         */
        required?: boolean,
        /**
         * Type of the input element. It can be a valid HTML5 input type
         * @default text
         */
        type?: string,
        /**
         * Current value of the input element.
         */
        value?: string,
    }
    class Input extends React.Component<InputProps, {}> {
        render(): React.DOMElement<any, any>;
    }

    interface LinkProps extends React.Props<Link>, Iconic {
        href: string,
        /**
         * The text string used for the text content of the link.
         */
        label: string,
        /**
         * Sets a count number useful to display in the page how many times was visited for example.
         */
        count?: number,
    }
    class Link extends React.Component<LinkProps, {}> {
        render(): React.DOMElement<any, any>;
    }

    interface ListProps extends Props {
        /**
         * If true, each element in the list will have a ripple effect on click
         * @default false
         */
        ripple?: boolean,
        /**
         * If true, the elements in the list will display a hover effect and a pointer cursor.
         * @default false
         */
        selectable?: boolean,
    }
    class List extends React.Component<ListProps, {}> {
        render(): React.DOMElement<any, any>;
    }
    interface ListItemProps extends Props, Conditional, Clickable {
        /**
         * A string URL to specify an avatar in the left side of the item.
         */
        avatar?: string,
        /**
         * Main text of the item. Required.
         */
        caption?: string,
        /**
         * An element that will be displayed as the item. If set, this will override `caption` and `legend`.
         */
        itemContent?: React.ReactElement<any>,
        /**
         * 	A list of elements that are placed on the left side of the item and after the avatar attribute.
         */
        leftActions?: React.ReactElement<any>[],
        /**
         * A string key of a font icon to display an icon in the left side of the item.
         */
        leftIcon?: string,
        /**
         * Secondary text to display under the caption.
         */
        legend?: string,
        /**
         * 	A list of elements that are placed on the right side of the item and after the rightIcon attribute.
         */
        rightActions?: React.ReactElement<any>[],
        /**
         * The same as the leftIcon but in this case the icon is displayed in the right side.
         */
        rightIcon?: string,
        /**
         * If true, the item displays a ripple effect on click. By default it's inherited from the parent element.
         * @default false
         */
        ripple?: boolean,
        /**
         * If true, the elements in the list will display a hover effect and a pointer cursor. Inherited from the parent
         * @default false
         */
        selectable?: boolean,
        /**
         * In case you want to provide the item as a link, you can pass this property to specify the href.
         */
        to?: string;
    }
    class ListItem extends React.Component<ListItemProps, {}> {
        render(): React.DOMElement<any, any>;
    }
    interface ListCheckboxProps extends Props, Conditional, Changeable<boolean> {
        /**
         * Main text of the item. Required.
         */
        caption?: string,
        /**
         * If true the checkbox appears checked by default.
         * @default false
         */
        checked: boolean,
        /**
         * Secondary text to display under the caption.
         */
        legend?: string,
        /**
         * Name for the checkbox input item.
         */
        name?: string,
        /**
         * Callback called when the input element is blurred.
         */
        onBlur?: Function,
        /**
         * Callback called when the input element is focused.
         */
        onFocus?: Function,
    }
    class ListCheckbox extends React.Component<ListCheckboxProps, {}> {
        render(): React.DOMElement<any, any>;
    }
    export interface ListSubHeaderProps extends Props {
        /**
         * List header caption.
         */
        caption: string;
    }
    class ListSubHeader extends React.Component<ListSubHeaderProps, {}> {
        render(): React.DOMElement<any, any>;
    }
    interface ListDividerProps extends Props {
        /**
         * Indicates if the divider should be full width or should leave a space on the left side.
         */
        inset: boolean;
    }
    class ListDivider extends React.Component<ListDividerProps, {}> {
        render(): React.DOMElement<any, any>;
    }
    interface MenuProps extends Props {
        /**
         * If true, the menu will be displayed as opened by default.
         * @default false
         */
        active?: boolean,
        /**
         * Callback that will be called when the menu is being hidden.
         */
        onHide?: Function,
        /**
         * Callback that will be called when the menu is being shown.
         */
        onShow?: Function,
        /**
         * If true the menu wrapper will show an outline with a soft shadow.
         * @default true
         */
        outline?: boolean,
        /**
         * Determine the position of the menu. 
         * With static value the menu will be always shown, auto means that the it will decide the opening direction based on the current position. 
         * To force a position use top-left, top-right, bottom-left, bottom-right.
         * @default static
         */
        position?: string,
        /**
         * If true, the menu items will show a ripple effect on click.
         */
        ripple?: boolean,
        /**
         * If true, the menu will keep a value to highlight the active child item.
         */
        selectable?: boolean,
        /**
         *  Used for selectable menus and indicates the initial value so the child item with this value can be highlighted.
         */
        value?: boolean,
    }
    class Menu extends React.Component<MenuProps, {}> {
        render(): React.DOMElement<any, any>;
    }
    interface IconMenuProps extends Props, Iconic {
        /**
         * If true, the icon will show a ripple when is clicked.
         */
        iconRipple?: boolean,
        /**
         * Transferred to the Menu component.
         * @default true
         */
        menuRipple?: boolean,
        /**
         * Callback that will be called when the icon is clicked.
         */
        onClick?: Function,
        /**
         * Callback that will be called when the menu is being hidden.
         */
        onHide?: Function, 
        /**
         * Callback that will be called when the menu is being shown.
         */
        onShow?: Function,
        /**
         * Callback that will be called when a menu item is selected.
         */
        onSelect?: Function,
        /**
         * Determine the position of the menu. This property is transferred to the inner Menu component.
         * @default auto
         */
        position?: string,
        /**
         * If true, the menu will keep a value to highlight the active child item. Transferred to the Menu
         */
        selectable?: boolean,
    }
    class IconMenu extends React.Component<IconMenuProps, {}> {
        render(): React.DOMElement<any, any>;
    }
    interface MenuItemProps extends Props, Conditional, Iconic {
        /**
         * The text to include in the menu item.
         */
        caption?: string,
        /**
         * If true, the item will show a ripple effect when it's clicked. Inherited from the parent.
         */
        ripple?: boolean,
        /**
         * Transferred from the Menu component for selectable menus. Indicates if it's the current active option.
         */
        selected?: boolean,
    }
    class MenuItem extends React.Component<MenuItemProps, {}> {
        render(): React.DOMElement<any, any>;
    }
    class MenuDivider extends React.Component<any, {}> {
        render(): React.DOMElement<any, any>;
    }
    interface NavigationProps extends Props {
        /**
         * Array of objects that represent buttons so the keys will be transferred as properties to those.
         */
        actions?: Array<ButtonProps>,
        /**
         * Array of objects similar to actions but that will be rendered as <Link/> component definition.
         */
        routes?: Array<LinkProps>,
        /**
         * Type of the navigation, it can be 'vertical' or 'horizontal'.
         */
        type?: string,
    }
    class Navigation extends React.Component<NavigationProps, {}> {
        render(): React.DOMElement<any, any>;
    }

    interface OverlayProps extends Props {
        active?: boolean;
        children?: any;
        /**
         * Sets a CSS class on the component.
         */
        className?: string;
        invisible?: boolean;
        onClick?: Function;
        onEscKeyDown?: Function
    }
    class Overlay extends React.Component<OverlayProps, {}> {
        render(): React.DOMElement<any, any>;
    }

    interface ProgressBarProps extends Props {
        /**
         * Value of a secondary progress bar useful for buffering.
         */
        buffer?: number,
        /**
         * Maximum value permitted.
         */
        max?: number, // 
        /**
         * minimum value permitted.
         */
        min?: number, // 
        /**
         * Mode of the progress bar, it can be determinate or indeterminate.
         */
        mode?: string, // 
        /**
         * If true, the circular progress bar will be changing its color.
         */
        multicolor?: boolean, // 
        /**
         * Type of the progress bar, it can be circular or linear.
         * @default linear
         */
        type?: string,
        /**
         * Value of the current progress.
         */
        value?: number,
    }
    class ProgressBar extends React.Component<ProgressBarProps, {}> {
        render(): React.DOMElement<any, any>;
    }
    interface RadioGroupProps extends Props, Conditional, Changeable<any> {
        /**
         * Name for the input element group.
         */
        name?: string,
        /**
         * Default value selected in the radio group.
         */
        value?: any,
    }
    class RadioGroup extends React.Component<RadioGroupProps, {}> {
        render(): React.DOMElement<any, any>;
    }
    interface RadioButtonProps extends Props, Conditional {
        /**
         * If true, the input element will be selected by default. Transferred from the parent.
         */
        checked: boolean,
        /**
         * Name for the input element.
         */
        name?: string,
        /**
         * Callback function that will be invoked when the input is blurred.
         */
        onBlur?: Function,
        /**
         * Callback function that will be invoked when the value changes.
         */
        onChange?: Function,
        /**
         * Callback function that will be invoked when the input is focused.
         */
        onFocus?: Function,
        /**
         * Value for the radio button.
         */
        value: any,
    }
    class RadioButton extends React.Component<RadioButtonProps, {}> {
        render(): React.DOMElement<any, any>;
    }
    interface SliderProps extends Props {
        /**
         * If true, an input is shown and the user can set the slider from keyboard value.
         */
        editable?: boolean,
        /**
         * Maximum value permitted.
         */
        max?: number,
        /**
         * Minimum value permitted.
         */
        min?: number,
        /**
         * Callback function that will be invoked when the slider value changes.
         */
        onChange?: Function,
        /**
         * If true, a pin with numeric value label is shown when the slider thumb is pressed. Use for settings for which users need to know the exact value of the setting.
         */
        pinned?: boolean,
        /**
         * If true, the slider thumb snaps to tick marks evenly spaced based on the step property value.
         */
        snaps?: boolean,
        /**
         * Amount to vary the value when the knob is moved or increase/decrease is called.
         */
        step?: number,
        /**
         * Current value of the slider.
         */
        value: number,
    }
    class Slider extends React.Component<SliderProps, {}> {
        render(): React.DOMElement<any, any>;
    }
    interface SnackbarProps extends Props, Modal, Iconic {
        /**
         * For the action component inside the Snackbar.
         */
        action?: string,
        /**
         * Text to display in the content.
         */
        label?: string,
        /**
         * Callback function that will be called when the button action is clicked.
         */
        onClick?: Function,
        /**
         * Callback function when finish the set timeout.
         */
        onTimeout?: Function, 
        /**
         * amount of time after the Snackbar will be automatically hidden.
         */
        timeout?: number,
        /**
         * Indicates the action type. Can be 'accept', 'warning' or 'cancel'
         */
        type?: string,
    }
    class Snackbar extends React.Component<SnackbarProps, {}> {
        render(): React.DOMElement<any, any>;
    }
    interface SwitchProps extends Props, Conditional {
        /**
         * If true, the switch will be enabled.
         */
        checked: boolean,
        /**
         * If true, component will be disabled.
         */
        disabled?: boolean,
        /**
         * The text string to use for the floating label element.
         */
        label?: string,
        /**
         * The text string used as name of the input.
         */
        name?: string,
        /**
         * Callback function that is fired when when the switch is blurred.
         */
        onBlur?: Function,
        /**
         * Callback function that is fired when the components's value changes.
         */
        onChange?: Function,
        /**
         * Callback function fire when the switch is focused.
         */
        onFocus?: Function,
    }
    class Switch extends React.Component<SwitchProps, {}> {
        render(): React.DOMElement<any, any>;
    }
    interface TableProps extends Props {
        /**
         * If true, component will show a heading using model field names.
         */
        heading?: boolean,
        /**
         * Object describing the data model that represents each object in the source.
         */
        model?: { [key: string]: string },
        /**
         * Callback function that is fired when an item in a row changes. If set, rows are editable.
         */
        onChange?: Function,
        /**
         * Callback function invoked when the row selection changes.
         */
        onSelect?: Function,
        /**
         * Array of indexes of the items in the source that should appear as selected.
         */
        selected?: Array<number>,
        /**
         * Array of objects representing each item to show.
         */
        source?: Array<{ [key: string]: any }>,
    }
    class Table extends React.Component<TableProps, {}> {
        render(): React.DOMElement<any, any>;
    }
    interface TabsProps extends Props, Changeable<number> {
        /**
         * Current
         */
        index: number,
    }
    class Tabs extends React.Component<TabsProps, {}> {
        render(): React.DOMElement<any, any>;
    }
    interface TabProps extends Props, Conditional {
        /**
         * If true, the current component is visible.
         * @default false
         */
        active?: boolean,
        /**
         * If true, the current component is not visible.
         * @default false
         */
        hidden?: boolean,
        /**
         * Label text for navigation header
         */
        label?: string,
        /**
         * Callback function that is fired when the tab is activated.
         */
        onActive?: Function,
    }
    class Tab extends React.Component<TabProps, {}> {
        render(): React.DOMElement<any, any>;
    }
    interface TimePickerProps extends Props, Changeable<Date> {
        /**
         * Format to display the clock. It can be 24hr or ampm.
         * @default 24hr
         */
        format?: string,
        /**
         * Datetime object with currrently selected time
         */
        value?: Date,
    }
    class TimePicker extends React.Component<TimePickerProps, {}> {
        render(): React.DOMElement<any, any>;
    }

    //#region HOC
    interface ActivableRendererOptions {
        /**
         * @default 500
         */
        delay?: number;
    }
    interface ActivableRendererProps {
        active: boolean;
        children?: any;
        delay?: number
    }
    function ActivableRendererFactory<P>(options?: ActivableRendererOptions): (componentClass: React.ComponentClass<P>) => React.ComponentClass<P & ActivableRendererProps>

    class TooltipComponent<P, S> extends React.Component<P, S> {
        getDecoratedComponentInstance(): React.Component<P, S>;
    }

    interface TooltipComponentClass<P> extends React.ComponentClass<P> {
        new (props?: P, context?: any): TooltipComponent<P, any>;
    }

    function Tooltip<P>(componentClass: React.ComponentClass<P>): TooltipComponentClass<P>;
    //#endregion
}

declare var ActivableRendererFactory: typeof __RT.ActivableRendererFactory;
declare module 'react-toolbox/lib/hoc/ActivableRenderer' {
    export default ActivableRendererFactory;
}

declare var AppBar: typeof __RT.AppBar;
declare module 'react-toolbox/lib/app_bar' {
    export default AppBar;
}
declare var Autocomplete: typeof __RT.Autocomplete;
declare module 'react-toolbox/lib/autocomplete' {
    export default Autocomplete;
}
declare var Avatar: typeof __RT.Avatar;
declare module 'react-toolbox/lib/avatar' {
    export default Avatar;
}

declare module 'react-toolbox/lib/button' {
    var Button: typeof __RT.Button;
    var IconButton: typeof __RT.IconButton;
    export { Button, IconButton };
}

declare module 'react-toolbox/lib/card' {
    var Card: typeof __RT.Card;
    var CardActions: typeof __RT.CardActions;
    var CardMedia: typeof __RT.CardMedia;
    var CardText: typeof __RT.CardText;
    var CardTitle: typeof __RT.CardTitle;

    export {
    Card,
    CardActions,
    CardMedia,
    CardText,
    CardTitle
    }
}
declare var Checkbox: typeof __RT.Checkbox;
declare module 'react-toolbox/lib/checkbox' {
    export default Checkbox;
}
declare var Chip: typeof __RT.Chip;
declare module 'react-toolbox/lib/chip' {
    export default Chip;
}
declare var DatePicker: typeof __RT.DatePicker;
declare module 'react-toolbox/lib/date_picker' {
    export default DatePicker;
}
declare var Dialog: typeof __RT.Dialog;
declare module 'react-toolbox/lib/dialog' {
    export default Dialog;
}
declare var Drawer: typeof __RT.Drawer;
declare module 'react-toolbox/lib/drawer' {
    export default Drawer;
}
declare var Dropdown: typeof __RT.Dropdown;
declare module 'react-toolbox/lib/dropdown' {
    export default Dropdown;
}
declare var FontIcon: typeof __RT.FontIcon;
declare module 'react-toolbox/lib/font_icon' {
    export default FontIcon;
}
declare var Input: typeof __RT.Input;
declare module 'react-toolbox/lib/input' {
    export default Input;
}
declare var Link: typeof __RT.Link;
declare module 'react-toolbox/lib/link' {
    export default Link;
}

declare module 'react-toolbox/lib/list' {
    var List: typeof __RT.List;
    var ListItem: typeof __RT.ListItem;
    var ListCheckbox: typeof __RT.ListCheckbox;
    var ListSubHeader: typeof __RT.ListSubHeader;
    var ListDivider: typeof __RT.ListDivider;
    export {
    List,
    ListItem,
    ListCheckbox,
    ListSubHeader,
    ListDivider
    }
}

declare module 'react-toolbox/lib/menu' {
    var Menu: typeof __RT.Menu;
    var IconMenu: typeof __RT.IconMenu;
    var MenuItem: typeof __RT.MenuItem;
    var MenuDivider: typeof __RT.MenuDivider;
    export {
    Menu,
    IconMenu,
    MenuItem,
    MenuDivider
    }
}
declare var Navigation: typeof __RT.Navigation;
declare module 'react-toolbox/lib/navigation' {
    export default Navigation;
}
declare var Overlay: typeof __RT.Overlay;
declare module 'react-toolbox/lib/overlay' {
    export default Overlay;
}
declare var ProgressBar: typeof __RT.ProgressBar;
declare module 'react-toolbox/lib/progress_bar' {
    export default ProgressBar;
}

declare module 'react-toolbox/lib/radio' {
    var RadioGroup: typeof __RT.RadioGroup;
    var RadioButton: typeof __RT.RadioButton;
    export {
    RadioGroup,
    RadioButton
    }
}
declare var Slider: typeof __RT.Slider;
declare module 'react-toolbox/lib/slider' {
    export default Slider;
}
declare var Snackbar: typeof __RT.Snackbar;
declare module 'react-toolbox/lib/snackbar' {
    export default Snackbar;
}
declare var Switch: typeof __RT.Switch;
declare module 'react-toolbox/lib/switch' {
    export default Switch;
}
declare var Table: typeof __RT.Table;
declare module 'react-toolbox/lib/table' {
    export default Table;
}

declare module 'react-toolbox/lib/tabs' {
    var Tab: typeof __RT.Tab;
    var Tabs: typeof __RT.Tabs;
    export { Tab, Tabs }
}
declare var TimePicker: typeof __RT.TimePicker;
declare module 'react-toolbox/lib/time_picker' {
    export default TimePicker;
}
declare var Tooltip: typeof __RT.Tooltip;
declare module 'react-toolbox/lib/tooltip' {
    export default Tooltip;
}
declare module 'react-toolbox' {
    import ActivableRendererFactory from 'react-toolbox/lib/hoc/ActivableRenderer';
    import AppBar from 'react-toolbox/lib/app_bar';
    import Autocomplete from 'react-toolbox/lib/autocomplete';
    import Avatar from 'react-toolbox/lib/avatar';
    import { Button }from 'react-toolbox/lib/button';
    import { Card, CardActions, CardMedia, CardText, CardTitle} from 'react-toolbox/lib/card';
    import Checkbox from 'react-toolbox/lib/checkbox';
    import DatePicker from 'react-toolbox/lib/date_picker';
    import Dialog from 'react-toolbox/lib/dialog';
    import Drawer from 'react-toolbox/lib/drawer';
    import Dropdown from 'react-toolbox/lib/dropdown';
    import FontIcon from 'react-toolbox/lib/font_icon';
    import Input from 'react-toolbox/lib/input';
    import Link from 'react-toolbox/lib/link';
    import {List, ListItem, ListCheckbox, ListSubHeader, ListDivider} from 'react-toolbox/lib/list';
    import {Menu, IconMenu, MenuItem, MenuDivider} from 'react-toolbox/lib/menu';
    import Navigation from 'react-toolbox/lib/navigation';
    import Overlay from 'react-toolbox/lib/overlay';
    import ProgressBar from 'react-toolbox/lib/progress_bar';
    import {RadioGroup, RadioButton} from 'react-toolbox/lib/radio';
    import Slider from 'react-toolbox/lib/slider';
    import Snackbar from 'react-toolbox/lib/snackbar';
    import Switch from 'react-toolbox/lib/switch';
    import { Tab, Tabs } from 'react-toolbox/lib/tabs';
    import TimePicker from 'react-toolbox/lib/time_picker';
    import Tooltip from 'react-toolbox/lib/tooltip';

    export {
    ActivableRendererFactory,
    AppBar,
    Autocomplete,
    Avatar,
    Button,
    Card, CardActions, CardMedia, CardText, CardTitle,
    Checkbox,
    DatePicker,
    Dialog,
    Drawer,
    Dropdown,
    FontIcon,
    Input,
    Link,
    List, ListItem, ListCheckbox, ListSubHeader, ListDivider,
    Menu, IconMenu, MenuItem, MenuDivider,
    Navigation,
    Overlay,
    ProgressBar,
    RadioGroup, RadioButton,
    Slider,
    Snackbar,
    Switch,
    Tab, Tabs,
    TimePicker,
    Tooltip
    }
}