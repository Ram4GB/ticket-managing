import { Route, Routes } from 'react-router-dom';
import MainLayout from './components/main-layout/main-layout';
import TicketDetail from './sections/ticket-detail';
import TicketList from './sections/ticket-list';
import CreateTicket from './sections/create-ticket';
import { Suspense } from 'react';
import routers from './const/routers';

const App = () => {
  return (
    <MainLayout>
      <Suspense fallback={'loading'}>
        <Routes>
          <Route path={routers.listTicket} element={<TicketList />} />
          <Route path={routers.createTicket} element={<CreateTicket />} />
          <Route path={routers.ticketDetail} element={<TicketDetail />} />
        </Routes>
      </Suspense>
    </MainLayout>
  );
};

export default App;
