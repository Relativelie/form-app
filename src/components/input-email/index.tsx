import {
  useState, SyntheticEvent, MutableRefObject, useRef,
} from 'react';
import classNames from 'classnames';
import CompInput from '../input';

const CompInputEmail = ({ specClass }) => {
  const [rule] = useState(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  const [isCorrect, setIsCorrect] = useState(true);
//   const inputValue = useRef() as MutableRefObject<HTMLInputElement>;

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
  // <input
  //   className={classNames(specClass !== undefined && specClass, {
  //     incorrectInputValue: !isCorrect,
  //   })}
  //   name="email"
  //   type="email"
  //   placeholder="Email"
  //   ref={inputValue}
  //   onBlur={(e) => checkEmail(e.type, e)}
  //   onKeyUp={(e) => checkEmail(e.key, e)}
  // />
  );
};

export default CompInputEmail;
