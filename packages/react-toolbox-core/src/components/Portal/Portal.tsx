import { Children, Component, ReactNode } from 'react';
import {
  findDOMNode,
  unmountComponentAtNode,
  unstable_renderSubtreeIntoContainer as renderSubtree,
} from 'react-dom';

export interface PortalProps {
  children: ReactNode;
  className?: string;
  container: HTMLElement | (() => HTMLElement);
  onMount(): void;
  onUnmount(): void;
  parentId: string;
}

export default function portalFactory() {
  return class Portal extends Component<PortalProps, void> {
    childRootNode: HTMLElement | null = null;

    componentDidMount() {
      this.renderChildren();
    }

    componentWillReceiveProps(nextProps) {
      if (this.childRootNode && nextProps.container !== this.props.container) {
        getContainer(this.props.container).removeChild(this.childRootNode);
        getContainer(nextProps.container).appendChild(this.childRootNode);
      }
    }

    componentDidUpdate() {
      this.renderChildren();
    }

    componentWillUnmount() {
      this.unmount();
    }

    renderChildren() {
      const children = getChildren(this.props.children);

      if (children !== null) {
        const childRootNode = this.getOrCreateChildRootNode();

        if (this.props.className) {
          childRootNode.className = this.props.className;
        }

        if (this.props.parentId) {
          childRootNode.setAttribute('data-origin-id', this.props.parentId);
        }

        renderSubtree(this, children, childRootNode);
      } else {
        this.unmount();
      }
    }

    getOrCreateChildRootNode() {
      if (!this.childRootNode) {
        this.childRootNode = document.createElement('div');
        getContainer(this.props.container).appendChild(this.childRootNode);
        if (this.props.onMount) {
          this.props.onMount();
        }
      }

      return this.childRootNode;
    }

    unmount() {
      if (this.childRootNode) {
        unmountComponentAtNode(this.childRootNode);
        getContainer(this.props.container).removeChild(this.childRootNode);
        this.childRootNode = null;
        if (this.props.onUnmount) {
          this.props.onUnmount();
        }
      }
    }

    render() {
      return null;
    }
  };
}

function getChildren(children) {
  return children ? Children.only(children) : null;
}

function getContainer(
  container: HTMLElement | (() => HTMLElement),
): HTMLElement {
  return (
    findDOMNode(typeof container === 'function' ? container() : container) ||
    document.body
  );
}
