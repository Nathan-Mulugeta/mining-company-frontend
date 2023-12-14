import { store } from '../../../store';
import { sitesApiSlice } from '../../slices/sites/sitesApiSlice';
import { transportationTasksApiSlice } from '../../slices/transportationTask/transportationTaskApiSlice';
import { usersApiSlice } from '../../slices/users/usersApiSlice';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { vehiclesApiSlice } from '../../slices/vehicle/vehiclesApiSlice';
import { driversApiSlice } from '../../slices/driver/driversApiSlice';

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
      sitesApiSlice.util.prefetch('getSites', 'sitesList', { force: true })
    );

    store.dispatch(
      vehiclesApiSlice.util.prefetch('getVehicles', 'vehiclesList', {
        force: true,
      })
    );

    store.dispatch(
      driversApiSlice.util.prefetch('getDrivers', 'driversList', {
        force: true,
      })
    );
  }, []);

  return <Outlet />;
};
export default Prefetch;
