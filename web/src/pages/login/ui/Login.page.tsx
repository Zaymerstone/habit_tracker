import Login from "../../../feature/login/ui/Login";
import CardWrapper from "../../../app/shared/components/cardWrapper.component";
import { ToastContainer } from "react-toastify";

export default function LoginPage() {
  return (
    <>
      <CardWrapper width="300px">
        <Login />
      </CardWrapper>
      <ToastContainer />
    </>
  );
}
