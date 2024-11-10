// import { increment } from "../../../entitites/user/models/user.slice";
import { Button, TextField } from "@mui/material";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../app/shared/hooks/redux";
import { useState } from "react";

export default function HomePage() {
  // const dispatch = useAppDispatch();
  // const value = useAppSelector((state) => state.counter.value);
  // const [number, setNumber] = useState<number>(0);
  // console.log(number);
  return (
    <div>
      {/* <TextField
        type="number"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setNumber(Number(e.target.value))
        }
      />
      <Button onClick={() => void dispatch(increment(number))}> button </Button>
      <p>{value}</p> */}
    </div>
  );
}
