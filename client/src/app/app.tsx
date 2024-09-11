import { ConfigProvider } from 'antd';
import { Route, Routes } from 'react-router-dom';
import styles from './app.module.css';
import MainLayout from './components/main-layout/main-layout';
import TicketDetail from './sections/ticket-detail';
import TicketList from './sections/ticket-list';

const App = () => {
  return (
    <div className={styles['app']}>
      <ConfigProvider theme={{ token: { colorPrimary: '#00b96b' } }}>
        <MainLayout>
          <Routes>
            <Route path="/" element={<TicketList />} />
            <Route path="/:id" element={<TicketDetail />} />
          </Routes>
        </MainLayout>
      </ConfigProvider>
    </div>
  );
};

export default App;
