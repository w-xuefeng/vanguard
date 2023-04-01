import { useAuth } from "@/hooks/use-auth";
import { Navigate, Outlet } from "umi";

export default () => {
  const { isLogin } = useAuth();
  if (isLogin) {
    return <Outlet />;
  } else {
    return <Navigate to="/login" />;
  }
};
