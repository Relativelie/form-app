import { FC, MouseEvent } from 'react';
import './styles.scss';

type Props = {
  onClick: (arg1: MouseEvent<HTMLButtonElement>) => void;
  title: string;
};

const CompButton: FC<Props> = ({ onClick, title }) => (
  <button type="button" className="btn" onClick={(e) => onClick(e)}>
    {title}
  </button>
);

export default CompButton;
