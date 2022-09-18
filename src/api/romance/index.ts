import { API_ENDPOINT_ROMANCE } from "config/config";
import { useInfiniteQuery, QueryFunctionContext } from "react-query";
import axios from "axios";

export interface PaginationResponse<T> {
  results: T[];
  pageNumber: number;
  totalPages: number;
  isLastPage: boolean;
}

export interface Artist {
  name: string; // role: ArtistRole; // id: string // id
}

export type Period = "MON" | "TUE" | "WED" | "THU" | "FRI" | "SAT" | "SUN";

export interface ComicRankItem {
  alias: string; //
  title: string; //
  artists: Artist[]; //
  schedule: {
    periods: Period[]; //
  };
  genres: string[]; //
  freedEpisodeSize: number; //
  contentsState: "scheduled" | "completed"; // , currentRank: number; //
  previousRank: number; //
  updatedAt: number; //
  print: boolean; //
  thumbnailSrc: string; // url
}

export interface ComicRankApiSuccessResponse {
  hasNext: boolean; // page
  count: number; //
  data: ComicRankItem[]; //
}

const romanceKeys = {
  all: ["romance"] as const,
  lists: () => [...romanceKeys.all, "list"] as const,
  list: (filters: string) => [...romanceKeys.lists(), { filters }] as const,
  details: () => [...romanceKeys.all, "detail"] as const,
  detail: (id: number) => [...romanceKeys.details(), id] as const,
};

const useFetchRomance = () =>
  useInfiniteQuery(
    romanceKeys.lists(),
    ({ pageParam = 1 }: QueryFunctionContext) =>
      axios.get(`${API_ENDPOINT_ROMANCE}/page_${pageParam}.json`, {
        params: { pageParam },
      }),
    {
      getNextPageParam: (lastPage: any, pages: any) => {
        return !lastPage.data.hasNext
          ? undefined
          : lastPage.config.params.pageParam + 1;
      },
    },
  );

export default useFetchRomance;
