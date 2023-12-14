import { store } from '../../../store';
import { transportationTasksApiSlice } from '../../slices/transportationTask/transportationTaskApiSlice';
import { usersApiSlice } from '../../slices/users/usersApiSlice';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

const Prefetch = () => {
  useEffect(() => {
    store.dispatch(
      usersApiSlice.util.prefetch('getUsers', 'usersList', { force: true })
    );
    store.dispatch(
      transportationTasksApiSlice.util.prefetch(
        'getTransportationTasks',
        'transportationTaskList',
        { force: true }
      )
    );
  }, []);

  return <Outlet />;
};
export default Prefetch;
