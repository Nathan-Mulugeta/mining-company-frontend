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
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Transport task summary
      </Typography>
      <Grid container spacing={2}>
        {Object.entries(formData).map(
          ([key, value]) =>
            key !== 'filledBy' && (
              <Grid item xs={12} sm={key === 'description' ? 12 : 6} key={key}>
                <ListItem disablePadding sx={{ py: 1, px: 0 }}>
                  <ListItemText
                    primary={formatedKeys[key]}
                    secondary={String(value)}
                  />
                </ListItem>
              </Grid>
            )
        )}
      </Grid>
    </React.Fragment>
  );
}
