import { useEffect, useState } from "react";
import { adminAuth } from "../utils/api.js";

export default function useAuthCheck() {
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    adminAuth
      .then(res => res.json())
      .then(data => setAuth(data.authenticated))
      .catch(() => setAuth(false));
  }, []);

  return auth;
}
