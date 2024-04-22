import React from 'react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import { screen, render, waitFor } from '@testing-library/react';
import { ApiGateway } from '../../providers/apiGateway';
import Provider from '../../common/Provider';
import List from '../../views/List';

const makeSut = () => {
  jest.spyOn(ApiGateway.prototype, 'getMovies').mockResolvedValueOnce({
    content: [],
    totalElements: 0,
  } as never);

  render(
    <Provider>
      <BrowserRouter>
        <List />
      </BrowserRouter>
    </Provider>,
  );
};

describe('List', () => {
  it('should exists table', async () => {
    makeSut();
    await waitFor(() => {
      const dataTableList = screen.getByText('List movies', { exact: true });
      expect(dataTableList).toBeInTheDocument();
    });
  });
});
