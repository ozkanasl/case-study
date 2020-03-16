import React, { Component } from "react";

import { Provider } from "react-redux";
import { applyMiddleware, compose, createStore } from "redux";
import { Route, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";
import { routerMiddleware, ConnectedRouter } from "connected-react-router";
import createSagaMiddleware from "redux-saga";

import rootReducer from "./rootReducer";
import rootSaga from "./rootSaga";

import Header from "./components/Header/Header";
import CharacterList from "./containers/CharacterList/CharacterList.container";
import CharacterDetails from "./containers/CharacterDetails/CharacterDetails.container";


const history = createBrowserHistory();
const sagaMiddleware = createSagaMiddleware();

const initialState = {};

export const store = createStore(
  rootReducer(history),
  initialState,
  compose(
    applyMiddleware(
      sagaMiddleware,
      routerMiddleware(history)
    ),
    (
      window.__REDUX_DEVTOOLS_EXTENSION__ &&
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
      window.__REDUX_DEVTOOLS_EXTENSION__()
    )
  )
);

sagaMiddleware.run(rootSaga);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Header />
        <ConnectedRouter history={history}>
          <Switch>
            <Route exact path="/" component={CharacterList} />
            <Route exact path="/:id" component={CharacterDetails} />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
  }
}

export default App;
