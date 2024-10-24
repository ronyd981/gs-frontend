import { useEffect, useState } from "react";

export default function useGetUser() {
  const [user, setUser] = useState<string | null>(null);

  const signOut = () => {
    setUser(null);
    localStorage.removeItem("user-sesion");
  };

  useEffect(() => {
    const userData = localStorage.getItem("user-sesion");

    setUser(userData);
  }, []);

  return { user, signOut };
}
