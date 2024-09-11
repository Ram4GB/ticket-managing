import { Link } from 'react-router-dom';
import styled from 'styled-components';

const AppLink = styled(Link)(() => ({
  color: '#00b96b',
  '&:hover': {
    textDecoration: 'underline',
    color: '#00b96b',
  },
}));

export default AppLink;
