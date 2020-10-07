import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  height: 100vh; 

  div {
    background: #ffffff05;

    padding: 40px 60px;
    border-radius: 8px;
  }

  ul {
    list-style: none;

    strong {
      color: #f48c06;
    }

    li + li {
      margin-top: 8px;
    }
  }
`;

export const Title = styled.h1`
  margin-bottom: 16px;
  color: #f48c06;
  text-transform: capitalize;
`;