import {
  useState, useRef, MutableRefObject, FC,
} from 'react';
import CompInput from '../input';

type Props = {
  specClass?: string
};

const CompInputTel:FC<Props> = ({ specClass }) => {
  const [isCorrect, setIsCorrect] = useState(true);
  const inputValue = useRef() as MutableRefObject<HTMLInputElement>;
  const errorText = 'Enter an valid phone e.g. +7 123 456 45 45';

  const validatePhone = (eventType: string) => {
    if (eventType === 'blur' || eventType === 'Enter') {
      const numbers = inputValue.current.value.replace(/(\D)/g, '');

      const phoneNumber = parseInt(numbers.substring(1), 10);
      if (phoneNumber.toString().length !== 10) {
        setIsCorrect(false);
      } else setIsCorrect(true);
    }
  };

  const checkTelBlock = (value: string) => {
    if (value === '') return '';
    return ` ${value}`;
  };

  const onChangePhone = () => {
    let telValue;
    if (inputValue.current.value[0] === '+') {
      telValue = inputValue.current.value.substring(2);
    } else telValue = inputValue.current.value;
    const phoneValue = telValue
      .replace(/\D/g, '')
      .match(/(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})/);

    if (phoneValue !== null) {
      const convertTelValue = `+7${checkTelBlock(phoneValue[1])}${checkTelBlock(
        phoneValue[2],
      )}${checkTelBlock(phoneValue[3])}${checkTelBlock(phoneValue[4])}`;
      if (convertTelValue.length === 2) {
        inputValue.current.value = '';
      } else inputValue.current.value = convertTelValue;
    }
  };

  return (
    <CompInput
      specClass={specClass}
      refValue={inputValue}
      check={validatePhone}
      onChange={onChangePhone}
      isCorrect={isCorrect}
      inputName="text"
      placeholder="Telephone"
      errorText={!isCorrect ? errorText : undefined}
    />
  );
};

CompInputTel.defaultProps = {
  specClass: undefined,
};

export default CompInputTel;
