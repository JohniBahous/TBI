import { useEffect } from "react";
import { useLocation } from "wouter";
import useAudioStore from "../../stores/useAudioStore";

export function ProtectedRoute({ children }) {
  const loggedinAdmin = useAudioStore((state) => state.loggedinAdmin);
  const [, setLocation] = useLocation();

  useEffect(() => {
    if (!loggedinAdmin) {
      setLocation("/admin/login");
    }
  }, [loggedinAdmin, setLocation]);

  return loggedinAdmin ? children : null;
}
