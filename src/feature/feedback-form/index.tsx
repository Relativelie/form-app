import { MouseEvent, useState } from 'react';
import 'regenerator-runtime/runtime';
import 'core-js/stable';

import './styles.scss';
import LoadingSpinner from '../../components/loading-spinner';
import CompInputEmail from '../../components/input-email';
import CompInputTel from '../../components/input-tel/index.';
import CompInputDate from '../../components/input-date';
import CompInputName from '../../components/input-name';

const Feedback = () => {
  const [clarifyingText, setClarifyingText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const sendFeedbackDetails = async (e: MouseEvent<HTMLButtonElement>) => {
    const elem = e.target as HTMLFormElement;
    if (checkValues(elem)) {
      const inputValues = {
        email: elem.form[0].value,
        tel: elem.form[1].value,
        date: elem.form[2].value,
        time: elem.form[3].value,
      };
      setIsLoading(true);
      await feedbackRequest(inputValues);
      if (elem.parentElement !== null) {
        const parentElem = elem.parentElement as HTMLFormElement;
        parentElem.reset();
      }
    } else setClarifyingText('Все поля должны быть заполнены');
    setIsLoading(false);
  };

  const checkValues = (formValues: HTMLFormElement) => {
    const checkForEmptyResults = [];
    const checkForCorrectResults = [];
    for (let i = 0; i < formValues.form.length - 1; i++) {
      checkForEmptyResults.push(checkForEmptiness(formValues.form[i].value));
      checkForCorrectResults.push(
        checkForCorrectValue(formValues.form[i].className),
      );
    }
    if (
      checkForEmptyResults.indexOf(false) === -1
      && checkForCorrectResults.indexOf(false) === -1
    ) {
      return true;
    }
    return false;
  };

  const checkForEmptiness = (value: string) => {
    if (value.length === 0) return false;
    return true;
  };

  const checkForCorrectValue = (value: string) => {
    if (value.indexOf('incorrectInputValue') !== -1) return false;
    return true;
  };

  const feedbackRequest = async (values: any) => {
    try {
      const request = await fetch(
        'https://sendfeedback.free.beeceptor.com/feedback',
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        },
      );
      const result = await request.json();
      if (result.status === 'error') {
        setClarifyingText('Something went wrong...');
      } else setClarifyingText('Заявка отправлена');
    } catch (err) {
      setClarifyingText('Something went wrong...');
    }
  };

  return (
    <section className="feedback">
      <header>
        <h3 className="feedback_title">Подпишись</h3>
      </header>
      <p className="feedback_description">
        Отправляем анонсы новых статей, выпусков и трансляций
      </p>
      <form className="feedback_form" action="some url">
        <CompInputName specClass="feedback_input" />
        <CompInputEmail specClass="feedback_input" />
        <CompInputTel specClass="feedback_input" />
        <CompInputDate specClass="feedback_input" />
        <button
          type="button"
          className="feedback_subscribe"
          onClick={(e) => sendFeedbackDetails(e)}
        >
          Подписаться
        </button>
      </form>
      <div className="processing">
        <p className="clarifyingText">{clarifyingText}</p>
        <LoadingSpinner isLoading={isLoading} />
      </div>
    </section>
  );
};

export default Feedback;
