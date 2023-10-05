import { useSelector } from "react-redux";
import { Transaction } from "../interfaces";
import { RootState } from "../store/store";
import classes from "./TransactionCard.module.css";
import { formatCurrency } from "../utils/formatCurrency";

type TransactionType = {
  transaction: Transaction;
  id: string;
};

function TransactionCard({ transaction, id }: TransactionType) {
  const isIncome = transaction.targetId === id;
  const isSelfPayment = transaction.sourceId === transaction.targetId;

  const party = useSelector((state: RootState) => {
    if (isIncome) {
      return state.users.find((user) => user.id === transaction.sourceId);
    } else {
      return state.users.find((user) => user.id === transaction.targetId);
    }
  });

  const formattedAmount = formatCurrency(transaction.amount);

  return (
    <td className={classes.transaction_card}>
      <div className={classes.info}>
        <p>
          {isIncome ? "From:" : "To:"} {party?.name || "Unknown name"}
        </p>
        <p>{party?.id || "Unknown id"}</p>
      </div>
      <p
        className={`${classes.amount} ${
          isIncome ? classes.income : classes.outcome
        } ${isSelfPayment ? classes.self : ""}`}
      >
        {isIncome ? "+" : "-"}
        {formattedAmount}
      </p>
    </td>
  );
}

export default TransactionCard;
