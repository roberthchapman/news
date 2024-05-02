import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import ThemeX from './theme';
import { AppRouting } from './AppRouting';
import { Provider } from 'react-redux';
import store from './store';

function App() {
  return (
    <BrowserRouter>
    <Provider store={store}>
    <ThemeX>
      <AppRouting/>
    </ThemeX>
    </Provider>
    </BrowserRouter>
  );
}

export default App;

export type AppDispatch = typeof store.dispatch
