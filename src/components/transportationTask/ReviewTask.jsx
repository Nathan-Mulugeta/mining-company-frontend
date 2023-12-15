import * as React from 'react';
import Typography from '@mui/material/Typography';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';

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
};

export default function Review({ formData }) {
  const {
    description,
    weight,
    pricePerTon,
    source,
    destination,
    assignedVehicle,
    assignedDriver,
  } = formData;

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Transport task summary
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12}>
          <ListItem disablePadding sx={{ py: 1, px: 0 }}>
            <ListItemText
              primary={formatedKeys.description}
              secondary={description}
            />
          </ListItem>
        </Grid>
        <Grid item xs={12} sm={6}>
          <ListItem disablePadding sx={{ py: 1, px: 0 }}>
            <ListItemText
              primary={formatedKeys.weight}
              secondary={String(weight)}
            />
          </ListItem>
        </Grid>
        <Grid item xs={12} sm={6}>
          <ListItem disablePadding sx={{ py: 1, px: 0 }}>
            <ListItemText
              primary={formatedKeys.pricePerTon}
              secondary={String(pricePerTon)}
            />
          </ListItem>
        </Grid>
        <Grid item xs={12} sm={6}>
          <ListItem disablePadding sx={{ py: 1, px: 0 }}>
            <ListItemText
              primary={formatedKeys.source}
              secondary={String(source.label)}
            />
          </ListItem>
        </Grid>
        <Grid item xs={12} sm={6}>
          <ListItem disablePadding sx={{ py: 1, px: 0 }}>
            <ListItemText
              primary={formatedKeys.destination}
              secondary={String(destination.label)}
            />
          </ListItem>
        </Grid>
        <Grid item xs={12} sm={6}>
          <ListItem disablePadding sx={{ py: 1, px: 0 }}>
            <ListItemText
              primary={formatedKeys.assignedVehicle}
              secondary={String(assignedVehicle.label)}
            />
          </ListItem>
        </Grid>
        <Grid item xs={12} sm={6}>
          <ListItem disablePadding sx={{ py: 1, px: 0 }}>
            <ListItemText
              primary={formatedKeys.assignedDriver}
              secondary={String(assignedDriver.label)}
            />
          </ListItem>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
