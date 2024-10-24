import { FormEvent, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Logo from "@/assets/logo/logo.svg";
import { Button } from "@/components";
import { useRegisterUser } from "@/hooks";
import { validateEmail } from "@/consts";

export default function SignUp() {
  const [emailError, setEmailError] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const userSesion = localStorage.getItem("user-sesion");
  const { registerUser } = useRegisterUser();

  const navigate = useNavigate();

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const target = e.target as typeof e.target & {
      email: { value: string };
      password: { value: string };
    };

    const email = target.email.value.trim();
    const password = target.password.value.trim();

    setEmailError(false);
    setPasswordError(false);

    const emailProccess = validateEmail(email);
    if (!emailProccess) {
      setEmailError(true);
      return;
    }

    if (!password) {
      setPasswordError(true);
      return;
    }

    registerUser(email, password);
  };

  useEffect(() => {
    if (userSesion) {
      navigate("/");
    } else {
      setIsLoading(false);
    }
  }, [navigate, userSesion]);

  if (isLoading) {
    return null;
  }

  return (
    <div
      className="
      w-full h-[100dvh] flex items-center justify-center bg-zinc-50 px-6
    "
    >
      <div
        className="
        max-w-[600px] flex flex-col gap-4 p-8 rounded-md bg-white border shadow-sm
      "
      >
        <figure
          className="
          w-14 h-14 mx-auto
        "
        >
          <img src={Logo} className="w-full h-full" alt="Logo" />
        </figure>
        <h1
          className="
          text-xl font-bold
          sm:text-3xl
        "
        >
          Crear cuenta en <span className="text-blue-500">Genios Data</span>
        </h1>
        <form className="w-full flex flex-col gap-4" onSubmit={onSubmit}>
          <div className="w-full flex flex-col gap-1">
            <label htmlFor="input-email" className="text-sm text-gray-500 ml-1">
              Correo electrónico
            </label>
            <input
              type="text"
              className={`
              w-full h-12 px-2 rounded-md outline-none border border-gray-300 focus:border-blue-500
              ${emailError && "border-red-500"}
              `}
              placeholder="johndoe@genios.com"
              id="input-email"
              name="email"
            />
            {emailError && (
              <p className="text-red-500 text-sm">
                Debe ingresar un correo válido
              </p>
            )}
          </div>
          <div className="w-full flex flex-col gap-1">
            <label
              htmlFor="input-password"
              className="text-sm text-gray-500 ml-1"
            >
              Contraseña
            </label>
            <input
              type="password"
              className={`
              w-full h-12 px-2 rounded-md outline-none border border-gray-300 focus:border-blue-500
              ${passwordError && "border-red-500"}
              `}
              placeholder="Contraseña"
              id="input-password"
              name="password"
            />
            {passwordError && (
              <p className="text-red-500 text-sm">
                Debe ingresar la contraseña
              </p>
            )}
          </div>
          <Button
            title="Registrarse"
            className="bg-blue-500 border border-blue-500 text-white"
          />
        </form>
        <div className="w-full flex flex-col gap-2 mt-4">
          <p
            className="
            text-sm
            sm:text-base
          "
          >
            ¿Ya tienes cuenta?{" "}
            <Link to="/sign-in">
              <span className="font-bold text-blue-500">Inicia sesión</span>
            </Link>
          </p>
          <Link to="/">
            <span
              className="
              text-sm font-bold text-blue-500
              sm:text-base
            "
            >
              Regresar al dashboard
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
