import axios from 'axios';
import { setupCache, AxiosCacheInstance } from 'axios-cache-interceptor';
import {
  IApiGateway,
  MovieYearsWinnersResponse,
  MovieStudiosWinnersResponse,
  MovieAwardRangeResponse,
  MoviesInputAll,
  MoviesInputOne,
  ObjectType,
} from '../interfaces/ApiGateway';

export class ApiGateway implements IApiGateway {
  readonly http: AxiosCacheInstance;

  constructor() {
    const instance = axios.create({
      baseURL: process.env.REACT_APP_API_URL,
    });
    this.http = setupCache(instance, { interpretHeader: false });
  }

  async getMovies<T extends MoviesInputAll | MoviesInputOne>(
    params: T,
  ): Promise<ObjectType<T>> {
    const { data } = await this.http.get('/movies', {
      params,
    });
    return data;
  }

  async getYearsWinners() {
    const { data } = await this.http.get<MovieYearsWinnersResponse>('/movies', {
      params: { projection: 'years-with-multiple-winners' },
    });
    return data;
  }

  async getStudiosWinners() {
    const { data } = await this.http.get<MovieStudiosWinnersResponse>(
      '/movies',
      {
        params: { projection: 'studios-with-win-count' },
      },
    );
    return data;
  }

  async getAwardRange() {
    const { data } = await this.http.get<MovieAwardRangeResponse>('/movies', {
      params: { projection: 'max-min-win-interval-for-producers' },
    });
    return data;
  }
}
