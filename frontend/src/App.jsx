import { BrowserRouter as Router, Routes, Route, Outlet, Navigate } from 'react-router-dom';
import { useState } from 'react';
import Sidebar from './components/common/Sidebar';
import Dashboard from './pages/Dashboard';
import Equipment from './pages/Equipment';
import Requests from './pages/Requests';
import Calendar from './pages/Calendar';
import Teams from './pages/Teams';
import Board from './pages/Board';
import Login from './pages/Login';
import Register from './pages/Register';
import { ThemeProvider } from './context/ThemeContext';

const MainLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-slate-950 transition-colors duration-300">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <main
        className={`flex-grow transition-all duration-300 ease-in-out p-6 ${isSidebarOpen ? 'ml-64' : 'ml-20'
          }`}
      >
        <div className="max-w-7xl mx-auto space-y-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Register />} />
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
    </ThemeProvider>
  );
}

export default App;