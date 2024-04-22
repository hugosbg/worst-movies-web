import React from 'react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import { screen, render, waitFor } from '@testing-library/react';
import { ApiGateway } from '../../providers/apiGateway';
import Provider from '../../common/Provider';
import Dashboard from '../../views/Dashboard';

const makeSut = () => {
  jest
    .spyOn(ApiGateway.prototype, 'getYearsWinners')
    .mockResolvedValueOnce({ years: [] });

  jest
    .spyOn(ApiGateway.prototype, 'getAwardRange')
    .mockResolvedValueOnce({ min: [], max: [] });

  jest
    .spyOn(ApiGateway.prototype, 'getStudiosWinners')
    .mockResolvedValueOnce({ studios: [] });

  render(
    <Provider>
      <BrowserRouter>
        <Dashboard />
      </BrowserRouter>
    </Provider>,
  );
};

describe('Dashboard', () => {
  it('should exists top3Winners', async () => {
    makeSut();
    await waitFor(() => {
      const top3Winners = screen.getByText('Top 3 studios with winners', {
        exact: true,
      });
      expect(top3Winners).toBeInTheDocument();
    });
  });

  it('should exists longestShortest', async () => {
    makeSut();
    await waitFor(() => {
      const longestShortest = screen.getByText(
        'Producers with longest and shortest interval between wins',
        { exact: true },
      );
      expect(longestShortest).toBeInTheDocument();
    });
  });

  it('should exists multipleWinners', async () => {
    makeSut();
    await waitFor(() => {
      const multipleWinners = screen.getByText(
        'List years with multiple winners',
        { exact: true },
      );
      expect(multipleWinners).toBeInTheDocument();
    });
  });

  it('should exists listByYear', async () => {
    makeSut();
    await waitFor(() => {
      const listByYear = screen.getByText('List movie winners by year', {
        exact: true,
      });
      expect(listByYear).toBeInTheDocument();
    });
  });
});
