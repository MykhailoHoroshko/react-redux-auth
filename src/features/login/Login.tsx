import { FormEvent } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { requestLogin, selectLogin } from "./loginSlice";

interface FormElements extends HTMLFormControlsCollection {
  email: HTMLInputElement;
  password: HTMLInputElement;
}

export function Login() {
  const { status } = useAppSelector(selectLogin);
  const dispatch = useAppDispatch();
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formElements = e.currentTarget.elements as FormElements;
    dispatch(
      requestLogin({
        email: formElements.email.value,
        password: formElements.password.value,
      })
    );
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input type="email" name="email" id="email" />
        <input type="password" name="password" id="password" />
        <input type="submit" disabled={status === "loading"} />
      </form>
    </div>
  );
}
