import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import Button from 'react-toolbox-sc/lib/Button';
import Avatar from 'react-toolbox-sc/lib/Avatar';
import Collapsable from 'react-toolbox-sc/lib/Collapsable';
import FontIcon from 'react-toolbox-sc/lib/FontIcon';
import Card, {
  CardActions,
  CardHeader,
  CardMedia,
  CardTitle,
  CardTitlePrimary,
  CardTitleSecondary,
  CardText
} from 'react-toolbox-sc/lib/Card';

class CardExamples extends Component {
  state = {
    cardOpen: false,
  };

  toggleCard = () => {
    this.setState({
      cardOpen: !this.state.cardOpen,
    });
  }

  render() {
    return (
      <section>
        <h5>Card</h5>
        <p>Agnostic + Styled Components</p>

        <Card overrides={overrides}>
          <CardMedia>
            <img src="https://placeimg.com/800/450/nature" />
          </CardMedia>
          <CardHeader>
            <CardTitle>
              <CardTitlePrimary>Title goes here</CardTitlePrimary>
            </CardTitle>
          </CardHeader>
          <CardText>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</CardText>
          <CardActions>
            <Button primary>Share</Button>
            <Button primary>Explore</Button>
          </CardActions>
        </Card>

        <h5>Card</h5>
        <p>Agnostic + Styled Components</p>

        <Card overrides={overrides}>
          <CardMedia image="https://www.scienceabc.com/wp-content/uploads/2015/12/iron-man-suit.jpg">
            <CardHeader>
              <CardTitle>
                <CardTitlePrimary>Iron Man</CardTitlePrimary>
              </CardTitle>
            </CardHeader>
          </CardMedia>
          <CardHeader>
            <CardTitle>
              <CardTitleSecondary>Anthony Edward "Tony" Stark</CardTitleSecondary>
            </CardTitle>
          </CardHeader>
          <CardText>Iron Man is a fictional superhero appearing in American comic books published by Marvel Comics. The character was created by writer and editor Stan Lee, developed by scripter Larry Lieber, and designed by artists Don Heck and Jack Kirby.</CardText>
          <CardActions>
            <Button primary>Read More</Button>
          </CardActions>
        </Card>

        <h5>Card</h5>
        <p>Agnostic + Styled Components</p>

        <Card overrides={overrides}>
          <CardHeader>
            <Avatar
              alt="foobar"
              image="http://www.thewrap.com/wp-content/uploads/2015/08/margot-robbie-harley-quinn_main.jpg"
              cover
            />
            <CardTitle>
              <CardTitlePrimary>Dr. Harleen Frances Quinzel</CardTitlePrimary>
              <CardTitleSecondary>Harley Quinn</CardTitleSecondary>
            </CardTitle>
          </CardHeader>
          <CardMedia>
            <img src="http://www.dccomics.com/sites/default/files/GalleryChar_1920x1080_NSS4_cover_R1_54b9c435bfd156.85552032.jpg" />
          </CardMedia>
          <CardText>
            <p>Harley Quinn, whose real name is Dr. Harleen Frances Quinzel, PhD, is depicted as having been a psychologist at Gotham City's Arkham Asylum.</p>
            <p>The character's origin story relates that as a psychologist, is assigned to the criminally insane Joker. Fascinated by him, she eventually falls in love with the Joker and becomes his lover and accomplice.</p>
          </CardText>
        </Card>

        <h5>Card</h5>
        <p>Agnostic + Styled Components</p>

        <Card overrides={overrides}>
          <CardHeader>
            <Avatar
              alt="foobar"
              image="http://www.thewrap.com/wp-content/uploads/2015/08/margot-robbie-harley-quinn_main.jpg"
              cover
            />
            <CardTitle>
              <CardTitlePrimary>Dr. Harleen Frances Quinzel</CardTitlePrimary>
              <CardTitleSecondary>Harley Quinn</CardTitleSecondary>
            </CardTitle>
          </CardHeader>
          <CardMedia>
            <img src="http://www.dccomics.com/sites/default/files/GalleryChar_1920x1080_NSS4_cover_R1_54b9c435bfd156.85552032.jpg" />
          </CardMedia>
          <CardActions>
            <Button><FontIcon value="favorite" /></Button>
            <Button><FontIcon value="share" /></Button>
            <Separator />
            <Button onClick={this.toggleCard}>
             <FontIcon value={this.state.cardOpen ? "keyboard_arrow_up" : "keyboard_arrow_down" } />
            </Button>
          </CardActions>
          <Collapsable collapsed={!this.state.cardOpen}>
            <CardText>
              <p>Harley Quinn, whose real name is Dr. Harleen Frances Quinzel, PhD, is depicted as having been a psychologist at Gotham City's Arkham Asylum.</p>
              <p>The character's origin story relates that as a psychologist, is assigned to the criminally insane Joker. Fascinated by him, she eventually falls in love with the Joker and becomes his lover and accomplice.</p>
            </CardText>
          </Collapsable>
        </Card>

        <h5>Card</h5>
        <p>Agnostic + Styled Components</p>

        <Card overrides={cardWithBackground}>
          <CardHeader>
            <CardTitle>
              <CardTitlePrimary>Title goes here</CardTitlePrimary>
            </CardTitle>
          </CardHeader>
          <CardText>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500.</CardText>
          <CardActions>
            <Button primary>Listen now</Button>
          </CardActions>
        </Card>

        <h5>Card</h5>
        <p>Agnostic + Styled Components</p>

        <Card overrides={cardWithDifferentLayout}>
          <CardHeader overrides={cardWithDifferentLayout}>
            <CardTitle>
              <CardTitlePrimary>Avatar Card</CardTitlePrimary>
              <CardTitleSecondary>An awesome basic card</CardTitleSecondary>
            </CardTitle>
            <img src="https://placeimg.com/100/100/nature" />
          </CardHeader>
        </Card>

        <h5>Card</h5>
        <p>Agnostic + Styled Components</p>

        <Card overrides={cardSmall}>
          <CardMedia aspectRatio="square" image="https://placeimg.com/280/280/people">
            <CardActions overrides={cardSmall}>
              <Button overrides={cardSmall}><FontIcon value="fast_rewind" /></Button>
              <Button overrides={cardSmall}><FontIcon value="play_arrow" /></Button>
              <Button overrides={cardSmall}><FontIcon value="fast_forward" /></Button>
            </CardActions>
          </CardMedia>
        </Card>
      </section>
    );
  }
}

const Separator = styled.div`
  display: flex;
  flex: 1 1 auto;
`;

const overrides = {
  CardNode: css`
    width: 400px;
  `,
};

const cardWithBackground = {
  CardNode: css`
    background: #2d566b;
    width: 400px;
    color: white;

    & button {
      color: white;
    }
  `,
};

const cardWithDifferentLayout = {
  CardNode: css`
    width: 400px;
  `,
  CardHeaderNode: css`
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
    padding: 16px;
  `,
};
const cardSmall = {
  CardNode: css`
    width: 150px;
    height: 150px;
  `,
  CardActionsNode: css`
    background-color: rgba(0, 0, 0, 0.35);
  `,
  ButtonNode: css`
    color: white;
  `,
};

export default CardExamples;
