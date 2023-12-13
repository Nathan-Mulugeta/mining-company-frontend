import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { useSelector } from 'react-redux';
import { selectCurrentLoading } from '../slices/loading/loadingSlice';

export default function Loading() {
  const loading = useSelector(selectCurrentLoading);

  return (
    <Backdrop
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={loading}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}
