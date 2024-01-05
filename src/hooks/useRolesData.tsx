import { IRole } from "@/shared/types";
import { useEffect, useState } from "react";

const useRolesData = () => {
  const [roles, setRoles] = useState<IRole[]>([]);

  const getRoles = async () => {
    try {
      const storedRolesData = localStorage.getItem("rolesData");
      if (storedRolesData) {
        const { data, timestamp } = JSON.parse(storedRolesData);
        const expirationTime = 24 * 60 * 60 * 1000; // 1 día en milisegundos

        // Verifica si los datos en caché no han caducado
        if (Date.now() - timestamp < expirationTime) {
          setRoles(data);
          return;
        }
      }

      // Realiza la solicitud al backend si los datos han caducado o no existen en localStorage
      const response = await fetch("/api/v1/dashboard/roles");
      if (response.ok) {
        const responseData = await response.json();
        setRoles(responseData);

        // Guarda los datos y la marca de tiempo en localStorage
        localStorage.setItem(
          "rolesData",
          JSON.stringify({ data: responseData, timestamp: Date.now() })
        );
      } else {
        console.error("Error al obtener los roles", response.statusText);
      }
    } catch (error) {
      console.error("Error al obtener los roles", error);
    }
  };

  useEffect(() => {
    getRoles();
  }, []);

  return roles;
};

export default useRolesData;
