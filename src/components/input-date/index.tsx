import classNames from 'classnames';
import {
  useState, useEffect, FormEvent, FC,
} from 'react';
import './styles.scss';

const current = new Date();
export const currentDate = current.getDate();
export const currentMonth = current.getMonth() + 1;
export const currentYear = current.getFullYear();

type Props = {
  specClass?: string;
};

const CompInputDate: FC<Props> = ({ specClass }) => {
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
    <div className="date-input-container">
      <label htmlFor="birthday-id" className="input-label input-label_visible">
        Birthday
      </label>
      <input
        id="birthday-id"
        className={classNames(
          specClass !== undefined && specClass,
          'date__input',
        )}
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
    </div>
  );
};

CompInputDate.defaultProps = {
  specClass: undefined,
};

export default CompInputDate;
