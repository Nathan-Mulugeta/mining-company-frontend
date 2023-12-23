import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TransportationTaskForm from '../components/transportationTask/TransportationTaskForm';
import Review from '../components/transportationTask/ReviewTask';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Icon } from '@mui/material';
import useAuth from '../hooks/useAuth';
import { useAddNewTransportationTaskMutation } from '../slices/transportationTask/transportationTaskApiSlice';
import { useDispatch } from 'react-redux';
import { setLoading } from '../slices/loading/loadingSlice';
import { openAlert } from '../slices/alert/alertSlice';
import useTitle from '../hooks/useTitle';

const steps = ['Transport details', 'Review your task'];

export default function TransportationTask() {
  useTitle('Transportation Task');

  const [activeStep, setActiveStep] = React.useState(0);
  const { userId } = useAuth();
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

  React.useEffect(() => {
    setFormData({
      ...formData,
      filledBy: userId,
    });
  }, [userId]);

  const dispatch = useDispatch();

  const [addNewTask, { isLoading, isError, isSuccess, error }] =
    useAddNewTransportationTaskMutation();

  React.useEffect(() => {
    dispatch(setLoading(isLoading));
  }, [dispatch, isLoading]);

  React.useEffect(() => {
    if (isError) {
      dispatch(openAlert({ message: error?.data.message, severity: 'error' }));
    }
  }, [dispatch, isError]);

  const getStepContent = React.useCallback((step) => {
    switch (step) {
      case 0:
        return (
          <TransportationTaskForm
            handleInputChange={handleInputChange}
            formData={formData}
            setFormData={setFormData}
          />
        );
      case 1:
        return <Review formData={formData} />;
      default:
        throw new Error('Unknown step');
    }
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleNext = async () => {
    try {
      if (activeStep === steps.length - 1) {
        const taskData = {
          filledBy: formData.filledBy,
          cargo: {
            description: formData.description,
            weight: formData.weight,
            pricePerTon: formData.pricePerTon,
          },
          source: formData.source,
          destination: formData.destination,
          assignedVehicle: formData.assignedVehicle,
          assignedDriver: formData.assignedDriver,
          scheduledTime: new Date(formData.scheduledTime).toISOString(),
        };

        const response = await addNewTask(taskData);

        // Check the response status and throw an error if it's not successful
        if (response.isError) {
          console.log(response);
          throw new Error(response);
        }

        // If addNewTask succeeds, update the form and step
        setActiveStep(steps.length);
        setFormData({
          ...formData,
          description: '',
          weight: '',
          pricePerTon: '',
          source: '',
          destination: '',
          assignedVehicle: '',
          assignedDriver: '',
          scheduledTime: '',
        });
      } else {
        // Move to the next step
        setActiveStep(activeStep + 1);
      }
    } catch (error) {
      // Handle errors from addNewTask or any other potential errors
      console.error(error);
      // Reset the form or take appropriate error handling steps
      setActiveStep(0);
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const isFormComplete = Object.values(formData).every((data) => data !== '');

  return (
    <React.Fragment>
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper
          variant="outlined"
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
        >
          <Typography component="h1" variant="h4" align="center">
            Transportation task
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? (
            <React.Fragment>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'column',
                }}
              >
                <CheckCircleIcon
                  sx={{ width: 100, height: 100, mb: 3 }}
                  fontSize="large"
                  color="primary"
                />
                <Typography variant="h5" gutterBottom>
                  Your task has been created successfully.
                </Typography>
                <Button onClick={() => setActiveStep(0)}>
                  Create a new task
                </Button>
              </Box>
            </React.Fragment>
          ) : (
            <React.Fragment>
              {getStepContent(activeStep)}
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                {activeStep !== 0 && (
                  <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                    Back
                  </Button>
                )}

                <Button
                  disabled={!isFormComplete}
                  variant="contained"
                  onClick={handleNext}
                  sx={{ mt: 3, ml: 1 }}
                >
                  {activeStep === steps.length - 1
                    ? 'Submit task'
                    : 'Review task'}
                </Button>
              </Box>
            </React.Fragment>
          )}
        </Paper>
      </Container>
    </React.Fragment>
  );
}
