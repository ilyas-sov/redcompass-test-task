import { Routes, Route, Navigate } from "react-router-dom";
import UserProfile from "./pages/UserProfle";
import Layout from "./components/Layout";
import Users from "./components/Users";
import Page404 from "./pages/404";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/users" />} />
      <Route path="/users" element={<Layout />}>
        <Route index element={<Users />} />
        <Route path=":id" element={<UserProfile />} />
      </Route>
      <Route path="/404" element={<Page404 />} />
      <Route path="/*" element={<Navigate to="/404" />} />
    </Routes>
  );
}

export default App;
