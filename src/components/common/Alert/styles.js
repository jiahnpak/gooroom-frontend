import {Alert} from 'react-bootstrap';
import styled from 'styled-components';

export const StyledAlert = styled(Alert)`
  // 알림창을 화면 상단 가운데에 위치
  position: fixed;
  top: 1.5rem;
  left: 50%;
  z-index: 999;
  transform: translate(-50%, 0%);

  max-width: 30rem;
`;
