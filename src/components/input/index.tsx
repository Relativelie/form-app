import {
  FC,
  MutableRefObject,
} from 'react';
import classNames from 'classnames';
import './styles.scss';

type Props = {
  specClass?: string;
  check: (...rest) => void;
  onChange?: () => void;
  isCorrect: boolean;
  inputName: string;
  placeholder: string;
  refValue: MutableRefObject<HTMLInputElement>;
};

const CompInput:FC<Props> = ({
  specClass, check, isCorrect, inputName, placeholder, refValue, onChange
}) => (
  <input
    className={classNames(specClass !== undefined && specClass, {
      incorrectInputValue: !isCorrect,
    })}
    name={inputName}
    type={inputName}
    placeholder={placeholder}
    ref={refValue}
    onBlur={(e) => check(e.type, e)}
    onKeyUp={(e) => check(e.key, e)}
    onChange={onChange}
  />
);

CompInput.defaultProps = {
  specClass: undefined,
  onChange: undefined,
};

export default CompInput;
