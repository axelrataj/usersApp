import React, { useState } from "react";
import styled, { css } from "styled-components";
import { useAppDispatch, useAppSelector } from "store/hooks/hooks";
import {
  changeActiveUser,
  changeActiveView,
  searchTerm,
  sortType,
  selectSearchTerm
} from "store/features/users/usersSlice";
import iconSearch from "assets/images/icon-search.svg";
import iconSort from "assets/images/icon-filter.svg";
import iconXMark from "assets/images/icon-xmark.svg";
import iconPlus from "assets/images/icon-plus.svg";
import Input from "components/Form/Input";
import Select from "components/Form/Select";
import Button from "components/Button/Button";
import { SortType, ViewType } from "types/types";

const NavWrapperHeight = 60;

interface NavInterfacev {
  isShow: boolean;
}

const NavHeaderItemStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  min-height: ${NavWrapperHeight}px;
`;

const NavContainerStyled = styled.div<NavInterfacev>`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 0 ${({ theme }) => theme.grid.padding};
  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: 0px 0 15px -5px rgba(66, 68, 90, 0.5);
  transform: translateY(calc(100% - 60px));
  transition: 0.25s ease-in 0s;
  height: 140px;

  ${({ isShow }) =>
    isShow &&
    css`
      transform: translateY(0);
      padding: 0 ${({ theme }) => theme.grid.padding} 2.5rem;
    `}
`;

const NavContentItemStyled = styled.div<NavInterfacev>`
  padding: 0 1.5rem;
  display: none;
  ${({ isShow }) =>
    isShow &&
    css`
      display: block;
    `}
`;

const NavContentStyled = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
`;

const NavHeaderStyled = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  justify-content: space-between;
  align-items: center;
`;

const Navigation = () => {
  const [isShowNav, setIsShowNav] = useState(false);
  const [activeNav, setActiveNav] = useState("");
  const dispatch = useAppDispatch();
  const activeSearchTerm = useAppSelector(selectSearchTerm);

  const changeView: (view: ViewType, id: string) => void = (view, id) => {
    dispatch(changeActiveUser(id));
    dispatch(changeActiveView(view));
  };

  const showNav: (action: string) => void = (action) => {
    setIsShowNav(true);
    setActiveNav(action);
    if (activeNav === action) {
      setActiveNav("");
      setIsShowNav(false);
    }
  };

  const handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void = (
    e
  ) => {
    dispatch(searchTerm(e.target.value));
  };

  const handleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void = (
    e
  ) => {
    dispatch(sortType(e.target.value as SortType));
  };

  return (
    <>
      <NavContainerStyled isShow={isShowNav}>
        <NavHeaderStyled>
          <NavHeaderItemStyled onClick={() => showNav("search")}>
            <Button
              icon={
                isShowNav && activeNav === "search" ? iconXMark : iconSearch
              }
            >
              search
            </Button>
          </NavHeaderItemStyled>
          <NavHeaderItemStyled onClick={() => showNav("sort")}>
            <Button
              icon={isShowNav && activeNav === "sort" ? iconXMark : iconSort}
            >
              sort
            </Button>
          </NavHeaderItemStyled>
          <NavHeaderItemStyled
            onClick={() => {
              showNav("add");
              changeView("detail", "0");
            }}
          >
            <Button icon={iconPlus}>add</Button>
          </NavHeaderItemStyled>
        </NavHeaderStyled>
        <NavContentStyled>
          <NavContentItemStyled isShow={activeNav === "search"}>
            <Input
              name="search"
              defaultValue={activeSearchTerm ? activeSearchTerm : ''}
              type="search"
              required={false}
              placeholder="Search by name here..."
              onChange={(e) => {
                handleSearch(e);
              }}
            />
          </NavContentItemStyled>
          <NavContentItemStyled isShow={activeNav === "sort"}>
            <Select
              name="sort"
              placeholder="Sort by..."
              onChange={(e) => handleChange(e)}
              options={[
                { value: "name", label: "Name" },
                { value: "age", label: "Age" },
                { value: "position", label: "Position" },
              ]}
            />
          </NavContentItemStyled>
        </NavContentStyled>
      </NavContainerStyled>
    </>
  );
};

export default Navigation;
