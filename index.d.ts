// Type definitions for react-toolbox 0.16.2
// Project: http://react-toolbox.com/
// Definitions by: @xogeny (Michael M. Tiller), @hsrobflavorus (Robert Parker)
/*  CHANGES
	* 06/05/2016: Refactor into external module declarations (no more 'declare module ...')
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