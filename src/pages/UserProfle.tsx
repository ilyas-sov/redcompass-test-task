import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { Transaction } from "../interfaces";
import PersonalInfo from "../components/PersonalInfo";
import TransactionsHistory from "../components/TransactionsHistory";
import { fetchUserTransactions } from "../api/api";
import Loader from "../components/UI/Loader";
import Error from "../components/UI/Error";
import classes from "./UserProfile.module.css";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

function UserProfile() {
  const [transactionsData, setTransactionsData] = useState<Transaction[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const location = useLocation();

  const userId = location.pathname.split("/")[2];

  const userData = useSelector((state: RootState) =>
    state.users.find((user) => user.id === userId)
  );

  useEffect(() => {
    if (userData?.id) {
      setIsLoading(true);
      setError(null);

      fetchUserTransactions(userData.id)
        .then((userTransactionsData) =>
          setTransactionsData(userTransactionsData)
        )
        .catch((err) => setError("Something went wrong."))
        .finally(() => setIsLoading(false));
    }
  }, [userData?.id]);

  const totalSum = useMemo(() => {
    return transactionsData.reduce((acc, transaction) => {
      if (transaction.sourceId === userData?.id) {
        acc -= transaction.amount;
      }

      if (transaction.targetId === userData?.id) {
        acc += transaction.amount;
      }

      return acc;
    }, 0);
  }, [transactionsData, userData?.id]);

  return (
    <div className={classes.user_profile_container}>
      <PersonalInfo
        id={userData?.id}
        name={userData?.name}
        balance={totalSum}
      />
      {isLoading && <Loader />}
      {error && <Error>{error}</Error>}
      {transactionsData.length > 0 && (
        <TransactionsHistory transactions={transactionsData} id={userId} />
      )}
      {!isLoading && !error && transactionsData.length === 0 && (
        <p className={classes.plug}>Transactions not found.</p>
      )}
    </div>
  );
}

export default UserProfile;
