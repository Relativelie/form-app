import {
  useState, useRef, MutableRefObject,
} from 'react';

const CompInputTel = () => {
  const [phone, setPhone] = useState('');
  const [isErrorPhone, setIsErrorPhone] = useState('');
  const inputPhone = useRef() as MutableRefObject<HTMLInputElement>;

  const validatePhone = (eventType: string) => {
    if (eventType === 'blur' || eventType === 'Enter') {
      const phoneNumber = parseInt(phone, 10);
      if (phoneNumber.toString().length !== 11) { setIsErrorPhone('incorrectInputValue'); } else setIsErrorPhone('');
    }
  };

  const phoneChange = () => {
    const phoneValue = inputPhone.current.value
      .replace(/\D/g, '')
      .match(/(\d{0,1})(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})/);
    if (phoneValue !== null) {
      inputPhone.current.value = !phoneValue[2]
        ? phoneValue[1]
        : `${phoneValue[1]} (${phoneValue[2]}${`${
          phoneValue[3] ? `)-${phoneValue[3]}` : ''
        }`}${`${phoneValue[4] ? `-${phoneValue[4]}` : ''}`}${`${
          phoneValue[5] ? `-${phoneValue[5]}` : ''
        }`}`;

      const numbers = inputPhone.current.value.replace(/(\D)/g, '');
      setPhone(numbers);
    }
  };

  return (
    <input
      className={`feedback_input ${isErrorPhone}`}
      type="text"
      data-testid="form-field-tel"
      ref={inputPhone}
      onChange={phoneChange}
      placeholder="Телефон"
      onBlur={(e) => validatePhone(e.type)}
      onKeyUp={(e) => validatePhone(e.key)}
    />
  );
};

export default CompInputTel;
