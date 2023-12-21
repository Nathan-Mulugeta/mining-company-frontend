import * as React from 'react';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AssessmentIcon from '@mui/icons-material/Assessment';
import FireTruckIcon from '@mui/icons-material/FireTruck';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import { useSendLogoutMutation } from '../../slices/auth/authApiSlice';
import { useDispatch } from 'react-redux';
import { openAlert } from '../../slices/alert/alertSlice';
import { useEffect } from 'react';
import { setLoading } from '../../slices/loading/loadingSlice';
import useAuth from '../../hooks/useAuth';

export default function SideNav({ toggleDrawer: drawerToggle, drawerOpen }) {
  const { roles } = useAuth();

  let availableRoutes = [];

  if (roles.includes('Admin')) {
    availableRoutes = [
      { text: 'Report', route: '/report' },
      { text: 'Create a transport', route: '/transportation-task' },
    ];
  } else if (roles.includes('Manager')) {
    availableRoutes = [{ text: 'Report', route: '/report' }];
  } else if (roles.includes('Analyst')) {
    availableRoutes = [
      { text: 'Create a transport', route: '/transportation-task' },
    ];
  }

  const toggleDrawer = (event) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    drawerToggle();
  };

  const navigate = useNavigate();
  const [logout, { isLoading }] = useSendLogoutMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setLoading(isLoading));
  }, [dispatch, isLoading]);

  const handleClick = async (text) => {
    if (text === 'My account') {
      navigate('/account');
      return;
    }

    if (text === 'Log out') {
      try {
        await logout();
        dispatch(
          openAlert({
            message: 'Successfully logged out',
            severity: 'success',
          })
        );
        navigate('/sign-in');
      } catch (error) {
        dispatch(
          openAlert({
            message: `Could not log out. ${error.message}`,
            severity: 'error',
          })
        );
      }
    }
  };

  const list = () => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer}
      onKeyDown={toggleDrawer}
    >
      <List>
        {availableRoutes.map(({ text, route }) => (
          <ListItem key={text} disablePadding>
            <ListItemButton to={route}>
              <ListItemIcon>
                {text === 'Report' ? <AssessmentIcon /> : <FireTruckIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      {availableRoutes.length !== 0 && <Divider />}
      <List>
        {['My account', 'Log out'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton onClick={() => handleClick(text)}>
              <ListItemIcon>
                {text === 'My account' ? <AccountCircleIcon /> : <LogoutIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      <React.Fragment>
        <SwipeableDrawer
          anchor="left"
          open={drawerOpen}
          onClose={toggleDrawer}
          onOpen={toggleDrawer}
        >
          {list()}
        </SwipeableDrawer>
      </React.Fragment>
    </div>
  );
}
