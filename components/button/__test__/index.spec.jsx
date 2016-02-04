import expect from 'expect';
import style from '../../button/style';
import utils from '../../utils/testing';
import {RawButton as Button} from '../Button';

describe('Button', function () {
  let button;

  describe('#render', function () {
    it('uses flat and neutral styles by default', function () {
      button = utils.shallowRenderComponent(Button);

      expect(button.props.className).toContain(style.flat);
      expect(button.props.className).toContain(style.neutral);
    });

    it('renders accent button with accent style', function () {
      button = utils.shallowRenderComponent(Button, { accent: true });

      expect(button.props.className).toContain(style.flat);
      expect(button.props.className).toContain(style.accent);
    });

    it('renders mini button with mini style', function () {
      button = utils.shallowRenderComponent(Button, { floating: true, mini: true });

      expect(button.props.className).toContain(style.floating);
      expect(button.props.className).toContain(style.neutral);
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
