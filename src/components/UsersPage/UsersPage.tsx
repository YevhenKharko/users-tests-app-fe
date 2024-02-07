import { FC } from "react";
import { User } from "../../types/User";
import { SingleUser } from "../SingleUser/SingleUser";

interface UsersPageProps {
  users: User[];
}

export const UsersPage: FC<UsersPageProps> = ({ users }) => {
  return (
    <div className="container">
      <h2 className="title is-flex is-justify-content-center mb-6">USERS PAGE</h2>
      <div className="columns is-multiline my-1">
        {users.map(user => {
          const { name, user_name, created_at, updated_at, id } = user;

          return (
            <SingleUser
              key={id}
              id={id}
              name={name}
              user_name={user_name}
              created_at={created_at}
              updated_at={updated_at}
            />
          )
        })}
      </div>
    </div>
  );
};