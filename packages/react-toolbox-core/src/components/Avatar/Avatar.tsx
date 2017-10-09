import * as React from 'react';
import { Component, ComponentClass, ReactNode } from 'react';
import getPassThrough, { PassTroughFunction } from '../../utils/getPassThrough';

export interface AvatarProps {
  alt?: string;
  children?: ReactNode;
  className?: string;
  cover?: boolean;
  image?: string;
  title?: string;
}

export interface WrapperNodeProps {
  className?: string;
  cover?: boolean;
  errored?: boolean;
  image?: string;
}

export interface ImgNodeProps {
  alt?: string;
  cover?: boolean;
  errored?: boolean;
  onError(): void;
  src: string;
}

export interface AvatarFactoryArgs {
  ImgNode: ComponentClass<ImgNodeProps>;
  WrapperNode: ComponentClass<WrapperNodeProps>;
  passthrough: PassTroughFunction<AvatarProps, 'WrapperNode' | 'ImgNode'>;
}

export interface AvatarState {
  errored: boolean;
}

export default function avatarFactory({
  ImgNode,
  WrapperNode,
  passthrough,
}: AvatarFactoryArgs): ComponentClass<AvatarProps> {
  const passProps = getPassThrough(passthrough);
  return class Avatar extends Component<AvatarProps, AvatarState> {
    state = {
      errored: false,
    };

    componentWillUpdate(nextProps) {
      if (this.props.image !== nextProps.image) {
        this.setState({ errored: false });
      }
    }

    handleError = () => {
      this.setState({ errored: true });
    };

    render() {
      const {
        alt,
        children,
        className,
        cover,
        image,
        title,
        ...other,
      } = this.props;
      const { errored } = this.state;

      return (
        <WrapperNode
          {...passProps(this.props, 'WrapperNode', this)}
          className={className}
          cover={cover}
          errored={errored}
          image={image}
          {...other}
        >
          {image && (
            <ImgNode
              {...passProps(this.props, 'ImgNode', this)}
              alt={alt}
              cover={cover}
              onError={this.handleError}
              src={image!}
            />
          )}
          {(!image || errored) && title && getFirstLetter(title)}
          {children}
        </WrapperNode>
      );
    }
  };
}

function getFirstLetter(title) {
  return title ? title[0].toUpperCase() : '';
}
