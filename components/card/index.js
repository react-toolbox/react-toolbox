import { themr } from 'react-css-themr';
import { CARD } from '../identifiers';
import { Card } from './Card';
import { CardActions } from './CardActions';
import { CardMedia } from './CardMedia';
import { CardText } from './CardText';
import { cardTitleFactory } from './CardTitle';
import { Avatar } from '../avatar';
import theme from './theme.css';

const CardTitle = cardTitleFactory(Avatar);
const ThemedCard = themr(CARD, theme)(Card);
const ThemedCardActions = themr(CARD, theme)(CardActions);
const ThemedCardMedia = themr(CARD, theme)(CardMedia);
const ThemedCardText = themr(CARD, theme)(CardText);
const ThemedCardTitle = themr(CARD, theme)(CardTitle);

export default ThemedCard;
export { ThemedCard as Card };
export { ThemedCardActions as CardActions };
export { ThemedCardMedia as CardMedia };
export { ThemedCardText as CardText };
export { ThemedCardTitle as CardTitle };
