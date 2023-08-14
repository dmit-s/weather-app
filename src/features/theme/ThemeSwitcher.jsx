import styled from "styled-components";
import { BsSunFill, BsMoonFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";
import { selectTheme, setTheme } from "./themeSlice";

const Wrapper = styled.div`
  display: flex;
  align-items: center;

  svg {
    &:first-child {
      color: var(--clr-yellow);
    }
    &:last-child {
      color: var(--clr-purple);
    }
    font-size: 1.5rem;
  }
`;
const Input = styled.input.attrs({
  type: "checkbox",
})`
  position: relative;
  margin: 0 0.5rem;
  appearance: none;
  width: 3.75rem;
  height: 1.875rem;
  background-color: var(--bg-primary);
  border-radius: 50px;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    &:before {
      background-color: var(--primary);
    }
  }

  &:checked {
    &:before {
      transform: translateX(100%);
    }
  }

  &:before {
    content: "";
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 100;
    background-color: var(--secondary);
    border-radius: 50%;
    width: 1.875rem;
    height: 1.875rem;
    transition: 0.3s;
  }
`;

export const ThemeSwitcher = () => {
  const theme = useSelector(selectTheme);
  const dispatch = useDispatch();

  useEffect(() => {
    theme
      ? document.body.setAttribute("data-theme", "dark")
      : document.body.setAttribute("data-theme", "light");
  }, [theme]);

  return (
    <Wrapper>
      <BsSunFill />
      <Input
        onChange={(e) => dispatch(setTheme(e.target.checked))}
        checked={theme}
      />
      <BsMoonFill />
    </Wrapper>
  );
};
