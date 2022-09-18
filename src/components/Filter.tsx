import React, { useState } from "react";
import styled from "styled-components";
import { FilterType } from "pages/Contents";
import FilterButton from "components/FilterButton";

interface FilterProps {
  generName?: string;
  setFilterVal: React.Dispatch<React.SetStateAction<FilterType>>;
}

const Filter = ({ generName, setFilterVal }: FilterProps) => {
  const [isButtonsClick, setIsButtonsClick] = useState<FilterType>({
    isFreedEpisode3: false,
    isScheduled: false,
    isCompleted: false,
  });

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const key = e.currentTarget.id;

    setFilterVal((current) => {
      let newCondition = { ...current };
      newCondition[key] = !current[key];

      if (key === "isScheduled" && !current[key] === true)
        newCondition["isCompleted"] = false;

      if (key === "isCompleted" && !current[key] === true)
        newCondition["isScheduled"] = false;

      setIsButtonsClick(newCondition);
      return newCondition;
    });
  };

  return (
    <Container className={"fixed"}>
      <Title>{`${generName} 장르 랭킹`}</Title>
      <Wrapper>
        <FilterButton
          id={"isScheduled"}
          handleClick={handleClick}
          title={"연재중"}
          isClick={isButtonsClick.isScheduled}
        />
        <FilterButton
          id={"isCompleted"}
          handleClick={handleClick}
          title={"완결"}
          isClick={isButtonsClick.isCompleted}
        />
        <FilterButton
          id={"isFreedEpisode3"}
          handleClick={handleClick}
          title={"무료회차 3개 이상"}
          isClick={isButtonsClick.isFreedEpisode3}
        />
      </Wrapper>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 130px;
  z-index: 1000;
  background-color: #1e2022;
`;

const Title = styled.div`
  width: 100%;
  height: 40px;
  line-height: 40px;
  font-size: 25px;
  font-weight: 500;
  margin-top: 5px;
  color: #fff;
  text-align: center;
`;

const Wrapper = styled.div`
  width: 52rem;
  height: 90px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: auto;
`;

export default React.memo(Filter);
