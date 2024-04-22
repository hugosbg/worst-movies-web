export interface Movies {
  id: number;
  year: number;
  title: string;
  studios: string[];
  producers: string[];
  winner: boolean;
}

export interface YearsWinners {
  year: number;
  winnerCount: number;
}

export interface StudiosWinners {
  name: string;
  winCount: number;
}

export interface AwardRange {
  producer: string;
  interval: number;
  previousWin: number;
  followingWin: number;
}
