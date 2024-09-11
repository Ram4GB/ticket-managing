import {
  TypedUseSelectorHook,
  useDispatch,
  useSelector,
  useStore,
} from 'react-redux';
import {
  Action,
  applyMiddleware,
  combineReducers,
  compose,
  legacy_createStore,
  UnknownAction,
} from 'redux';
import { thunk, ThunkDispatch } from 'redux-thunk';
import {
  MODULE_NAME as MODULE_TICKET,
  default as ticketReducer,
} from '../store/ticket/reducer';
import {
  MODULE_NAME as MODULE_USER,
  default as userReducer,
} from '../store/user/reducer';
import {
  MODULE_NAME as MODULE_GLOBAL,
  default as globalReducer,
} from '../store/global/reducer';

const rootReducer = combineReducers({
  [MODULE_TICKET]: ticketReducer,
  [MODULE_USER]: userReducer,
  [MODULE_GLOBAL]: globalReducer,
});

const composeEnhancers =
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = legacy_createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

// Get the type of our store variable
export type AppStore = typeof store;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = ThunkDispatch<RootState, unknown, any>;

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppStore: () => AppStore = useStore;

export type ThunkAction<
  R, // Return type of the thunk function
  S, // state type used by getState
  E, // any "extra argument" injected into the thunk
  A extends Action // known types of actions that can be dispatched
> = (
  dispatch: ThunkDispatch<S, E, A>,
  getState: () => S,
  extraArgument: E
) => R;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  any,
  UnknownAction
>;

export default store;
