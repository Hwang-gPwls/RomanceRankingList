import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { ContentProps } from "components/types";
import { BiMinus } from "react-icons/bi";
import { BsFillCaretDownFill, BsFillCaretUpFill } from "react-icons/bs";

const Content = ({
  title,
  artists,
  periods,
  freedEpisodeSize,
  contentsState,
  currentRank,
  previousRank,
  thumbnailSrc,
}: ContentProps) => {
  type RankStateType = "up" | "down" | "noChanged";

  const dayOfWeek = new Map([
    ["MON", "월요일"],
    ["TUE", "화요일"],
    ["WED", "수요일"],
    ["THU", "목요일"],
    ["FRI", "금요일"],
    ["SAT", "토요일"],
    ["SUN", "일요일"],
  ]);

  Object.freeze(dayOfWeek);

  const [rankState, setRankState] = useState<RankStateType>("up");
  const [changedRankVal, setChangedRankVal] = useState(0);

  useEffect(() => {
    const differ = previousRank - currentRank;

    if (differ < 0) {
      setRankState("down");
    } else if (differ > 0) {
      setRankState("up");
    } else {
      setRankState("noChanged");
    }

    setChangedRankVal(Math.abs(differ));
  }, [currentRank, previousRank]);

  return (
    <Container>
      <Main>
        <img className="work-image" src={thumbnailSrc} alt="workImage" />
        <Details>
          <div className="rank">
            <h4 className="rank_cur-rank">{currentRank}</h4>
            <h3 className="rank_status">
              {rankState === "down" ? (
                <div className="rank_changed-rank-val">
                  <BsFillCaretDownFill
                    size="13"
                    color="#0080ff"
                    style={{ margin: "3px 0 0 0" }}
                  />
                  <p>{changedRankVal}</p>
                </div>
              ) : rankState === "up" ? (
                <div className="rank_changed-rank-val">
                  <BsFillCaretUpFill size="13" color="#f1404b" />
                  <p>{changedRankVal}</p>
                </div>
              ) : (
                <>
                  <BiMinus size="18" color="#8b8687" />
                </>
              )}
            </h3>
          </div>
          <div className="title">{title}</div>
          <h3 className="artists">
            {artists
              .map((artist) => {
                return artist.name;
              })
              .join(", ")}
          </h3>
          <h3 className="freedEpisodeSize">{`${freedEpisodeSize}회차 무료`}</h3>
          <p className="post-description">
            {contentsState === "scheduled"
              ? "매주 " +
                periods
                  .map((period) => {
                    return dayOfWeek.get(period);
                  })
                  .join(", ") +
                " 연재"
              : "완결"}
          </p>
        </Details>
      </Main>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  box-sizing: border-box;
`;

const Main = styled.div`
  width: 35rem;
  height: 170px;
  border-radius: 10px;
  overflow: hidden;
  margin: 1rem auto;
  background-color: #fff;
  box-shadow: 0px 20px 100px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: row;

  .work-image {
    width: 80px;
    height: 120px;
    margin: auto 1rem;
  }
`;

const Details = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  margin-left: 2rem;

  .rank {
    width: 97px;
    background-color: #000;
    border-radius: 30px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 3px 6px;

    &_cur-rank {
      font-size: 17px;
      font-weight: 800;
      position: relative;
      top: 1px;
      left: 5px;
      color: #fff;
    }

    &_changed-rank-val {
      font-size: 13px;
      font-weight: 800;
      margin-left: 30px;
      color: #8b8687;
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
      align-items: center;
    }
  }

  .title {
    font-size: 18px;
    font-weight: 600;
    margin-top: 0.625rem;
  }

  .artists {
    font-size: 14px;
    font-weight: 500;
    margin-top: 0.31rem;
  }

  .freedEpisodeSize {
    font-size: 12.7px;
    margin-top: 0.85rem;
  }

  .post-description {
    font-size: 12.7px;
    font-weight: 400;
    margin-top: 0.2rem;
  }
`;

export default Content;
