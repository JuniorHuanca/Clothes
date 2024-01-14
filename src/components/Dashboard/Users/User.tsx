"use client";
import useRolesData from "@/hooks/useRolesData";
import { IUser } from "@/shared/types";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
const User = (props: IUser) => {
  const router = useRouter();
  const data = useRolesData();
  const [showRolesList, setShowRolesList] = useState(false);
  const [selectedRole, setSelectedRole] = useState(props.role.id);
  const [loading, setLoading] = useState(false);
  const handleSave = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/v1/dashboard/users/role`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: props.email, roleId: selectedRole }),
      });

      if (response.ok) {
        router.refresh();
        toast.success("El rol del usuario se ha cambiado con éxito");
      } else {
        toast.error(response.statusText);
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    } finally {
      setLoading(false);
      setShowRolesList(false);
    }
  };
  const styleByRole: { [key: string]: string } = {
    Administrador:
      "bg-indigo-500 ring-offset-2 ring-offset-white ring-indigo-500",
    Usuario: "bg-emerald-500 ring-offset-2 ring-offset-white ring-emerald-500",
    Delivery: "bg-purple-500 ring-offset-2 ring-offset-white ring-purple-500",
  };
  return (
    <div className="flex flex-col justify-between gap-2 bg-white shadow-lg rounded-lg p-2 w-64 max-[400px]:w-full">
      <div>
        <span className="text-gray-600 line-clamp-1">{props.email}</span>
        <h2 className="text-lg line-clamp-1 font-semibold text-gray-800">
          {props.name}
        </h2>
      </div>
      {showRolesList ? (
        <div>
          <div className="flex flex-col gap-2">
            {data.map((role) => (
              <button
                type="button"
                key={role.name}
                className={`${styleByRole[role.name]} ${
                  role.id === selectedRole ? "font-bold text-white ring-2" : ""
                } p-1 rounded-lg text-center`}
                onClick={() => setSelectedRole(role.id)}
              >
                {role.name}
              </button>
            ))}
          </div>
          <div className="flex justify-evenly mt-2">
            <button
              type="button"
              className="bg-blue-500 text-white px-2 py-1 rounded"
              onClick={handleSave}
              disabled={loading}
            >
              Guardar
            </button>
            <button
              type="button"
              className="bg-red-500 text-white px-2 py-1 rounded mr-2"
              onClick={() => setShowRolesList(false)}
              disabled={loading}
            >
              Cancelar
            </button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          className={`${
            styleByRole[props.role.name]
          } font-bold text-white p-2 rounded-lg text-center`}
          onClick={() => setShowRolesList(!showRolesList)}
        >
          {props.role.name}
        </button>
      )}
    </div>
  );
};

export default User;
