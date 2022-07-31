import { MouseEvent, useState } from 'react';
import 'regenerator-runtime/runtime';
import 'core-js/stable';

import './styles.scss';
import LoadingSpinner from '../../components/loading-spinner';
import CompInputEmail from '../../components/input-email';
import CompInputTel from '../../components/input-tel/index.';
import CompInputDate from '../../components/input-date';
import CompInputName from '../../components/input-name';
import CompInputComment from '../../components/input-comment';
import CompButton from '../../components/button';

const FeatureFeedback = () => {
  const [clarifyingText, setClarifyingText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const checkForEmptiness = (value: string) => {
    if (value.length === 0) return false;
    return true;
  };

  const checkForCorrectValue = (value: string) => {
    if (value.indexOf('__wrong-value') !== -1) return false;
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
      } else setClarifyingText('The application has been sent');
    } catch (err) {
      setClarifyingText('Something went wrong...');
    }
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

  const sendFeedbackDetails = async (e: MouseEvent<HTMLButtonElement>) => {
    const elem = e.target as HTMLFormElement;
    if (checkValues(elem)) {
      const inputValues = {
        name: elem.form[0].value,
        email: elem.form[1].value,
        tel: elem.form[2].value,
        date: elem.form[3].value,
        comment: elem.form[4].value,
      };
      setIsLoading(true);
      await feedbackRequest(inputValues);
      if (elem.parentElement !== null) {
        const parentElem = elem.parentElement as HTMLFormElement;
        parentElem.reset();
      }
    } else setClarifyingText('All fields must be filled out');
    setIsLoading(false);
  };

  return (
    <section className="feedback">
      <header>
        <h3 className="feedback__title">Subscribe</h3>
      </header>
      <p className="feedback__description">
        Sending announcements of new articles, issues and broadcasts
      </p>
      <form className="feedback__form" action="some url">
        <CompInputName specClass="feedback__input" />
        <CompInputEmail specClass="feedback__input" />
        <CompInputTel specClass="feedback__input" />
        <CompInputDate specClass="feedback__input" />
        <CompInputComment specClass="feedback__comment" />
        <CompButton title="Subscribe" onClick={sendFeedbackDetails} />
      </form>
      <div className="processing">
        <p className="processing__text">{clarifyingText}</p>
        <LoadingSpinner isLoading={isLoading} />
      </div>
    </section>
  );
};

export default FeatureFeedback;
