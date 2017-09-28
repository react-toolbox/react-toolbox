import { css } from 'styled-components';
import { withProps } from 'recompose';
import { merge, path } from 'ramda';
import { POSITIONS } from 'react-toolbox-core/lib/hoc/withPosition';
import ClippingBox, { ORIGINS } from '../ClippingBox';

const MenuNode = withProps(props => ({
  origin: positionAndAlignToOrigin(props.align, props.position),
  overrides: merge(props.overrides, {
    WrapperNode: css`
      position: absolute;
      z-index: 200;

      ${getPositionStyle(props)};
      ${path(['overrides', 'WrapperNode'], props)};
    `,
    InnerNode: css`
      background-color: #fff;
      ${path(['overrides', 'InnerNode'], props)};
    `,
  }),
}))(ClippingBox);

function positionAndAlignToOrigin(align, position) {
  if (position === POSITIONS.TOP) {
    if (align === POSITIONS.CENTER) return ORIGINS.BOTTOM_LEFT;
    if (align === POSITIONS.LEFT) return ORIGINS.BOTTOM_LEFT;
    if (align === POSITIONS.RIGHT) return ORIGINS.BOTTOM_RIGHT;
  }

  if (position === POSITIONS.BOTTOM) {
    if (align === POSITIONS.CENTER) return ORIGINS.TOP_LEFT;
    if (align === POSITIONS.LEFT) return ORIGINS.TOP_LEFT;
    if (align === POSITIONS.RIGHT) return ORIGINS.TOP_RIGHT;
  }

  if (position === POSITIONS.LEFT) {
    if (align === POSITIONS.BOTTOM) return ORIGINS.BOTTOM_RIGHT;
    if (align === POSITIONS.CENTER) return ORIGINS.TOP_RIGHT;
    if (align === POSITIONS.TOP) return ORIGINS.TOP_RIGHT;
  }

  if (position === POSITIONS.RIGHT) {
    if (align === POSITIONS.BOTTOM) return ORIGINS.BOTTOM_LEFT;
    if (align === POSITIONS.CENTER) return ORIGINS.BOTTOM_LEFT;
    if (align === POSITIONS.TOP) return ORIGINS.TOP_LEFT;
  }

  return ORIGINS.TOP_LEFT;
}

function getPositionStyle(props) {
  if (props.position === POSITIONS.BOTTOM) {
    if (props.align === POSITIONS.CENTER) {
      return css`
        left: calc(50% + ${props.offsetX}px);
        top: calc(100% + ${props.offsetY}px);
        transform: translate(-50%);
      `;
    } else if (props.align === POSITIONS.LEFT) {
      return css`
        left: ${props.offsetX}px;
        top: calc(100% + ${props.offsetY}px);
      `;
    } else if (props.align === POSITIONS.RIGHT) {
      return css`
        right: -${props.offsetX}px;
        top: calc(100% + ${props.offsetY}px);
      `;
    }
  }

  if (props.position === POSITIONS.TOP) {
    if (props.align === POSITIONS.CENTER) {
      return css`
        bottom: calc(100% - ${props.offsetY}px);
        left: calc(50% + ${props.offsetX}px);
        transform: translate(-50%);
      `;
    } else if (props.align === POSITIONS.LEFT) {
      return css`
        bottom: calc(100% - ${props.offsetY}px);
        left: ${props.offsetX}px;
      `;
    } else if (props.align === POSITIONS.RIGHT) {
      return css`
        bottom: calc(100% - ${props.offsetY}px);
        right: -${props.offsetX}px;
      `;
    }
  }

  if (props.position === POSITIONS.LEFT) {
    if (props.align === POSITIONS.CENTER) {
      return css`
        right: calc(100% - ${props.offsetX}px);
        top: calc(50% + ${props.offsetY}px);
        transform: translateY(-50%);
      `;
    } else if (props.align === POSITIONS.TOP) {
      return css`
        right: calc(100% - ${props.offsetX}px);
        top: ${props.offsetY}px;
      `;
    } else if (props.align === POSITIONS.BOTTOM) {
      return css`
        bottom: calc(0% + ${props.offsetY}px);
        right: calc(100% - ${props.offsetX}px);
      `;
    }
  }

  if (props.position === POSITIONS.RIGHT) {
    if (props.align === POSITIONS.CENTER) {
      return css`
        left: calc(100% + ${props.offsetX}px);
        top: calc(50% + ${props.offsetY}px);
        transform: translateY(-50%);
      `;
    } else if (props.align === POSITIONS.TOP) {
      return css`
        left: calc(100% + ${props.offsetX}px);
        top: ${props.offsetY}px;
      `;
    } else if (props.align === POSITIONS.BOTTOM) {
      return css`
        bottom: calc(0% + ${props.offsetY}px);
        left: calc(100% + ${props.offsetX}px);
      `;
    }
  }

  return '';
}

export default MenuNode;
