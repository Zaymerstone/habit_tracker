// кард враппер на регистр
import Register from "../../../feature/registration/ui/Registration";
import CardWrapper from "../../../app/shared/components/cardWrapper.component";
import { ToastContainer } from "react-toastify";

export default function RegisterPage() {
  return (
    <>
      <CardWrapper width="400px">
        <Register />
      </CardWrapper>
      {/* ToastContainer renders the toasts */}
      <ToastContainer />
    </>
  );
}
