import React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import {
  FormControl,
  FormHelperText,
  Input,
  InputAdornment,
} from '@mui/material';

import { DateTimePicker } from '@mui/x-date-pickers';

export default function TransportationTaskForm({
  handleInputChange,
  formData,
  setFormData,
}) {
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
            value={formData.description}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl variant="standard" sx={{ m: 1, mt: 3, width: '25ch' }}>
            <Input
              onChange={handleInputChange}
              value={formData.weight}
              required
              type="number"
              id="weight"
              name="weight"
              fullWidth
              endAdornment={<InputAdornment position="end">ton</InputAdornment>}
            />
            <FormHelperText id="weight">Weight *</FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl variant="standard" sx={{ m: 1, mt: 3, width: '25ch' }}>
            <Input
              onChange={handleInputChange}
              value={formData.pricePerTon}
              required
              type="number"
              id="pricePerTon"
              name="pricePerTon"
              fullWidth
              endAdornment={<InputAdornment position="end">Br.</InputAdornment>}
            />
            <FormHelperText id="pricePerTon">Price Per Ton *</FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            onChange={handleInputChange}
            required
            id="source"
            name="source"
            label="Source"
            fullWidth
            variant="standard"
            value={formData.source}
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
            value={formData.destination}
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
            value={formData.assignedVehicle}
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
            value={formData.assignedDriver}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <DateTimePicker
            onChange={(newValue) => {
              setFormData({
                ...formData,
                scheduledTime: newValue,
              });
            }}
            value={formData.scheduledTime ?? null}
            id="scheduledTime"
            name="scheduledTime"
            label="Scheduled Time"
            variant="standard"
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
