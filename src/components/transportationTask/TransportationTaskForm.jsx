import React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import {
  Autocomplete,
  FormControl,
  FormHelperText,
  Input,
  InputAdornment,
} from '@mui/material';
import { useGetSitesQuery } from '../../slices/sites/sitesApiSlice';
import { useGetVehiclesQuery } from '../../slices/vehicle/vehiclesApiSlice';
import { useGetDriversQuery } from '../../slices/driver/driversApiSlice';
import { DateTimePicker } from '@mui/x-date-pickers';

export default function TransportationTaskForm({
  handleInputChange,
  formData,
  setFormData,
}) {
  const sitesResults = useGetSitesQuery('sitesList', {
    pollingInterval: 60000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  const vehiclesResults = useGetVehiclesQuery('vehiclesList', {
    pollingInterval: 60000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  const driversResults = useGetDriversQuery('driversList', {
    pollingInterval: 60000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  const { entities: sitesEntries = {} } = sitesResults.data || {};
  const { entities: vehiclesEntries = {} } = vehiclesResults.data || {};
  const { entities: driversEntries = {} } = driversResults.data || {};

  const sites = Object.values(sitesEntries).map((entry) => {
    return { id: entry.id, label: entry.name };
  });

  const drivers = Object.values(driversEntries).map((entry) => {
    return { id: entry.id, label: `${entry.user.firstname} - ${entry.phone}` };
  });

  const vehicles = Object.values(vehiclesEntries).map((entry) => {
    return {
      id: entry.id,
      label: `${entry.vehicleType} - ${entry.plateNumber}`,
    };
  });

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
          <Autocomplete
            id="source"
            options={sites}
            onChange={(event, newValue) => {
              setFormData({ ...formData, source: newValue });
            }}
            value={formData.source?.label ?? ''}
            renderInput={(params) => (
              <TextField
                name="source"
                {...params}
                label="Source"
                variant="standard"
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Autocomplete
            id="destination"
            options={sites}
            onChange={(event, newValue) => {
              setFormData({ ...formData, destination: newValue });
            }}
            value={formData.destination?.label ?? ''}
            renderInput={(params) => (
              <TextField
                name="destination"
                {...params}
                label="Destination"
                variant="standard"
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Autocomplete
            id="assignedVehicle"
            options={vehicles}
            onChange={(event, newValue) => {
              setFormData({ ...formData, assignedVehicle: newValue });
            }}
            value={formData.assignedVehicle?.label || ''}
            renderInput={(params) => (
              <TextField
                name="assignedVehicle"
                {...params}
                label="Assigned Vehicle"
                variant="standard"
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Autocomplete
            id="assignedDriver"
            options={drivers}
            onChange={(event, newValue) => {
              setFormData({ ...formData, assignedDriver: newValue });
            }}
            value={formData.assignedDriver?.label ?? ''}
            renderInput={(params) => (
              <TextField
                name="assignedDriver"
                {...params}
                label="Assigned Driver"
                variant="standard"
              />
            )}
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
