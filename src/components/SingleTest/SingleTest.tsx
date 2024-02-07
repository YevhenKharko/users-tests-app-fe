import { FC, useState } from "react";
import { Test } from "../../types/Test";
import { useNavigate } from "react-router-dom";
import { finishTest } from "../../services/fetchClient";

type SingleTestProps = {
  currentTest?: Test | null;
}

export const SingleTest: FC<SingleTestProps> = ({ currentTest }) => {
  const { description = "No description available", user_id: userId = 0, status = 0, id = 0 } = currentTest || {};
  const [userAnswer, setUserAnswer] = useState("");
  const [currentTestStatus, setCurrentTestStatus] = useState(status);
  const [isSubmiting, setIsSubmiting] = useState(false);
  const [hasUserAnswered, setHasUserAnswered] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const result = await finishTest(userId as number, id as number, userAnswer);
      setHasUserAnswered(true);
      setIsSubmiting(true);

      if (result && result.statusCode === 200) {
        setCurrentTestStatus(1);
        setTimeout(() => {
          setIsSubmiting(false);
        }, 1000);
        setTimeout(() => {
          navigate(`/users/${currentTest?.user_id}/tests`);
        }, 3000)
      } else {
        setTimeout(() => {
          setIsSubmiting(false);
        }, 1000);
      }

    } catch (error) {
      console.error('Error finishing test:', error);
    }
  };

  const handleGoBack = () => {
    navigate(`/users/${currentTest?.user_id}/tests`);
  };

  return (
    <div className="container has-text-centered" style={{border: '1px solid #000'}}>
      <div className="box has-background-light">
        <h2 className="title">{description}</h2>
        <p className={isSubmiting ? "has-text-info" : !currentTestStatus ? "has-text-danger" : hasUserAnswered ? "has-text-success" : "has-text-black"}>
          {
            isSubmiting ? "Checking your test..."
              : !currentTestStatus && hasUserAnswered
                ? "Your answer is incorrect!"
                : currentTestStatus
                  ? "You passed this test! Congratulations! Redirecting to tests page..."
                  : "Waiting for answer..."
          }
        </p>
        <div className="field">
          <label className="label">Your Answer:</label>
          <div className="control">
            <input
              className="input"
              type="text"
              placeholder="Type your answer here"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value.replace(/[^0-9+\-*/]/g, ''))}
            />
          </div>
        </div>

        <div className="field is-grouped is-flex is-justify-content-space-around">
          <div className="control">
            <button className="button is-primary" onClick={handleSubmit} disabled={isSubmiting}>
              Check test
            </button>
          </div>
          <div className="control">
            <button className="button is-link" onClick={handleGoBack} disabled={isSubmiting}>
              Back to User Tests
            </button>
          </div>
        </div>
      </div>
    </div>

  );
};