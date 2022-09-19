import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
  useMemo,
} from "react";
import styled from "styled-components";
import useFetchRomance from "api/romance";
import Content from "components/Content";
import Filter from "components/Filter";
import { Artist, ComicRankItem } from "components/types";

export interface FilterType {
  isFreedEpisode3: boolean;
  isScheduled: boolean;
  isCompleted: boolean;
  [prop: string]: boolean;
}

type ContentsProps = {
  gener: string;
};

const geners = new Map([
  ["romance", "로맨스"],
  ["comic", "코믹"],
]);

Object.freeze(geners);

const Contents = ({ gener }: ContentsProps) => {
  const generName = geners.get(gener);

  const { data, hasNextPage, isFetching, fetchNextPage } = useFetchRomance();

  const works = useMemo(
    () => (data ? data.pages.flatMap(({ data }) => data.data) : []),
    [data],
  );

  type IntersectHandler = (
    entry: IntersectionObserverEntry,
    observer: IntersectionObserver,
  ) => void;

  const [filterVal, setFilterVal] = useState<FilterType>({
    isFreedEpisode3: false,
    isScheduled: false,
    isCompleted: false,
  });

  const [filteredWorks, setFilteredWorks] = useState<ComicRankItem[]>([]);

  useEffect(() => {
    let tempWorks: ComicRankItem[] = works;

    if (filterVal.isFreedEpisode3) {
      tempWorks = tempWorks.filter((work) => work.freedEpisodeSize >= 3);
    }

    if (filterVal.isScheduled) {
      tempWorks = tempWorks.filter(
        (work) => work.contentsState === "scheduled",
      );
    }

    if (filterVal.isCompleted) {
      tempWorks = tempWorks.filter(
        (work) => work.contentsState === "completed",
      );
    }
    setFilteredWorks(tempWorks);
  }, [filterVal, works]);

  const useIntersect = (
    onIntersect: IntersectHandler,
    options?: IntersectionObserverInit,
  ) => {
    const ref = useRef<HTMLDivElement>(null);
    const callback = useCallback(
      (
        entries: IntersectionObserverEntry[],
        observer: IntersectionObserver,
      ) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) onIntersect(entry, observer);
        });
      },
      [onIntersect],
    );

    useEffect(() => {
      if (!ref.current) return;
      const observer = new IntersectionObserver(callback, options);
      observer.observe(ref.current);
      return () => observer.disconnect();
    }, [ref, options, callback]);

    return ref;
  };

  const ref = useIntersect(async (entry: any, observer: any) => {
    observer.unobserve(entry.target);
    if (hasNextPage && !isFetching) {
      fetchNextPage();
    }
  });

  return (
    <>
      <Filter generName={generName} setFilterVal={setFilterVal} />
      <Container>
        {filteredWorks.map((work) => (
          <Content
            key={work.id}
            title={work.title}
            artists={work.artists.filter((artist: Artist) => {
              return (
                artist.role === "writer" ||
                artist.role === "painter" ||
                artist.role === "scripter"
              );
            })}
            periods={work.schedule.periods}
            freedEpisodeSize={work.freedEpisodeSize}
            contentsState={work.contentsState}
            currentRank={work.currentRank}
            previousRank={work.previousRank}
            thumbnailSrc={work.thumbnailSrc}
          ></Content>
        ))}
        {isFetching && <Loading />}
        <Target ref={ref} />
      </Container>
    </>
  );
};

const Target = styled.div`
  height: 1px;
`;

const Container = styled.div`
  margin-top: 135px;
`;

const Loading = styled.div`
  background-color: gray;
`;

export default Contents;
