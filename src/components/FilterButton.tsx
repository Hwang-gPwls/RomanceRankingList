import { ReactNode } from "react";
import styled from "styled-components";

interface FilterButtonProps {
  id: string;
  title: string;
  handleClick: any;
  isClick: boolean;
  children?: ReactNode;
}

const FilterButton = ({
  id,
  title,
  isClick,
  handleClick,
}: FilterButtonProps) => {
  const clickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    handleClick(e);
  };

  return (
    <Button id={id} isClick={isClick} onClick={clickHandler}>
      {title}
    </Button>
  );
};

const Button = styled.button<{ isClick: boolean }>`
  background-color: ${({ isClick }) => (isClick ? "#fff" : "transparent")};
  color: ${({ isClick }) => (isClick ? "#1e2022" : "#fff")};
  border: 0;
  outline: 0;
  border-radius: 10px;
  padding: 8px;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
`;

export default FilterButton;
