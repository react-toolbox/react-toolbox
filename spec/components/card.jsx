import React from 'react';
import Button from '../../components/button';
import {
  Card,
  CardActions,
  CardMedia,
  CardText,
  CardTitle
} from '../../components/card';
import style from '../style';

const dummyText = 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.';

const demos = [
  {
    name: 'Basic Card',
    component: (
      <Card className={style.card}>
        <CardTitle>Basic Card</CardTitle>
        <CardText>{dummyText}</CardText>
        <CardActions>
          <Button label="Action" />
          <Button label="More" />
        </CardActions>
      </Card>
    )
  }, {
    name: '16:9 Card Media',
    component: (
      <Card className={style.card}>
        <CardMedia
          aspectRatio="wide"
          image="https://placeimg.com/800/450/nature"
        />
        <CardTitle
          title="Basic Card"
          subtitle="An awesome basic card"
        />
        <CardText>{dummyText}</CardText>
      </Card>
    )
  }, {
    name: 'Avatar Card Title',
    component: (
      <Card className={style.card}>
        <CardTitle
          avatar="https://placeimg.com/80/80/animals"
          title="Avatar Card"
          subtitle="An awesome basic card"
        />
        <CardMedia
          aspectRatio="wide"
          image="https://placeimg.com/800/450/nature"
        />
        <CardActions style={{ justifyContent: 'flex-end' }}>
          <Button icon="feedback" />
          <Button icon="favorite" />
        </CardActions>
      </Card>
    )
  }
];

class CardTest extends React.Component {

  render () {
    return (
      <div>
        <h2>Cards</h2>
        <ul className={style.demoList}>
          {demos.map((demo, i) => (
            <li key={i} className={style.demoListItem}>
              <div className={style.demo}>
                {demo.component}
              </div>
              <div className={style.demoName}>
                {demo.name}
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default CardTest;
