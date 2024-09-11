import { ConfigProvider } from 'antd';
import * as ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import App from './app/app';
import store from './app/libs/store';
import FullPageLoading from './app/components/fullpage-loading/fullpage-loading';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <Provider store={store}>
    <ConfigProvider theme={{ token: { colorPrimary: '#00b96b' } }}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ConfigProvider>
    <FullPageLoading />
  </Provider>
);
