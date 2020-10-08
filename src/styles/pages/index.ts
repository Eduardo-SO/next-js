import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  height: 100vh; 

  div {
    display: flex;
    flex-direction: column;

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

export const Button = styled.button`
  margin-top: 24px;
  padding: 15px;
  border: 1px solid #f48c06;
  border-radius: 8px;

  background: #08001F;
  color: #f48c06;

  font-size: 16px;
  font-weight: bold;

  cursor: pointer;
`;