import { Route, Routes } from 'react-router-dom';
import MainLayout from './components/main-layout/main-layout';
import TicketDetail from './sections/ticket-detail';
import TicketList from './sections/ticket-list';

const App = () => {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<TicketList />} />
        <Route path="/:id" element={<TicketDetail />} />
      </Routes>
    </MainLayout>
  );
};

export default App;
