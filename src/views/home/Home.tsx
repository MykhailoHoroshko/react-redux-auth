import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { requestLogout, selectLogin } from "../../features/login/loginSlice";

export function Home() {
  const dispatch = useAppDispatch();
  const { status } = useAppSelector(selectLogin);

  return (
    <div>
      <h1>Home</h1>
      <button
        disabled={status === "loading"}
        onClick={() => dispatch(requestLogout())}
      >
        Logout
      </button>
    </div>
  );
}
