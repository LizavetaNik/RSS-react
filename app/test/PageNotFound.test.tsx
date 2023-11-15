import '@testing-library/jest-dom';
import { Route, Routes } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ErrorPage from '../pages/PageNotFound/PageNotFound';

describe('<PageNotFound />', () => {
  it('is displayed when navigating to an invalid route', () => {

    render(
        <BrowserRouter>
         <Routes>
          <Route path="*" element={<ErrorPage />} />
         </Routes>
        </BrowserRouter>
    );
    expect(screen.getByText('PageNotFound')).toBeInTheDocument();
  });
});
