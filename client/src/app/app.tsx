import { Route, Routes } from 'react-router-dom';
import MainLayout from './components/main-layout/main-layout';
import TicketDetail from './sections/ticket-detail';
import TicketList from './sections/ticket-list';
import CreateTicket from './sections/create-ticket';
import { Suspense } from 'react';

const App = () => {
  return (
    <MainLayout>
      <Suspense fallback={'loading'}>
        <Routes>
          <Route path="/" element={<TicketList />} />
          <Route path="/ticket/new" element={<CreateTicket />} />
          <Route path="/ticket/:id" element={<TicketDetail />} />
        </Routes>
      </Suspense>
    </MainLayout>
  );
};

export default App;
