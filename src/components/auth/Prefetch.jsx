import { store } from '../../../store';
import { transportationTasksApiSlice } from '../../slices/transportationTask/transportationTaskApiSlice';
import { usersApiSlice } from '../../slices/users/usersApiSlice';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { analystsApiSlice } from '../../slices/analyst/analystsApiSlice';
import { adminsApiSlice } from '../../slices/admin/adminsApiSlice';

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

    store.dispatch(
      analystsApiSlice.util.prefetch('getAnalysts', 'analystsList', {
        force: true,
      })
    );

    store.dispatch(
      adminsApiSlice.util.prefetch('getAdmins', 'adminsList', {
        force: true,
      })
    );
  }, []);

  return <Outlet />;
};
export default Prefetch;
