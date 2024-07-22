import React from "react";
import Private from "./routes/Private";
import Public from "./routes/Public";

import Admin from "./pages/admin";
const App = () => {
  return (
    <div className="bg-slate-50">
      <Public />
      <Private />
    </div>
  );
};

export default App;
