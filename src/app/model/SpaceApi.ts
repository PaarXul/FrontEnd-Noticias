import { results } from './results';
export interface SpaceApi{
  results: results[];
  count: number;
  next: string;
}

