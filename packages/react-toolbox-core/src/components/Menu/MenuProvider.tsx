import * as React from 'react';
import { cloneElement, Children, Component, ComponentClass } from 'react';
import getViewport from '../../utils/getViewport';
import isComponentOfType from '../../utils/isComponentOfType';
import getPassThrough, { PassTroughFunction } from '../../utils/getPassThrough';
import { MenuPosition, POSITIONS, MenuProps } from './Menu';

export interface MenuProviderProps {
  active?: boolean;
  align?: MenuPosition;
  position?: MenuPosition;
}

export interface MenuProviderNodeProps {
  active?: boolean;
  innerRef(instance: HTMLElement): void;
}

export interface MenuProviderFactoryArgs {
  Menu: ComponentClass<MenuProps>;
  MenuProviderNode: ComponentClass<MenuProviderNodeProps>;
  passthrough: PassTroughFunction<MenuProviderProps, 'MenuProviderNode'>;
}

export default function menuProviderFactory({
  Menu,
  MenuProviderNode,
  passthrough,
}: MenuProviderFactoryArgs): ComponentClass<MenuProviderProps> {
  const passProps = getPassThrough(passthrough);
  return class MenuProvider extends Component<MenuProviderProps, void> {
    static defaultProps = {
      align: POSITIONS.AUTO,
      position: POSITIONS.AUTO,
    };

    calculatedAlign: MenuPosition | null = null;
    calculatedPosition: MenuPosition | null = null;
    triggerElement: HTMLElement | null = null;

    componentDidMount() {
      this.calculateAlignAndPosition(this.props);
      if (this.props.active) {
        this.forceUpdate();
      }
    }

    componentWillUpdate(nextProps) {
      this.calculateAlignAndPosition(nextProps);
    }

    calculateAlignAndPosition = (props: MenuProviderProps) => {
      if (
        this.triggerElement &&
        props.active === true &&
        (props.align === POSITIONS.AUTO || props.position === POSITIONS.AUTO)
      ) {
        const { height: wh, width: ww } = getViewport();
        const { top, left, height, width } = this.triggerElement.getBoundingClientRect();
        this.calculatedAlign = left <= ww / 2 - width / 2 ? POSITIONS.LEFT : POSITIONS.RIGHT;
        this.calculatedPosition = top > wh / 2 - height / 2 ? POSITIONS.TOP : POSITIONS.BOTTOM;
      }
    };

    handleTriggerRef = node => {
      this.triggerElement = node;
    };

    mapChild = child => {
      const { active, align, position } = this.props;
      if (isComponentOfType(Menu, child)) {
        return cloneElement(child, {
          active,
          align: align === POSITIONS.AUTO ? this.calculatedAlign : align,
          position: position === POSITIONS.AUTO ? this.calculatedPosition : position,
        });
      }
      return child;
    };

    render() {
      return (
        <MenuProviderNode
          {...passProps(this.props, 'MenuProviderNode', this)}
          active={this.props.active}
          innerRef={this.handleTriggerRef}
        >
          {Children.map(this.props.children, this.mapChild)}
        </MenuProviderNode>
      );
    }
  };
}
