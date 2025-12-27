import { BrowserRouter as Router, Routes, Route, Outlet, Navigate } from 'react-router-dom';
import Sidebar from './components/common/Slidebar';
import Dashboard from './pages/Dashboard';
import Equipment from './pages/Equipment';
import Requests from './pages/Requests';
import Calendar from './pages/Calendar';
import Teams from './pages/Teams';
import Board from './pages/Board';
import Login from './pages/Login';

const MainLayout = () => (
  <div className="flex h-screen bg-gray-50">
    <Sidebar />
    <main className="flex-grow ml-64">
      <Outlet />
    </main>
  </div>
);

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/equipment" element={<Equipment />} />
          <Route path="/requests" element={<Requests />} />
          <Route path="/board" element={<Board />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/teams" element={<Teams />} />
        </Route>
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;