import {
  applyMiddleware,
  combineReducers,
  compose,
  legacy_createStore,
} from 'redux';
import { thunk } from 'redux-thunk';
import {
  MODULE_NAME as MODULE_TICKET,
  default as ticketReducer,
} from '../store/ticket/reducer';

const rootReducer = combineReducers({
  [MODULE_TICKET]: ticketReducer,
});

const composeEnhancers =
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = legacy_createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

export default store;
