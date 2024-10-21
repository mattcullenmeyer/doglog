import { StrictMode } from 'react';
import './App.css';
import { Theme } from '@twilio-paste/core/theme';
import { Provider as ReduxProvider } from 'react-redux';
import { Pages } from './pages';
import { store } from './store';

export const App = () => (
  <StrictMode>
    <ReduxProvider store={store}>
      <Theme.Provider theme="default">
        <Pages />
      </Theme.Provider>
    </ReduxProvider>
  </StrictMode>
);
