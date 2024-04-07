import * as React from "react";

import User from "./User";
import Payments from "./Payments";
import Orders from "./Orders";

function AppLayout() {
  return (
    <div>
      <h1>App Layout</h1>

      <User />
      <Payments />
      <Orders />
    </div>
  );
}

export default AppLayout;
