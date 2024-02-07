import React, { FC, useState } from "react";
import md5 from "md5";
import { createNewUser, verifyUser } from "../../services/fetchClient";
import { useNavigate } from "react-router-dom";
import { User } from "../../types/User";

type SignUpPageProps = {
  setCurrentUser: (user: User) => void;
}

export const SignUpPage: FC<SignUpPageProps> = ({ setCurrentUser }) => {
  const [name, setName] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const onNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(false);
    setName(e.target.value);
  }

  const onUserNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(false);
    setUserName(e.target.value);
  }

  const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(false);
    setPassword(e.target.value);
  }

  const onSignUp = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setError(false);
    const hashed = md5(password);
    createNewUser(name, userName, hashed);

    const user = await verifyUser(name, userName, hashed).then(data => data);
    setCurrentUser(user[0]);
    navigate(`./users/${user[0].id}/tests`);
  }

  const onSignIn = async (e: React.MouseEvent<HTMLButtonElement>) => {
    setError(false);
    e.preventDefault();
    const hashed = md5(password);
    const user = await verifyUser(name, userName, hashed).then(user => user);

    if (user.error) {
      setError(true);
      return;
    }

    setCurrentUser(user[0]);
    navigate(`./users/${user[0].id}/tests`);
  }

  return (
    <div className="hero is-fullheight is-info sign-up">
      <div className="hero-body">
        <div className="container">
          <div className="columns is-centered">
            <div className="column is-half">
              <form>
                <div className="field">
                  <label className="label">Name</label>
                  <div className="control">
                    <input
                      className="input"
                      type="text"
                      placeholder="Enter your name"
                      value={name}
                      required
                      onChange={(e) => onNameChange(e)}
                    />
                  </div>
                </div>

                <div className="field">
                  <label className="label">User name</label>
                  <div className="control">
                    <input
                      className="input"
                      type="text"
                      placeholder="Enter your user name"
                      required
                      onChange={(e) => onUserNameChange(e)}
                    />
                  </div>
                </div>

                <div className="field">
                  <label className="label">Password</label>
                  <div className="control">
                    <input
                      className="input"
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      required
                      onChange={(e) => onPasswordChange(e)}
                    />
                  </div>
                </div>

                <div className="field is-grouped is-flex is-justify-content-space-around my-6">
                  <div className="control">
                    <button
                      className="button is-primary is-size-4"
                      onClick={(e) => onSignUp(e)}
                      disabled={!name || !password || !userName}
                    >
                      Sign-Up
                    </button>
                  </div>
                  {!error ?
                   <div className="control">
                   <button
                     className="button is-link is-size-4"
                     onClick={(e) => onSignIn(e)}
                     disabled={!name || !password || !userName}
                   >
                     Sign-In
                   </button>
                 </div>
                 :
                 <p className="has-text-warning has-text-weight-bold is-flex is-align-items-center is-size-4">User not found!</p>}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
