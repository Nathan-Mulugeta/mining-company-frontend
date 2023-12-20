import TransportationTaskDataGrid from '../components/transportationTask/TransportationTaskDataGrid';
import useTitle from '../hooks/useTitle';

const Report = () => {
  useTitle('Report');
  return <TransportationTaskDataGrid />;
};

export default Report;
