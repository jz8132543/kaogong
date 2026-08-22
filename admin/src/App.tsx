import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import QuestionList from './pages/Questions/List';
import QuestionCreate from './pages/Questions/Create';
import Login from './pages/Login';

const AuthGuard = () => {
  const token = localStorage.getItem('admin_token');
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
};

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<AuthGuard />}>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Navigate to="/questions" replace />} />
            <Route path="questions" element={<QuestionList />} />
            <Route path="questions/create" element={<QuestionCreate />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
