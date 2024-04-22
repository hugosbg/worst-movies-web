import React from 'react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import { screen, render } from '@testing-library/react';
import { NotFound } from '../../views/Errors';

const makeSut = () =>
  render(
    <BrowserRouter>
      <NotFound />
    </BrowserRouter>,
  );

describe('Errors', () => {
  it('should exists NotFound', () => {
    makeSut();
    const page = screen.getByText('404: Page Not Found', { exact: true });
    expect(page).toBeInTheDocument();
  });
});
