import Link from "next/link";

type Props = {};

const Login = (props: Props) => {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h1 className="text-2xl font-semibold mb-4">Inicio de Sesión</h1>
        <form>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-600"
            >
              Nombre de Usuario
            </label>
            <input
              type="text"
              id="username"
              name="username"
              className="mt-1 p-2 border w-full rounded-md"
              placeholder="Ingresa tu nombre de usuario"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-600"
            >
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="mt-1 p-2 border w-full rounded-md"
              placeholder="Ingresa tu contraseña"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition"
          >
            Iniciar Sesión
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
