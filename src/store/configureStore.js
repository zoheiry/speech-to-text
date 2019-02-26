import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import thunk from 'redux-thunk';
import api from '../api';
import user from '../reducers/user';
import recordings from '../reducers/recordings';

const rootReducer = combineReducers({
  user,
  recordings,
});

export default function configureStore() {
  const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk.withExtraArgument(api)))
  );

  return store;
}
