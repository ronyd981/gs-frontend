import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

export default function useRegisterUser() {
  const navigate = useNavigate();

  const registerUser = (email: string, password: string) => {
    const jsonUsersData = localStorage.getItem("usersData");

    const usersData = jsonUsersData ? JSON.parse(jsonUsersData) : [];

    const userExists = usersData.some(
      (user: { email: string }) => user.email === email
    );

    if (userExists) {
      toast.error("Este correo ya está registrado.");
      return;
    }

    const newUser = { email, password };
    usersData.push(newUser);
    localStorage.setItem("usersData", JSON.stringify(usersData));

    toast.success("Se ha creado la cuenta exitósamente");
    navigate("/sign-in");
  };

  return { registerUser };
}
