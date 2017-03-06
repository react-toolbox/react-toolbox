import { themr } from 'react-css-themr';
import { AVATAR } from '../identifiers';
import { avatarFactory } from './Avatar';
import { FontIcon } from '../font_icon/FontIcon';
import theme from './theme.css';

const Avatar = avatarFactory(FontIcon);
const ThemedAvatar = themr(AVATAR, theme)(Avatar);

export default ThemedAvatar;
export { ThemedAvatar as Avatar };
