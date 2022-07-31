import {
  useState, SyntheticEvent, FC, useRef, MutableRefObject,
} from 'react';
import CompInput from '../input';

type Props = {
  specClass?: string;
};

const CompInputName: FC<Props> = ({ specClass }) => {
  const [isCorrect, setIsCorrect] = useState(true);
  const inputValue = useRef() as MutableRefObject<HTMLInputElement>;
  const errorText = 'First and last names must be at least 3 and no more than 30 characters';

  const checkName = (eventType: string, event: SyntheticEvent<EventTarget>) => {
    if (eventType === 'blur' || eventType === 'Enter') {
      const elem = event.target as HTMLInputElement;
      const arrayInputValue = elem.value.trim().split(' ');
      if (arrayInputValue.length > 2 || arrayInputValue.length < 2) {
        setIsCorrect(false);
      } else if (
        arrayInputValue[0].length < 3
        || arrayInputValue[0].length > 30
        || arrayInputValue[1].length < 3
        || arrayInputValue[1].length > 30
      ) {
        setIsCorrect(false);
      } else {
        setIsCorrect(true);
      }
      elem.blur();
    }
  };

  const onChangeName = () => {
    inputValue.current.value = inputValue.current.value.toUpperCase();
  };

  return (
    <CompInput
      specClass={specClass}
      refValue={inputValue}
      check={checkName}
      isCorrect={isCorrect}
      inputName="text"
      placeholder="First and Last name"
      onChange={onChangeName}
      errorText={!isCorrect ? errorText : undefined}
    />
  );
};

CompInputName.defaultProps = {
  specClass: undefined,
};

export default CompInputName;
