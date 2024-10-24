import { Link } from "react-router-dom";

import Button from "../Button";

import Logo from "@/assets/logo/logo.svg";
import { useGetUser } from "@/hooks";

export default function Menu() {
  const { user, signOut } = useGetUser();

  return (
    <div
      className="
      w-full h-20 bg-white border-b px-6
    "
    >
      <nav
        className="
        max-w-[1535px] h-full flex items-center justify-between mx-auto
      "
      >
        <div>
          <figure
            className="
            w-16 h-16
          "
          >
            <img src={Logo} className="w-full h-full" alt="Logo" />
          </figure>
        </div>
        {user ? (
          <div className="group relative cursor-pointer z-10" tabIndex={1}>
            <div className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-500">
              <span className="text-white uppercase">{user?.charAt(0)}</span>
            </div>
            <div
              className="hidden group-focus-within:block absolute z-30 rounded-full top-0 right-0 w-full h-full cursor-pointer"
              onClick={() => {
                //@ts-ignore
                document.activeElement?.blur();
              }}
            ></div>
            <div className="hidden group-focus-within:flex w-32 p-2 rounded-md border bg-white absolute mt-4 right-0 hover:brightness-90 transtion duration-150">
              <button
                className="w-full text-gray-700"
                onClick={() => {
                  signOut();

                  //@ts-ignore
                  document.activeElement?.blur();
                }}
              >
                Cerrar sesión
              </button>
            </div>
          </div>
        ) : (
          <ul
            className="
            flex gap-2
            sm:gap-4
          "
          >
            <li>
              <Link to={"/sign-in"}>
                <Button
                  title="Ingresar"
                  className="bg-blue-500 border border-blue-500 text-white"
                />
              </Link>
            </li>
            <li>
              <Link to={"/sign-up"}>
                <Button
                  title="Registrarse"
                  className="border border-blue-500 text-blue-500"
                />
              </Link>
            </li>
          </ul>
        )}
      </nav>
    </div>
  );
}
