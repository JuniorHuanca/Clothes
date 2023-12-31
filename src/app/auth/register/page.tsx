import Link from "next/link";

type Props = {};

const Register = (props: Props) => {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h1 className="text-2xl font-semibold mb-4">Registro</h1>
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
              htmlFor="email"
              className="block text-sm font-medium text-gray-600"
            >
              Correo Electrónico
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="mt-1 p-2 border w-full rounded-md"
              placeholder="Ingresa tu correo electrónico"
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
            className="w-full bg-green-500 text-white p-2 rounded-md hover:bg-green-600 transition"
          >
            Registrarse
          </button>
        </form>
        <p className="mt-4 text-sm text-gray-600">
          ¿Ya tienes una cuenta? <Link href="/login">Inicia Sesión</Link>
        </p>
      </div>
    </main>
  );
};

export default Register;
