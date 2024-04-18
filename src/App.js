import React from "react";
import ReactDOM from "react-dom";
import CalendarWithDnd from "./components/Calendar";

const App = () => {
  return (
    <div>
      <CalendarWithDnd />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));

export default App;
