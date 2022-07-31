import {
  useState, SyntheticEvent, FC, useRef, MutableRefObject,
} from 'react';
import CompInput from '../input';

type Props = {
  specClass?: string;
};

const CompInputEmail: FC<Props> = ({ specClass }) => {
  const [rule] = useState(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  const [isCorrect, setIsCorrect] = useState(true);
  const inputValue = useRef() as MutableRefObject<HTMLInputElement>;
  const errorText = 'Enter an email in the format email@email.ww';

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
    <CompInput
      specClass={specClass}
      refValue={inputValue}
      check={checkEmail}
      isCorrect={isCorrect}
      inputName="email"
      placeholder="Email"
      errorText={!isCorrect ? errorText : undefined}
    />
  );
};

CompInputEmail.defaultProps = {
  specClass: undefined,
};

export default CompInputEmail;
