import { SyntheticEvent, useCallback, useMemo, useState } from "react";
import { TABS, Transaction } from "../interfaces";
import Card from "./UI/Card";
import HistoryTable from "./HistoryTable";
import Pagination from "./Pagination";
import { useDebounce } from "../hooks/useDebounce";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import classes from "./TransactionsHistory.module.css";

type TransactionsHistoryType = {
  transactions: Transaction[];
  id: string;
};

function TransactionsHistory({ transactions, id }: TransactionsHistoryType) {
  const itemsPerPage = 10;

  const [currentTab, setCurrentTab] = useState<keyof typeof TABS>(TABS.ALL);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");

  const users = useSelector((state: RootState) => state.users);

  const findUserBySearchValue = useCallback(() => {
    return users.find(
      (user) =>
        user.id.includes(searchValue.toLowerCase()) ||
        user.name.toLowerCase().includes(searchValue.toLowerCase())
    );
  }, [searchValue, users]);

  const transactionsToShow = useMemo(() => {
    if (currentTab === TABS.INCOMES) {
      if (searchValue) {
        const user = findUserBySearchValue();

        if (user) {
          return transactions.filter(
            (transaction) => transaction.targetId === user.id
          );
        } else {
          return [];
        }
      }
      return transactions.filter((transaction) => transaction.targetId === id);
    }
    if (currentTab === TABS.OUTCOMES) {
      if (searchValue) {
        const user = findUserBySearchValue();

        if (user) {
          return transactions.filter(
            (transaction) => transaction.sourceId === user.id
          );
        } else {
          return [];
        }
      }
      return transactions.filter((transaction) => transaction.sourceId === id);
    }

    if (searchValue) {
      const user = findUserBySearchValue();

      if (user) {
        return transactions.filter(
          (transaction) =>
            transaction.sourceId.includes(user.id) ||
            transaction.targetId.includes(user.id)
        );
      }
    }
    return transactions;
  }, [transactions, currentTab, id, searchValue, findUserBySearchValue]);

  const amountOfPages = Math.ceil(transactionsToShow.length / itemsPerPage);

  function changeTabHandler(tab: keyof typeof TABS) {
    setCurrentTab(tab);
    setCurrentPage(1);
  }

  function previousPageHandler() {
    if (currentPage === 1) return;
    setCurrentPage((prev) => prev - 1);
  }

  function nextPageHandler() {
    if (currentPage === amountOfPages) return;
    setCurrentPage((prev) => prev + 1);
  }

  const searchUser = useDebounce((value) => {
    setSearchValue(value);
    setCurrentTab(TABS.ALL);
  });

  function inputChangeHandler(e: SyntheticEvent<HTMLInputElement>) {
    const value = (e.target as HTMLInputElement).value;
    setCurrentTab(TABS.ALL);
    searchUser(value);
  }

  return (
    <Card>
      <h2 className={classes.header}>Transactions History</h2>
      <div className={classes.actions}>
        <button
          className={currentTab === TABS.ALL ? classes.active : ""}
          onClick={() => changeTabHandler(TABS.ALL)}
        >
          All
        </button>
        <button
          className={currentTab === TABS.INCOMES ? classes.active : ""}
          onClick={() => changeTabHandler(TABS.INCOMES)}
        >
          Incomes
        </button>
        <button
          className={currentTab === TABS.OUTCOMES ? classes.active : ""}
          onClick={() => changeTabHandler(TABS.OUTCOMES)}
        >
          Outcomes
        </button>
      </div>
      <div className={classes.input_search}>
        <input
          type="text"
          placeholder="Search transaction"
          onChange={inputChangeHandler}
        />
        <Pagination
          onPrevPage={previousPageHandler}
          onNextPage={nextPageHandler}
          currentPage={currentPage}
          amountOfPages={amountOfPages}
        />
      </div>
      <HistoryTable
        transactions={transactionsToShow.slice(
          itemsPerPage * (currentPage - 1),
          itemsPerPage * currentPage
        )}
        id={id}
      />
    </Card>
  );
}

export default TransactionsHistory;
