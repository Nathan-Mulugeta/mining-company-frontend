import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import {
  closeAlert,
  selectCurrentAlertOpen,
  selectCurrentMessage,
  selectCurrentSeverity,
} from '../slices/alert/alertSlice';
import { useDispatch, useSelector } from 'react-redux';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function CustomizedSnackbars() {
  const open = useSelector(selectCurrentAlertOpen);
  const severity = useSelector(selectCurrentSeverity);
  const message = useSelector(selectCurrentMessage);

  const dispatch = useDispatch();

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    dispatch(closeAlert());
  };

  return (
    <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
      {severity && (
        <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
          {message}
        </Alert>
      )}
    </Snackbar>
  );
}
