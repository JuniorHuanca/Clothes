import type { Metadata } from "next";

type Props = {};

export const metadata: Metadata = {
  title: "Dashboard",
};

const Dashboard = (props: Props) => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Bloque 1 */}
        <div className="bg-blue-500 p-4 rounded-md">
          <h2 className="text-xl font-semibold mb-2">Estadísticas A</h2>
          <p>Contenido de estadísticas A...</p>
        </div>

        {/* Bloque 2 */}
        <div className="bg-green-500 p-4 rounded-md">
          <h2 className="text-xl font-semibold mb-2">Estadísticas B</h2>
          <p>Contenido de estadísticas B...</p>
        </div>

        {/* Bloque 3 */}
        <div className="bg-yellow-500 p-4 rounded-md">
          <h2 className="text-xl font-semibold mb-2">Estadísticas C</h2>
          <p>Contenido de estadísticas C...</p>
        </div>

        {/* Bloque 4 */}
        <div className="bg-red-500 p-4 rounded-md">
          <h2 className="text-xl font-semibold mb-2">Estadísticas D</h2>
          <p>Contenido de estadísticas D...</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
