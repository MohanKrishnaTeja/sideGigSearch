import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/shared/Navebar';
import Signin from './components/auth/Signin';
import Signup from './components/auth/Signup';
import Home from './components/Home';
import Jobs from './components/Jobs';
import Profile from './components/Profile';
import JobDescription from './components/JobDescription';
import AdminHome from './components/admin/AdminHome';
import AdminJobDescription from './components/admin/AdminJobDescription';
import CreateProfile from './components/CreateProfile';
import LandingPage from './components/LandingPage';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ element }) => {
  const token = useSelector((state) => state.auth.token);
  return token ? element : <Navigate to="/" />;
};

const AppContent = () => {
  const location = useLocation();
  const isLandingPage = location.pathname === '/';

  return (
    <>
      
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/jobs" element={<ProtectedRoute element={<Jobs />} />} />
        <Route path="/profile" element={<ProtectedRoute element={<Profile />} />} />
        <Route path="/jobdescription/:id" element={<ProtectedRoute element={<JobDescription />} />} />
        <Route path="/admin/jobs" element={<ProtectedRoute element={<AdminHome />} />} />
        <Route path="/adminjobdescription/:id" element={<ProtectedRoute element={<AdminJobDescription />} />} />
        <Route path="/create-profile" element={<ProtectedRoute element={<CreateProfile />} />} />
      </Routes>
    </>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;