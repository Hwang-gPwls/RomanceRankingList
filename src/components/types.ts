export type Period = "MON" | "TUE" | "WED" | "THU" | "FRI" | "SAT" | "SUN";

export type Genres = "romance" | "comic";

export type ArtistRole =
  | "writer"
  | "painter"
  | "scripter"
  | "original"
  | "publisher"
  | "label";

export interface Artist {
  name: string;
  role: ArtistRole;
  id: string;
}

export interface ComicRankItem {
  id: number;
  alias: string;
  title: string;
  artists: Artist[];
  schedule: {
    periods: Period[];
  };
  genres: string[];
  freedEpisodeSize: number;
  contentsState: "scheduled" | "completed";
  currentRank: number;
  previousRank: number;
  updatedAt: number;
  print: boolean;
  thumbnailSrc: string;
}

export interface ContentProps {
  title: string;
  artists: Artist[];
  periods: Period[];
  freedEpisodeSize: number;
  contentsState: "scheduled" | "completed";
  currentRank: number;
  previousRank: number;
  thumbnailSrc: string;
}
