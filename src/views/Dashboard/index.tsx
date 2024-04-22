import React, { useContext, useEffect, useState, Fragment } from 'react';
import { SxProps } from '@mui/system';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import {
  Movies,
  AwardRange,
  YearsWinners,
  StudiosWinners,
} from '../../interfaces/movies';
import Content from '../../common/Content';
import { ProviderContext } from '../../common/Provider';
import { MultipleWinners } from './MultipleWinners';
import { Top3Winners } from './Top3Winners';
import { LongestShortest } from './LongestShortest';
import { ListByYear } from './ListByYear';

const sxProps: SxProps = {
  p: 2,
  display: 'flex',
  flexDirection: 'column',
  minHeight: 240,
};

export default function Dashboard() {
  const { api } = useContext(ProviderContext);

  const [awardRangeMax, setAwardRangeMax] = useState<AwardRange[]>([]);
  const [awardRangeMin, setAwardRangeMin] = useState<AwardRange[]>([]);
  const [yearsWinners, setYearsWinners] = useState<YearsWinners[]>([]);
  const [studiosWinners, setStudiosWinners] = useState<StudiosWinners[]>([]);
  const [movies, setMovies] = useState<Movies[]>([]);

  useEffect(() => {
    Promise.all([
      api.getYearsWinners(),
      api.getAwardRange(),
      api.getStudiosWinners(),
    ])
      .then((results) => {
        const [yearsResult, rangeResult, studiosResult] = results;
        setYearsWinners(yearsResult.years);
        setAwardRangeMax(rangeResult.max);
        setAwardRangeMin(rangeResult.min);
        setStudiosWinners(studiosResult.studios?.slice(0, 3));
      })
      .catch((error) => {
        console.error('[Dashboad]', error);
      });
  }, []);

  const handleSearch = async (year: string) => {
    if (!year) {
      return setMovies([]);
    }
    try {
      const { content } = await api.getMovies({
        page: 0,
        size: 10,
        winner: true,
        year: Number(year),
      });
      setMovies(content);
    } catch (error: any) {
      console.error('[Dashboad > Search]', error);
    }
  };

  return (
    <Fragment>
      <Content>
        <Grid container spacing={3}>
          <Grid item xs={12} md={12} lg={6}>
            <Paper sx={sxProps}>
              <MultipleWinners rows={yearsWinners} />
            </Paper>
          </Grid>

          <Grid item xs={12} md={12} lg={6}>
            <Paper sx={sxProps}>
              <Top3Winners rows={studiosWinners} />
            </Paper>
          </Grid>

          <Grid item xs={12} md={12} lg={6}>
            <Paper sx={sxProps}>
              <LongestShortest
                maxRows={awardRangeMax}
                minRows={awardRangeMin}
              />
            </Paper>
          </Grid>

          <Grid item xs={12} md={12} lg={6}>
            <Paper sx={sxProps}>
              <ListByYear rows={movies} onSearch={handleSearch} />
            </Paper>
          </Grid>
        </Grid>
      </Content>
    </Fragment>
  );
}
