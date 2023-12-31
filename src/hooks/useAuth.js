import { useSelector } from 'react-redux';
import { selectCurrentToken } from '../slices/auth/authSlice';
import { jwtDecode } from 'jwt-decode';

const useAuth = () => {
  const token = useSelector(selectCurrentToken);
  let isManager = false;
  let isAdmin = false;
  let isAnalyst = false;
  let status = 'Employee';
  let isExpired = false;

  if (token) {
    const decoded = jwtDecode(token);
    const { username, roles, id } = decoded.UserInfo;

    const currentTime = Math.floor(Date.now() / 1000);
    isExpired = currentTime > decoded.exp;

    if (isExpired)
      return { username: '', roles: [], isManager, isAdmin, status };

    isManager = roles.includes('Manager');
    isAdmin = roles.includes('Admin');
    isAnalyst = roles.includes('Analyst');

    if (isManager) status = 'Manager';
    if (isAdmin) status = 'Admin';
    if (isAnalyst) status = 'Analyst';

    return { username, roles, status, isManager, isAdmin, userId: id };
  }

  return { username: '', roles: [], isManager, isAdmin, isAnalyst, status };
};
export default useAuth;
