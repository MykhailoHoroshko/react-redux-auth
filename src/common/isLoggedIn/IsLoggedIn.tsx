import { PropsWithChildren, ReactNode } from "react";
import { useAppSelector } from "../../app/hooks";
import { selectIsLoggedIn } from "../../features/login/loginSlice";

interface Props extends PropsWithChildren {
  otherwise?: ReactNode;
}

export function IsLoggedIn({ children, otherwise }: Props) {
  const isLoggedIn = useAppSelector(selectIsLoggedIn);

  if (isLoggedIn) {
    return <>{children}</>;
  }

  return <>{otherwise}</>;
}
