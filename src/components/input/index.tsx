import {
  FC,
  MutableRefObject, useRef,
} from 'react';
import classNames from 'classnames';
import './styles.scss';

type Props = {
  specClass?: string;
  check: (...rest) => void;
  isCorrect: boolean
};

const CompInput:FC<Props> = ({ specClass, check, isCorrect }) => {
  const inputValue = useRef() as MutableRefObject<HTMLInputElement>;

  return (
    <input
      className={classNames(specClass !== undefined && specClass, {
        incorrectInputValue: !isCorrect,
      })}
      name="email"
      type="email"
      placeholder="Email"
      ref={inputValue}
      onBlur={(e) => check(e.type, e)}
      onKeyUp={(e) => check(e.key, e)}
    />
  );
};

CompInput.defaultProps = {
  specClass: undefined,
};

export default CompInput;
