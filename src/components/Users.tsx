import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUsers } from "../store/usersSlice";
import { Link } from "react-router-dom";
import { fetchAllUsers } from "../api/api";
import { User } from "../interfaces";
import Card from "./UI/Card";
import Loader from "./UI/Loader";
import Error from "./UI/Error";
import { AppDispatch, RootState } from "../store/store";
import classes from "./Users.module.css";

function Users() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const dispatch = useDispatch<AppDispatch>();
  const users = useSelector((state: RootState) => state.users);

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    fetchAllUsers()
      .then((usersData: User[]) => {
        dispatch(setUsers(usersData));
      })
      .catch((err) => {
        setError("Something went wrong.");
      })
      .finally(() => setIsLoading(false));
  }, [dispatch]);

  return (
    <div className={classes.users_container}>
      <h2>Users</h2>
      <ul className={classes.users}>
        {isLoading && <Loader />}
        {users.length > 0 &&
          users.map((user) => (
            <li key={user.id}>
              <Card className={classes.user_card}>
                <div>
                  <h2>{user.name}</h2>
                  <p>{user.id}</p>
                </div>
                <Link to={`/users/${user.id}`} state={user}>
                  Open details
                </Link>
              </Card>
            </li>
          ))}

        {!isLoading && !error && users.length === 0 && (
          <p className={classes.plug}>Users not found.</p>
        )}
        {error && <Error>{error}</Error>}
      </ul>
    </div>
  );
}

export default Users;
