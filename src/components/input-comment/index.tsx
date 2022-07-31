import {
  useState, FC, useRef, MutableRefObject,
} from 'react';
import CompInput from '../input';

type Props = {
  specClass?: string;
};

const CompInputComment: FC<Props> = ({ specClass }) => {
  const [isCorrect, setIsCorrect] = useState(true);
  const inputValue = useRef() as MutableRefObject<HTMLInputElement>;

  const checkComment = (
    eventType: string,
  ) => {
    if (eventType === 'blur' || eventType === 'Enter') {
      if (
        inputValue.current.value.length < 10
        || inputValue.current.value.length > 300
      ) {
        setIsCorrect(false);
      } else setIsCorrect(true);
    }
  };

  return (
    <CompInput
      specClass={specClass}
      refValue={inputValue}
      check={checkComment}
      isCorrect={isCorrect}
      inputName="text"
      placeholder=""
    />
  );
};

CompInputComment.defaultProps = {
  specClass: undefined,
};

export default CompInputComment;
