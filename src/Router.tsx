import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import History from "./pages/History";
import DefaultLayout from "./layouts/DefaultLayout";

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/history" element={<History />} />
      </Route>

      {/* To Access you need to put /admin/products */}
      {/* <Route path="/admin" element={<AdmintLayout />}>
        <Route path="/products" element={<Products />} />
      </Route> */}
    </Routes>
  );
}
