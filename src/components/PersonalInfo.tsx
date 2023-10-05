import Card from "./UI/Card";
import classes from "./PersonalInfo.module.css";
import { formatCurrency } from "../utils/formatCurrency";

type PersonalInfoType = {
  id: string | undefined;
  name: string | undefined;
  balance: number;
};

function PersonalInfo({ id, name, balance }: PersonalInfoType) {
  const formattedBalance = formatCurrency(balance);

  return (
    <Card>
      <h2 className={classes.header}>Profile</h2>
      <div className={classes.info_container}>
        <div className={classes.info}>
          <h3>{name}</h3>
          <p>{id}</p>
        </div>
        <p className={classes.balance}>
          <span>Balance:</span> {formattedBalance}
        </p>
      </div>
    </Card>
  );
}

export default PersonalInfo;
