import {
  changeActiveUser,
  changeActiveView,
  sortUsers,
} from "store/features/users/usersSlice";
import React from "react";
import { useAppDispatch, useAppSelector } from "store/hooks/hooks";
import styled from "styled-components";
import {
  ChildrenType,
  ViewType,
} from "types/types";
import Card from "components/Card/Card";
import Navigation from "components/Navigation/Navigation";

const UsersListStyled = styled.ul``;

const UsersListItemStyled = styled.li`
  position: relative;

  &:not(:first-child) {
    margin-top: 1.5rem;
    padding-top: 1.5rem;
    border-top: 1px solid ${({ theme }) => theme.colors.light};
  }
`;

const List = () => {
  const dispatch = useAppDispatch();
  const filteredUsers = useAppSelector(sortUsers);

  const changeView: (view: ViewType, id: string) => void = (view, id) => {
    dispatch(changeActiveUser(id));
    dispatch(changeActiveView(view));
  };

  const renderItems: () => ChildrenType = () => {
    const itemsToRender: React.ReactNode[] = [];

    for (let index = 0; index < [...filteredUsers.users].length; index++) {
      itemsToRender.push(
        <UsersListItemStyled key={filteredUsers.users[index]._id}>
          <Card
            onClick={() =>
              changeView("detail", filteredUsers.users[index]._id as string)
            }
            position={filteredUsers.users[index].position}
            name={filteredUsers.users[index].name}
          />
        </UsersListItemStyled>
      );
    }

    return itemsToRender;
  };

  return (
    <>
      <UsersListStyled>{renderItems()}</UsersListStyled>
      <Navigation />
    </>
  );
};
export default List;
