import { AwardRange, Movies, YearsWinners, StudiosWinners } from './movies';

type MovieDataPageable = {
  sort: MovieDataSort;
  pageSize: number;
  pageNumber: number;
  offset: number;
  paged: boolean;
  unpaged: boolean;
};

type MovieDataSort = {
  sorted: boolean;
  unsorted: boolean;
};

export type MovieDataResponse = {
  content: Movies[];
  pageable: MovieDataPageable;
  totalElements: number;
  totalPages: number;
  first: boolean;
  last: boolean;
  sort: MovieDataSort;
  number: number;
  numberOfElements: number;
  size: number;
};

export type MovieYearsWinnersResponse = {
  years: YearsWinners[];
};

export type MovieStudiosWinnersResponse = {
  studios: StudiosWinners[];
};

export type MovieAwardRangeResponse = {
  min: AwardRange[];
  max: AwardRange[];
};

export type MoviesInputAll = {
  page: number;
  size: number;
  winner?: boolean;
  year?: number;
};

export type MoviesInputOne = {
  winner: boolean;
  year: number;
};

export type ObjectType<T> = T extends MoviesInputAll
  ? MovieDataResponse
  : T extends MoviesInputOne
    ? Movies
    : never;

export interface IApiGateway {
  getMovies<T extends MoviesInputAll | MoviesInputOne>(
    params: T,
  ): Promise<ObjectType<T>>;
  getYearsWinners(): Promise<MovieYearsWinnersResponse>;
  getStudiosWinners(): Promise<MovieStudiosWinnersResponse>;
  getAwardRange(): Promise<MovieAwardRangeResponse>;
}
