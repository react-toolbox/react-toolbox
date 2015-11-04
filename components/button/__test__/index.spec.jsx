import expect from 'expect';
import style from '../../button/style';
import utils from '../../utils/testing';
import Button from '../index';

describe('Button', function () {
  let button;

  describe('#render', function () {

    it('uses flat and primary styles by default', function () {
      button = utils.shallowRenderComponent(Button);

      expect(button.props.className).toContain(style.flat);
      expect(button.props.className).toContain(style.primary);
    });

    it('renders accent button with accent style', function () {
      button = utils.shallowRenderComponent(Button, { accent: true });
      var expectedClassName = `${style.flat} ${style.accent}`;

      expect(button.props.className).toContain(style.flat);
      expect(button.props.className).toContain(style.accent);
    });

    it('1 renders mini button with mini style', function () {
      button = utils.shallowRenderComponent(Button, { mini: true });

      expect(button.props.className).toContain(style.flat);
      expect(button.props.className).toContain(style.primary);
      expect(button.props.className).toContain(style.mini);
    });

    it('renders mini accented button with both styles', function () {
      button = utils.shallowRenderComponent(Button, { mini: true, accent: true });

      expect(button.props.className).toContain(style.flat);
      expect(button.props.className).toContain(style.accent);
      expect(button.props.className).toContain(style.mini);
    });

  });
});
