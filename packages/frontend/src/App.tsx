import { StrictMode } from 'react';
import './App.css';
import { router } from './routes';
import { RouterProvider } from 'react-router-dom';
import { Theme } from '@twilio-paste/core/theme';

export const App = () => (
  <StrictMode>
    <Theme.Provider theme="default">
      <RouterProvider router={router} />
    </Theme.Provider>
  </StrictMode>
);
