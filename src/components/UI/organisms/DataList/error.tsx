import { alertTypes } from '@Constants/alertTypes';
import Alert, { AlertTypes } from '../@Components/UI/atoms/Alert';
import './index.less';

interface ListErrorProps extends AlertTypes {
  loading: boolean;
}

const ListError = ({ loading, ...rest }: ListErrorProps) => {
  return (
    <Alert
      message='Error'
      type={alertTypes.ERROR}
      showIcon
      className='mb-md'
      {...rest}
    />
  );
};

export default ListError;
