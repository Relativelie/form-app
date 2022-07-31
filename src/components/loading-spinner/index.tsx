import { FC } from 'react';
import './styles.scss';

interface Props {
  isLoading: boolean;
}

const LoadingSpinner: FC<Props> = ({ isLoading }) => {
  if (isLoading) {
    return <div className="loading loadingSpinner" />;
  }
  return <div className="loading" />;
};

export default LoadingSpinner;
