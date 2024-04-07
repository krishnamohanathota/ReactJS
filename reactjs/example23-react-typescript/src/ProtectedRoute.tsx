import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "./store";
import { useEffect } from "react";

import { ReactNode } from "react";

interface ProtectedRouteProps {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { userName, loginStatus } = useSelector(
    (store: RootState) => store.user
  );

  const navigate = useNavigate();

  useEffect(() => {
    if (!userName || !loginStatus) navigate("/login");
  }, [userName, loginStatus, navigate]);

  return userName && loginStatus ? children : null;
}
