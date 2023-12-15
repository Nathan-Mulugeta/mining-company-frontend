import * as React from 'react';
import Typography from '@mui/material/Typography';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import { useNavigate, useParams } from 'react-router-dom';
import {
  useDeleteTransportationTaskMutation,
  useGetTransportationTasksQuery,
} from '../slices/transportationTask/transportationTaskApiSlice';
import { Box, Button, Container, Paper } from '@mui/material';
import { useDispatch } from 'react-redux';
import { setLoading } from '../slices/loading/loadingSlice';
import { openAlert } from '../slices/alert/alertSlice';

const formatedKeys = {
  description: 'Description',
  weight: 'Weight',
  pricePerTon: 'Price Per Ton',
  source: 'Source',
  destination: 'Destination',
  assignedVehicle: 'Assigned Vehicle',
  assignedDriver: 'Assigned Driver',
  scheduledTime: 'Scheduled Time',
  filledBy: 'Filled By',
  createdAt: 'Created At',
  completed: 'Completed',
};

export default function TaskReport() {
  const { id } = useParams();

  const { task } = useGetTransportationTasksQuery('transportationTaskList', {
    selectFromResult: ({ data }) => ({
      task: data?.entities[id],
    }),
  });

  const [deleteTask, { isLoading: isDeleteLoading }] =
    useDeleteTransportationTaskMutation();

  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      await deleteTask({ id });
      dispatch(
        openAlert({
          message: 'Successfully deleted task.',
          severity: 'success',
        })
      );
      navigate('/report');
    } catch (error) {
      console.log(error);
    }
  };

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(setLoading(isDeleteLoading));
  }, [dispatch, isDeleteLoading]);

  const {
    cargo,
    completed,
    createdAt,
    filledBy,
    scheduledTime,
    source,
    destination,
    assignedVehicle,
    assignedDriver,
  } = task;

  return (
    <React.Fragment>
      <Paper
        variant="outlined"
        sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
      >
        <Container component="main" maxWidth="lg" sx={{ mb: 4 }}>
          <Typography variant="h3" gutterBottom>
            Transport task
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <ListItem disablePadding sx={{ py: 1, px: 0 }}>
                <ListItemText
                  primary={formatedKeys.description}
                  secondary={cargo.description}
                />
              </ListItem>
            </Grid>
            <Grid item xs={12} sm={6}>
              <ListItem disablePadding sx={{ py: 1, px: 0 }}>
                <ListItemText
                  primary={formatedKeys.weight}
                  secondary={String(cargo.weight)}
                />
              </ListItem>
            </Grid>
            <Grid item xs={12} sm={6}>
              <ListItem disablePadding sx={{ py: 1, px: 0 }}>
                <ListItemText
                  primary={formatedKeys.pricePerTon}
                  secondary={String(cargo.pricePerTon)}
                />
              </ListItem>
            </Grid>
            <Grid item xs={12} sm={6}>
              <ListItem disablePadding sx={{ py: 1, px: 0 }}>
                <ListItemText
                  primary={formatedKeys.source}
                  secondary={String(source.name)}
                />
              </ListItem>
            </Grid>
            <Grid item xs={12} sm={6}>
              <ListItem disablePadding sx={{ py: 1, px: 0 }}>
                <ListItemText
                  primary={formatedKeys.destination}
                  secondary={String(destination.name)}
                />
              </ListItem>
            </Grid>
            <Grid item xs={12} sm={6}>
              <ListItem disablePadding sx={{ py: 1, px: 0 }}>
                <ListItemText
                  primary={formatedKeys.assignedVehicle}
                  secondary={String(
                    `${assignedVehicle.vehicleType} - ${assignedVehicle.plateNumber}`
                  )}
                />
              </ListItem>
            </Grid>
            <Grid item xs={12} sm={6}>
              <ListItem disablePadding sx={{ py: 1, px: 0 }}>
                <ListItemText
                  primary={formatedKeys.assignedDriver}
                  secondary={String(assignedDriver.user.firstname)}
                />
              </ListItem>
            </Grid>
            <Grid item xs={12} sm={6}>
              <ListItem disablePadding sx={{ py: 1, px: 0 }}>
                <ListItemText
                  primary={formatedKeys.scheduledTime}
                  secondary={new Date(scheduledTime).toLocaleString()}
                />
              </ListItem>
            </Grid>
            <Grid item xs={12} sm={6}>
              <ListItem disablePadding sx={{ py: 1, px: 0 }}>
                <ListItemText
                  primary={formatedKeys.completed}
                  secondary={String(completed)}
                />
              </ListItem>
            </Grid>
            <Grid item xs={12} sm={6}>
              <ListItem disablePadding sx={{ py: 1, px: 0 }}>
                <ListItemText
                  primary={formatedKeys.createdAt}
                  secondary={new Date(createdAt).toLocaleString()}
                />
              </ListItem>
            </Grid>
            <Grid item xs={12} sm={6}>
              <ListItem disablePadding sx={{ py: 1, px: 0 }}>
                <ListItemText
                  primary={formatedKeys.filledBy}
                  secondary={String(filledBy.firstname)}
                />
              </ListItem>
            </Grid>
          </Grid>
          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
            <Button onClick={handleDelete} variant="contained" color="error">
              Delete Task
            </Button>
          </Box>
        </Container>
      </Paper>
    </React.Fragment>
  );
}
