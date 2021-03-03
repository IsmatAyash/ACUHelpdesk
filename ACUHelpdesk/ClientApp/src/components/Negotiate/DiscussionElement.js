import styled from "styled-components";

export const Discussion = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  max-height: 100%;
`;

export const DiscussionBody = styled.div`
  background-color: #eee;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding-bottom: 1rem;
  overflow: auto;
`;
