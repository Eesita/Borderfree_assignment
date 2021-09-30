import "./styles.css";
import { Route, Switch, useLocation } from "react-router-dom";
import Product from "./components/Product";
import Summary from "./components/Summary";

export default function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/summary">
          <Summary />
        </Route>
        <Route path="/">
          <Product />
        </Route>
      </Switch>
    </div>
  );
}
