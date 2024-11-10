// кард враппер на регистр
import Register from "../../../feature/registration/ui/Registration";
import CardWrapper from "../../../app/shared/components/cardWrapper.component";

export default function RegisterPage() {
  return (
    <>
      <CardWrapper width="400px">
        <Register />
      </CardWrapper>
    </>
  );
}
