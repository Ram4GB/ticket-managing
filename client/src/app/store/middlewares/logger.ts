import { Middleware } from 'redux';

const logger: Middleware<unknown, any, any> = (store) => (next) => (action) => {
  console.log('dispatcher', action);
  next(action);
  console.log(
    `%c state changed ${JSON.stringify(store.getState(), null, 4)}`,
    'background: blue; color: #fff; font-family: Menlo;'
  );
};

export default logger;
