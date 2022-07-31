import classNames from 'classnames';
import { useState, FC, useRef } from 'react';
import './styles.scss';

type Props = {
  specClass?: string;
};

const CompInputComment: FC<Props> = ({ specClass }) => {
  const [isCorrect, setIsCorrect] = useState(true);
  const [curComLength, setCurComLength] = useState(0);
  const inputValue = useRef() as any;
  const errorText = 'First and last names must be at least 10 and no more than 300 characters';

  const checkComment = (eventType: string) => {
    if (eventType === 'blur' || eventType === 'Enter') {
      if (
        inputValue.current.value.length < 10
        || inputValue.current.value.length > 300
      ) {
        setIsCorrect(false);
      } else setIsCorrect(true);
    }
  };

  const onChangeComment = () => {
    setCurComLength(inputValue.current.value.length);
  };

  return (
    <>
      <p className="comment-text">{`Current comment length: ${curComLength}`}</p>
      <textarea
        ref={inputValue}
        className={classNames(specClass !== undefined && specClass, {
          '__wrong-value': !isCorrect,
        })}
        onBlur={(e) => checkComment(e.type)}
        onKeyUp={(e) => checkComment(e.key)}
        onChange={onChangeComment}
      />
      {!isCorrect && <p className="comm-error-text">{errorText}</p>}
    </>
  );
};

CompInputComment.defaultProps = {
  specClass: undefined,
};

export default CompInputComment;
