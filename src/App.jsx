import { BrowserRouter as Router } from "react-router-dom";
import RouterConfig from "./routes/routeConfig";
import { Provider } from "react-redux";
import { store } from "./redux/store";

function App() {
  return (
    <>
      <Provider store={store}>
        <Router>
          <RouterConfig />
        </Router>
      </Provider>
    </>
  );
}

export default App;
