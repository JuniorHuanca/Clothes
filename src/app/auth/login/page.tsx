"use client";
import Providers from "@/components/Auth/Providers";
import Input from "@/components/Custom/Input";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { ChangeEvent } from "react";

type Props = {};

const Login = (props: Props) => {
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await signIn("credentials", {
      username: "userName.current",
      password: "pass.current",
      redirect: false,
    });
  };
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h1 className="text-2xl font-semibold mb-4">Inicio de Sesión</h1>
        <Providers />
        <form>
          <div className="mb-4">
            <Input
              type={"text"}
              label={"text"}
              value={""}
              name={""}
              placeholder={""}
              error={false}
              onChange={function (e: ChangeEvent<HTMLInputElement>): void {
                throw new Error("Function not implemented.");
              }}
            />
            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition"
            >
              Iniciar Sesión con correo electrónico
            </button>
          </div>
        </form>
        <form onSubmit={onSubmit}>
          <div className="mb-4">
            <Input
              type={"text"}
              label={"text"}
              value={""}
              name={""}
              placeholder={""}
              error={false}
              onChange={function (e: ChangeEvent<HTMLInputElement>): void {
                throw new Error("Function not implemented.");
              }}
            />
          </div>
          <div className="mb-4">
            <Input
              type="password"
              label="password"
              value={""}
              name={""}
              placeholder={""}
              error={false}
              onChange={function (e: ChangeEvent<HTMLInputElement>): void {
                throw new Error("Function not implemented.");
              }}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition"
          >
            Iniciar Sesión con credenciales
          </button>
        </form>
        <p className="mt-4 text-sm text-gray-600">
          ¿No tienes una cuenta? <Link href="/registro">Regístrate</Link>
        </p>
      </div>
    </main>
  );
};

export default Login;
