import styled from "styled-components";

const Wrapper = styled.div`
  max-width: 1240px;
  padding: 0 2rem;
  margin: 0 auto;

  @media (max-width: 481px) {
    padding: 0 1rem;
  }
`;

export const Container = ({ className, children }) => {
  return <Wrapper className={className}>{children}</Wrapper>;
};
