import styled from 'styled-components';

export default function withStyled(defaultStyle = '') {
  return function(Component) {
    return styled(Component).call(this, defaultStyle);
  };
}
