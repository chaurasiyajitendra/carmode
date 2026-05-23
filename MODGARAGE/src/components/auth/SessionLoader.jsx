import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { restoreSession } from "../../features/auth/authSlice";
import { authStorage } from "../../features/auth/authStorage";

const SessionLoader = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    // Restore persistent session from localStorage
    const { user, token } = authStorage.getSession();
    if (user && token) {
      dispatch(restoreSession({ user, token }));
    }
  }, [dispatch]);

  return <>{children}</>;
};

export default SessionLoader;
