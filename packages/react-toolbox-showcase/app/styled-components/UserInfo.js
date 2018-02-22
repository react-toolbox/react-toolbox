import React from 'react';
import PropTypes from 'prop-types'; // eslint-disable-line
import styled from 'styled-components';
import Avatar from 'react-toolbox-sc/lib/Avatar';

const UserInfo = ({ selected, user }) => (
  <Wrapper>
    <Avatar image={user.avatar} title={user.name} cover />
    <Content selected={selected}>
      <div>{user.name}</div>
      <Bio>{user.bio}</Bio>
    </Content>
  </Wrapper>
);

UserInfo.propTypes = {
  selected: PropTypes.bool,
  user: PropTypes.shape({
    avatar: PropTypes.string,
  }),
};

const Wrapper = styled.div`
  display: flex;
  padding: 5px;
  width: 100%;
`;

const Content = styled.div`
  color: ${props => props.selected ? 'blue' : 'inherit'};
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 10px;
`;

const Bio = styled.div`
  color: gray;
  font-size: 14px;
`;

export default UserInfo;
