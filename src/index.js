import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/test/List';
import { AppContainer } from 'react-hot-loader';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';

const render = (Component) => {
  ReactDOM.render(
    <AppContainer>
      <Component/>
    </AppContainer>,
    document.getElementById('root')
  );
};

render(App);

// Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./components/test/List', () => {
    render(App)
  });
}