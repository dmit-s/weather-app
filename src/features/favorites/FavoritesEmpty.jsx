import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 2.5rem 0;
  background-color: var(--bg-primary);
`;
const Message = styled.span`
  font-size: 1.25rem;
  color: var(--primary);
`;

export const FavoritesEmpty = () => {
  return (
    <Wrapper>
      <Message>Favorites is empty.</Message>
    </Wrapper>
  );
};
