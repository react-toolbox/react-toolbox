import { AVATAR } from '../identifiers.js';
import { themr } from 'react-css-themr';
import { avatarFactory } from './Avatar.js';
import FontIcon from '../font_icon/FontIcon.js';
import theme from './theme.scss';

const Avatar = avatarFactory(FontIcon);
const ThemedAvatar = themr(AVATAR, theme)(Avatar);

export default ThemedAvatar;
export { ThemedAvatar as Avatar };
