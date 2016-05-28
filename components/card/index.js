import { themr } from 'react-css-themr';
import { CARD } from '../identifiers.js';
import { Card } from './Card.js';
import { CardActions } from './CardActions.js';
import { CardMedia } from './CardMedia.js';
import { CardText } from './CardText.js';
import { cardTitleFactory } from './CardTitle.js';
import Avatar from '../avatar';
import theme from './theme.scss';

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
