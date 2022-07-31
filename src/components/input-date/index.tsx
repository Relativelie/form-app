import { useState, useEffect, FormEvent } from 'react';
import './styles.scss';

const current = new Date();
export const currentDate = current.getDate();
export const currentMonth = current.getMonth() + 1;
export const currentYear = current.getFullYear();

const CompInputDate = ({ specClass }) => {
  const [selectedDate, setSelectedDate] = useState('');

  const checkMonthAndDay = (value: number) => (value.toString().length === 2 ? value : `0${value}`);
  const adulthood = `${currentYear - 18}-${checkMonthAndDay(
    currentMonth,
  )}-${checkMonthAndDay(currentDate)}`;

  useEffect(() => {
    setSelectedDate(adulthood);
  }, []);

  const selectDate = (e: FormEvent<HTMLInputElement>) => {
    const elem = e.target as HTMLInputElement;
    const selectedValue = elem.valueAsDate;
    if (selectedValue !== null) {
      const myMonth = selectedValue.getMonth() + 1;
      const selectedMonth = checkMonthAndDay(myMonth);
      const selectedDay = checkMonthAndDay(selectedValue.getDate());
      const result = `${selectedValue.getFullYear()}-${selectedMonth}-${selectedDay}`;
      setSelectedDate(result);
    }
  };

  return (
    <input
      className="feedback_input"
      name="date"
      type="date"
      value={selectedDate}
      onChange={(e) => selectDate(e)}
      onKeyPress={(e) => {
        e.preventDefault();
      }}
      min={`${currentYear - 150}-${checkMonthAndDay(
        currentMonth,
      )}-${currentDate}`}
      max={adulthood}
    />
  );
};

export default CompInputDate;
