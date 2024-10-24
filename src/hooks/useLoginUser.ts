import { useNavigate } from "react-router-dom";

import { toast } from "react-hot-toast";

export default function useLoginUser() {
  const navigate = useNavigate();

  const registerUser = (email: string, password: string) => {
    const jsonUsersData = localStorage.getItem("usersData");
    const usersData = jsonUsersData ? JSON.parse(jsonUsersData) : [];

    const user = usersData.find(
      (user: { email: string }) => user.email === email
    );

    if (!user) {
      toast.error("Email no registrado");
      return;
    }

    if (user.password !== password) {
      toast.error("Contraseña incorrecta");
      return;
    }

    localStorage.setItem("user-sesion", user.email);
    navigate("/");
  };

  return { registerUser };
}
