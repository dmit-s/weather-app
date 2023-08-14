import { useSelector } from "react-redux";
import styled from "styled-components";
import { NotifyItem } from "./NofityItem";
import { selectNotifications } from "./notificationsSlice";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 1;
  padding: 1rem;
  max-width: 360px;
  width: 65vw;
  height: auto;

  @media (max-width: 481px) {
    align-items: center;
    max-width: 100vw;
    width: 100%;
  }
`;

export const NotifyContainer = () => {
  const notifications = useSelector(selectNotifications);

  return (
    <Wrapper>
      {notifications.map((item) => (
        <NotifyItem key={item.id} {...item} />
      ))}
      {/* <NotifyItem type={"error"} /> */}
    </Wrapper>
  );
};
