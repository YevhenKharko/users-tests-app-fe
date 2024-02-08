import { FC } from "react";
import { SingleUser } from "../SingleUser/SingleUser";
import { User } from "../../types/User";
import { Test } from "../../types/Test";

type SingleUserPageProps = {
  user?: User | null;
  setCurrentTest: React.Dispatch<React.SetStateAction<Test | null>>;
}

export const SingleUserPage: FC<SingleUserPageProps> = ({ user, setCurrentTest }) => {
  if (!user) {
    return <p>User not found</p>;
  }
  const { id, name, user_name, created_at, updated_at } = user;
  return (
    <div className="hero is-fullheight is-light is-flex is-justify-content-center is-align-items-center">
      <SingleUser id={id} name={name} user_name={user_name} created_at={created_at} updated_at={updated_at} setCurrentTest={setCurrentTest} />
    </div>
  )
}