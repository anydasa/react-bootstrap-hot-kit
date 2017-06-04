import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Router, browserHistory } from 'react-router'
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { loadState, saveState } from './utils/localStorage'
import routes from './routes';
import rootReducer from './reducers/root';

const persistedState = loadState();

export const store = createStore(
  rootReducer,
  persistedState,
  compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);

store.subscribe(() => {
  saveState({
    'auth': store.getState().auth
  })
})

const render = (routes) => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <Router history={browserHistory} routes={routes}/>
      </Provider>
    </AppContainer>,
    document.getElementById('root')
  );
};

render(routes);

if (module.hot) {
  module.hot.accept('./routes', () => {
    render(routes)
  });
}

