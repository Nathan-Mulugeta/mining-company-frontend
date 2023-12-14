import Box from '@mui/material/Box';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { useDemoData } from '@mui/x-data-grid-generator';
import { useGetTransportationTasksQuery } from '../../slices/transportationTask/transportationTaskApiSlice';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { setLoading } from '../../slices/loading/loadingSlice';

const VISIBLE_FIELDS = ['name', 'rating', 'country', 'dateCreated', 'isAdmin'];

const columns = [
  {
    field: 'scheduledTime',
    headerName: 'Scheduled Date and Time',
    width: 200,
  },
  { field: 'filledBy', headerName: 'Filled By', width: 150 },
  { field: 'source', headerName: 'Source', width: 150 },
  { field: 'destination', headerName: 'Destination', width: 150 },
  { field: 'assignedVehicle', headerName: 'Assigned Vehicle', width: 180 },
  { field: 'assignedDriver', headerName: 'Assigned Driver', width: 180 },
  { field: 'driverPhone', headerName: 'Assigned Driver Phone', width: 180 },
  { field: 'cargoDescription', headerName: 'Cargo Description', width: 200 },
  { field: 'cargoWeight', headerName: 'Cargo Weight', width: 150 },
  { field: 'cargoPricePerTon', headerName: 'Price Per Ton', width: 180 },
  { field: 'completed', headerName: 'Completed', width: 120 },
];

export default function TransportationTaskDataGrid() {
  const { data: tasks, isLoading } = useGetTransportationTasksQuery(
    'transportationTaskList',
    {
      pollingInterval: 60000,
      refetchOnFocus: true,
      refetchOnMountOrArgChange: true,
    }
  );

  // if entities does not exist then default to {}
  const { entities = {} } = tasks || {};

  const prepareTasks = (entitiesObject) => {
    return Object.values(entitiesObject).map((task) => {
      return {
        id: task.id,
        filledBy: task.filledBy.firstname,
        cargoDescription: task.cargo.description,
        cargoWeight: task.cargo.weight,
        cargoPricePerTon: task.cargo.pricePerTon,
        source: task.source.name,
        destination: task.source.name,
        assignedVehicle: task.assignedVehicle.plateNumber,
        assignedDriver: task.assignedDriver.user.firstname,
        driverPhone: task.assignedDriver.phone,
        scheduledTime: new Date(task.scheduledTime).toLocaleString(),
        completed: task.completed,
      };
    });
  };

  const rows = prepareTasks(entities);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setLoading(isLoading));
  }, [dispatch, isLoading]);

  // const { data } = useDemoData({
  //   dataSet: 'Employee',
  //   // visibleFields: VISIBLE_FIELDS,
  //   rowLength: 10,
  // });

  // console.log(data);

  // Otherwise filter will be applied on fields such as the hidden column id
  // const columns = React.useMemo(
  //   () =>
  //     data.columns.filter((column) => VISIBLE_FIELDS.includes(column.field)),
  //   [data.columns]
  // );

  return (
    <Box sx={{ height: 'auto', width: 1 }}>
      {/* <DataGrid
        {...data}
        initialState={{
          ...data.initialState,
          filter: {
            filterModel: {
              items: [],
              quickFilterValues: ['ab'],
            },
          },
        }}
        disableColumnFilter
        disableColumnSelector
        disableDensitySelector
        columns={columns}
        slots={{ toolbar: GridToolbar }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
          },
        }}
      /> */}
      <DataGrid columns={columns} rows={rows} />
    </Box>
  );
}
