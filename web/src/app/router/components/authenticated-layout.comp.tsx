import NavBar from "../../shared/components/navbar/navbar.component";
import { Outlet } from "react-router-dom";

export default function AuthenticatedLayout() {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
}
