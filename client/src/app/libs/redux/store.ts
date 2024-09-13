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
} from '../../store/ticket/reducer';
import {
  MODULE_NAME as MODULE_USER,
  default as userReducer,
} from '../../store/user/reducer';
import {
  MODULE_NAME as MODULE_GLOBAL,
  default as globalReducer,
} from '../../store/global/reducer';
import logger from '../../store/middlewares/logger';

const rootReducer = combineReducers({
  [MODULE_TICKET]: ticketReducer,
  [MODULE_USER]: userReducer,
  [MODULE_GLOBAL]: globalReducer,
});

const composeEnhancers =
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = legacy_createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk, logger))
);

export default store;
