import { FC, useState } from "react";
import { continueTest, getAllTestsForUser, startNewTest } from "../../services/fetchClient";
import { useNavigate } from "react-router-dom";
import { Test } from "../../types/Test";

type SingleUserType = {
  id: number,
  name: string;
  user_name: string;
  created_at: string;
  updated_at: string;
  setCurrentTest: React.Dispatch<React.SetStateAction<Test | null>>;
}

export const SingleUser: FC<SingleUserType> = ({ id, name, user_name, created_at, updated_at, setCurrentTest }) => {
  const [userTests, setUserTests] = useState([]);
  const navigate = useNavigate();

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const formattedDate = date.toLocaleDateString();
    const formattedTime = date.toLocaleTimeString();

    return `${formattedDate} ${formattedTime}`;
  };

  const handleShowUsersTests = (userId: number) => {
    getAllTestsForUser(userId).then(tests => setUserTests(tests));
  }

  const handleShowNotCompletedTests = async (userId: number) => {
    const tests = await getAllTestsForUser(userId);
    const avaivableTests = tests.filter((test: Test) => test.status === 0);
    console.log(tests);
    setUserTests(avaivableTests);
  }

  const handleShowCompletedTests = async (userId: number) => {
    const tests = await getAllTestsForUser(userId);
    const avaivableTests = tests.filter((test: Test) => test.status === 1);
    setUserTests(avaivableTests);
  } 

  const handleContinueTest = async (userId: number, testId: number) => {
    const test = await continueTest(userId, testId);
    setCurrentTest(test[0]);
    console.log(test[0]);
    navigate(`/users/${userId}/tests/${testId}`);
  }

  const handleStartNewTest = async (userId: number) => {
    try {
      const test = await startNewTest(userId);
      setCurrentTest(test[0]);
      navigate(`/users/${userId}/tests/${test[0].id}`);
    } catch (error) {
      console.error('Error in handleStartNewTest:', error);
    }
  };

  return (
    <div className="columns is-fullheight is-flex" style={{width: '100%'}}>
      <div className="column is-fullwidth has-background-info">
        <div className="box is-size-5 has-text-centered" style={{ border: '1px solid #000', height: '100%', width: '100%' }}>
          <h2 className="title has-text-black">{name}</h2>
          <label htmlFor="id" className="has-text-weight-bold">User ID:</label>
          <h3 id="id">{id}</h3>
          <label htmlFor="nick" className="has-text-weight-bold">User nick name:</label>
          <h3 id="nick">{user_name}</h3>
          <label htmlFor="created" className="has-text-weight-bold">Created at:</label>
          <h4 id="created">{formatTimestamp(created_at)}</h4>
          <label htmlFor="updated" className="has-text-weight-bold">Updated at:</label>
          <h4 id="updated">{formatTimestamp(updated_at)}</h4>
          <button className="button is-info has-text-weight-bold mt-4 mx-5" onClick={() => handleShowUsersTests(id)}>Show all tests</button>
          <button className="button is-danger has-text-weight-bold mt-4 mx-5" onClick={() => handleShowNotCompletedTests(id)}>Show active tests</button>
          <button className="button is-dark has-text-weight-bold mt-4 mx-5" onClick={() => handleShowCompletedTests(id)}>Show completed tests</button>
          <button className="button is-success has-text-weight-bold mt-4 mx-5" onClick={() => handleStartNewTest(id)}>
            Generate new test!
          </button>

          {userTests ? (
            userTests.map(test => {
              const { description, id, user_id, answer, status } = test;
              return (
                <div className="box mt-3" key={id} style={{border: "1px solid #000"}}>
                  <h5 className={status
                    ? "has-background-success has-text-weight-bold is-size-2"
                    : "has-background-danger has-text-weight-bold is-size-2"
                  }>
                    {status ? 'Completed' : 'Not completed'}
                  </h5>
                  <h4 className="is-size-3 has-text-weight-bold">{description}</h4>
                  <h5>TEST ID:{id}</h5>
                  <h5>USER ID:{user_id}</h5>
                  {status !== 0 && <h4 className="is-size-3 has-text-weight-bold">Result: {answer}</h4>}
                  {status === 0 && <button className="button is-success has-text-weight-bold is-size-4" onClick={() => handleContinueTest(user_id, id)}>Continue this test</button>}
                </div>
              );
            })
          ) : (
            <p>This user has no tests yet</p>
          )}
        </div>
      </div>
    </div>
  );

};

