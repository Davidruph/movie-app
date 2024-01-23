import { Routes, Route } from "react-router-dom";
import { HomePage } from "../page";

import * as routes from "./CONSTANT";

const RouterConfig = () => {
  return (
    <div>
      <Routes>
        <Route path={routes.INDEX} element={<HomePage />} />
      </Routes>
    </div>
  );
};

export default RouterConfig;
