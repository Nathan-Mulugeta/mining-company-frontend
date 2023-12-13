import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import {
  FormControl,
  FormHelperText,
  Input,
  InputAdornment,
} from '@mui/material';

export default function TransportationTaskForm() {
  const [formData, setFormData] = React.useState({
    description: '',
    weight: '',
    pricePerTon: '',
    source: '',
    destination: '',
    assignedVehicle: '',
    assignedDriver: '',
    scheduledTime: '',
    filledBy: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Transport details
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            onChange={handleInputChange}
            required
            id="description"
            name="description"
            label="Description"
            fullWidth
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl variant="standard" sx={{ m: 1, mt: 3, width: '25ch' }}>
            <Input
              onChange={handleInputChange}
              required
              type="number"
              id="standard-adornment-weight"
              name="weight"
              endAdornment={<InputAdornment position="end">ton</InputAdornment>}
            />
            <FormHelperText id="weight">Weight *</FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            onChange={handleInputChange}
            required
            type="number"
            id="pricePerTon"
            name="pricePerTon"
            label="Price Per Ton"
            fullWidth
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            onChange={handleInputChange}
            required
            id="Source"
            name="Source"
            label="Source"
            fullWidth
            autoComplete="shipping address-line2"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            onChange={handleInputChange}
            required
            id="destination"
            name="destination"
            label="Destination"
            fullWidth
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            onChange={handleInputChange}
            required
            id="assignedVehicle"
            name="assignedVehicle"
            label="Assigned Vehicle"
            fullWidth
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            onChange={handleInputChange}
            required
            id="assignedDriver"
            name="assignedDriver"
            label="Assigned Driver"
            fullWidth
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            onChange={handleInputChange}
            required
            id="scheduledTime"
            name="scheduledTime"
            label="Scheduled Time"
            fullWidth
            variant="standard"
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
