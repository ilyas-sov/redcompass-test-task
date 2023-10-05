import { Transaction } from "../interfaces";
import { v4 as uuidv4 } from "uuid";
import classes from "./HistoryTable.module.css";
import TransactionCard from "./TransactionCard";

type HistoryTableType = {
  transactions: Transaction[];
  id: string;
};

function HistoryTable({ transactions, id }: HistoryTableType) {
  return (
    <table className={classes.table}>
      <tbody>
        {transactions.map((transaction) => (
          <tr key={uuidv4()}>
            <TransactionCard transaction={transaction} id={id} />
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default HistoryTable;
