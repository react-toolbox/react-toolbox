/* eslint-disable react/prop-types */
import React from 'react';
import Button, { IconButton } from '../../components/button';
import Card, { CardActions, CardMedia, CardText, CardTitle } from '../../components/card';
import style from '../style';

const dummyText = 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.';

const Spacer = () => <div style={{display: 'flex', flex: '1 1 auto'}}/>;
const CardList = ({children}) => <ul className={style.cardsGroup}>{children}</ul>;
const CardListItem = ({component, name}) => (
  <li className={style.cardItem}>
    <div className={style.cardItemContent}>{component}</div>
    <div className={style.cardItemName}>{name}</div>
  </li>
);

const cards = {
  basic: [{
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
  }, {
    name: 'Customized header',
    component: (
      <Card className={style.card}>
        <CardTitle
          title={<u>Title component</u>}
          subtitle={<u>Subtitle component</u>}
        />
        <CardText>{dummyText}</CardText>
        <CardActions>
          <Button label="Action 1" />
          <Button label="Action 2" />
        </CardActions>
      </Card>
    )
  }],
  media: [{
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
  }],
  avatar: [{
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
          <IconButton icon="share" />
          <IconButton icon="favorite" />
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
          <iframe width="1280" height="720" src="https://www.youtube.com/embed/sGbxmsDFVnE?rel=0&amp;showinfo=0" frameBorder="0" allowFullScreen />
        </CardMedia>
        <CardActions style={{ justifyContent: 'flex-end' }}>
          <IconButton icon="report_problem" />
          <Spacer/>
          <IconButton icon="share" />
          <IconButton icon="favorite" />
        </CardActions>
      </Card>
    )
  }],
  horizontal: [{
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
  }, {
    name: 'Another Variation',
    component: (
      <Card>
        <div className={style.cardRow}>
          <CardTitle
            title="Title goes here"
            subtitle="Subtitle here"
          />
          <CardMedia
            className={style.mediaLarge}
            image="https://placeimg.com/400/400/nature"
          />
        </div>
      </Card>
    )
  }],
  small: [{
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
          <IconButton icon="thumb_down" />
          <IconButton icon="thumb_up" />
          <IconButton icon="turned_in_not" />
        </CardActions>
      </Card>
    )
  }, {
    name: 'Small Media Controls',
    component: (
      <Card style={{width: '140px'}}>
        <CardMedia
          contentOverlay
          aspectRatio="square"
          image="https://placeimg.com/280/280/people"
        >
          <CardActions style={{justifyContent: 'center'}}>
            <IconButton inverse icon="fast_rewind" />
            <IconButton inverse icon="play_arrow" />
            <IconButton inverse icon="fast_forward" />
          </CardActions>
        </CardMedia>
      </Card>
    )
  }]
};

const CardTest = () => (
  <section>
    <h5>Cards</h5>
    <p>You have multiple options for cards. Combine different subcomponents to create your own:</p>

    <div className={style.cards}>
      {Object.keys(cards).map((key) => (
        <CardList key={key}>
          {cards[key].map((demo, i) => <CardListItem key={key + i} {...demo} />)}
        </CardList>
      ))}
    </div>
  </section>
);

export default CardTest;
