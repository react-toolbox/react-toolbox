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

const Spacer = () => {
  return (
    <div style={{
      display: 'flex',
      flex: '1 1 auto'
    }}/>
  );
};

const DemoList = (props) => <ul className={style.demoList}>{props.children}</ul>;

const DemoListItem = (props) => (
  <li className={style.demoListItem}>
    <div className={style.demo}>
      {props.component}
    </div>
    <div className={style.demoName}>
      {props.name}
    </div>
  </li>
);

const basic = [
  {
    name: 'Basic Card',
    component: (
      <Card className={style.card}>
        <CardTitle
          title="Title goes here"
          subtitle="Subtitle here"
        />
        <CardText>{dummyText}</CardText>
        <CardActions>
          <Button label="Action 1" />
          <Button label="Action 2" />
        </CardActions>
      </Card>
    )
  }, {
    name: 'Raised Card',
    component: (
      <Card raised className={style.card}>
        <CardTitle
          title="Title goes here"
          subtitle="Subtitle here"
        />
        <CardText>{dummyText}</CardText>
        <CardActions>
          <Button label="Action 1" />
          <Button label="Action 2" />
        </CardActions>
      </Card>
    )
  }
];

const media = [
  {
    name: '16:9 Card Media Area',
    component: (
      <Card className={style.card}>
        <CardMedia
          aspectRatio="wide"
          className={style.primary}
        >
          <CardTitle>Basic Card</CardTitle>
        </CardMedia>
        <CardTitle subtitle="You can also use a subtitle like this" />
        <CardText>{dummyText}</CardText>
      </Card>
    )
  }, {
    name: '16:9 Card Media Image',
    component: (
      <Card className={style.card}>
        <CardMedia
          aspectRatio="wide"
          image="https://placeimg.com/800/450/nature"
        />
          <CardTitle
            title="Title goes here"
            subtitle="Subtitle here"
          />
        <CardText>{dummyText}</CardText>
      </Card>
    )
  }, {
    name: 'Square Media Card',
    component: (
      <Card className={style.card}>
        <CardMedia
          contentOverlay
          aspectRatio="square"
          image="https://placeimg.com/700/700/nature"
        >
          <CardTitle
            title="Title goes here"
            subtitle="Subtitle here"
          />
          <CardActions>
            <Button inverse label="Action 1" />
            <Button inverse label="Action 2" />
          </CardActions>
        </CardMedia>
      </Card>
    )
  }
];

const avatar = [
  {
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
          <Button toggle icon="share" />
          <Button toggle icon="favorite" />
        </CardActions>
      </Card>
    )
  }, {
    name: 'Video in a card',
    component: (
      <Card className={style.card}>
        <CardTitle
          avatar="https://placeimg.com/80/80/animals"
          title="Avatar Card"
          subtitle="An awesome basic card"
        />
        <CardMedia
          aspectRatio="wide"
        >
          <iframe width="1280" height="720" src="https://www.youtube.com/embed/sGbxmsDFVnE?rel=0&amp;showinfo=0" frameBorder="0" allowFullScreen></iframe>
        </CardMedia>
        <CardActions style={{ justifyContent: 'flex-end' }}>
          <Button toggle icon="report-problem" />
          <Spacer/>
          <Button toggle icon="share" />
          <Button toggle icon="favorite" />
        </CardActions>
      </Card>
    )
  }
];

const small = [
  {
    name: 'Small Media Card',
    component: (
      <Card>
        <CardMedia
          aspectRatio="square"
          image="https://placeimg.com/400/400/nature"
        >
          <CardTitle>Test</CardTitle>
        </CardMedia>
        <CardActions style={{justifyContent: 'center'}}>
          <Button toggle icon="thumb-down" />
          <Button toggle icon="thumb-up" />
          <Button toggle icon="turned-in-not" />
        </CardActions>
      </Card>
    )
  }, {
    name: 'Alternative Layout Example',
    component: (
      <Card className={style.card}>
        <div className={style.cardRow}>
          <CardTitle
            title="Title goes here"
            subtitle="Subtitle here"
          />
          <CardMedia
            className={style.media}
            image="https://placeimg.com/400/400/nature"
          />
        </div>
        <CardActions>
          <Button label="Action 1" />
          <Button label="Action 2" />
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

        <DemoList>
          {basic.map((demo, i) => (
            <DemoListItem key={i} {...demo}/>
          ))}
        </DemoList>

        <DemoList>
          {media.map((demo, i) => (
            <DemoListItem key={i} {...demo}/>
          ))}
        </DemoList>

        <DemoList>
          {avatar.map((demo, i) => (
            <DemoListItem key={i} {...demo}/>
          ))}
        </DemoList>

        <DemoList>
          {small.map((demo, i) => (
            <DemoListItem key={i} {...demo}/>
          ))}
        </DemoList>
      </div>
    );
  }
}

export default CardTest;
