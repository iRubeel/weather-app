// src/styledComponents.js
import styled from 'styled-components';

export const AppWrap = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: ${({ theme }) => (theme === 'light' ? '#fff' : '#333')};
  color: ${({ theme }) => (theme === 'light' ? '#333' : '#fff')};
  transition: all 0.25s linear;

  @media (max-width: 768px) {
    // Adjust styles for tablets and below
  }

  @media (max-width: 480px) {
    // Adjust styles for mobile devices
  }
`;

