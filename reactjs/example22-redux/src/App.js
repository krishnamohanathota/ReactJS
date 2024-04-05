import { useSelector } from "react-redux";

import CreateCustomer from "./components/customers/CreateCustomer";
import Customer from "./components/customers/Customer";
import AccountOperations from "./components/accounts/AccountOperations";
import BalanceDisplay from "./components/accounts/BalanceDisplay";

function App() {
  const fullName = useSelector((store) => store.customer.fullName);

  return (
    <div>
      <h1>🏦 The React-Redux Bank ⚛️</h1>
      {fullName === "" ? (
        <CreateCustomer />
      ) : (
        <>
          <Customer />
          <AccountOperations />
          <BalanceDisplay />
        </>
      )}
    </div>
  );
}

export default App;
