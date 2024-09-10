import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContexet';

const PrivateRouter = ({ element }) => {
  const { isLoggedIn } = useAuth();

  return isLoggedIn ? element : <Navigate to="/login" />;
};

export default PrivateRouter;
