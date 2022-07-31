import { useState, SyntheticEvent, FC } from 'react';
import CompInput from '../input';

type Props = {
  specClass?: string;
};

const CompInputEmail: FC<Props> = ({ specClass }) => {
  const [rule] = useState(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  const [isCorrect, setIsCorrect] = useState(true);

  const checkEmail = (
    eventType: string,
    event: SyntheticEvent<EventTarget>,
  ) => {
    if (eventType === 'blur' || eventType === 'Enter') {
      const elem = event.target as HTMLInputElement;
      setIsCorrect(rule.test(elem.value));
      elem.blur();
    }
  };

  return (
    <CompInput specClass={specClass} check={checkEmail} isCorrect={isCorrect} />
  );
};

CompInputEmail.defaultProps = {
  specClass: undefined,
};

export default CompInputEmail;
