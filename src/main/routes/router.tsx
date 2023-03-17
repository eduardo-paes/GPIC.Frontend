import { Route, Routes } from "react-router-dom";

// import { HomeFactory } from "../factories/pages/home";

const Router = (): JSX.Element => {
  return (
    <Routes>
      <Route path="/" element={<div>Home</div>} />
    </Routes>
  );
};

export default Router;
