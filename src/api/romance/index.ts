import { API_ENDPOINT_ROMANCE } from "config/config";
import { useInfiniteQuery, QueryFunctionContext } from "react-query";
import axios from "axios";

export interface PaginationResponse<T> {
  results: T[];
  pageNumber: number;
  totalPages: number;
  isLastPage: boolean;
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
