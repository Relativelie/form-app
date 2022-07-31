import { FC, MutableRefObject } from 'react';
import classNames from 'classnames';
import './styles.scss';

type Props = {
  specClass?: string;
  check: (...rest: any) => void;
  onChange?: () => void;
  isCorrect: boolean;
  inputName: string;
  placeholder: string;
  refValue: MutableRefObject<HTMLInputElement>;
  errorText?: string;
};

const CompInput: FC<Props> = ({
  specClass,
  check,
  isCorrect,
  inputName,
  placeholder,
  refValue,
  onChange,
  errorText,
}) => (
  <div>
    <div className="input-container">
      <input
        className={classNames(
          specClass !== undefined && specClass,
          'input-field',
          {
            '__wrong-value': !isCorrect,
          },
        )}
        id={placeholder}
        name={inputName}
        type={inputName}
        placeholder={placeholder}
        ref={refValue}
        onBlur={(e) => check(e.type, e)}
        onKeyUp={(e) => check(e.key, e)}
        onChange={onChange}
      />
      <label
        htmlFor={placeholder}
        className="input-label"
      >
        {placeholder}
      </label>
    </div>

    {errorText !== undefined && <p className="input-error-text">{errorText}</p>}
  </div>
);

CompInput.defaultProps = {
  specClass: undefined,
  onChange: undefined,
  errorText: undefined,
};

export default CompInput;
