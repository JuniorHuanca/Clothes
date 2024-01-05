import { IUser } from "@/shared/types";
import { useEffect, useState } from "react";

const useDeliveries = () => {
  const [deliveries, setDeliveries] = useState<IUser[]>([]);

  const getDeliveries = async () => {
    try {
      const storedRolesData = localStorage.getItem("deliveries");
      if (storedRolesData) {
        const { data, timestamp } = JSON.parse(storedRolesData);
        const expirationTime = 5 * 60 * 1000; // 5 minutos en milisegundos

        // Verifica si los datos en caché no han caducado
        if (Date.now() - timestamp < expirationTime) {
          setDeliveries(data);
          return;
        }
      }

      // Realiza la solicitud al backend si los datos han caducado o no existen en localStorage
      const response = await fetch("/api/v1/dashboard/users/deliveries");
      if (response.ok) {
        const responseData = await response.json();
        setDeliveries(responseData);

        // Guarda los datos y la marca de tiempo en localStorage
        localStorage.setItem(
          "deliveries",
          JSON.stringify({ data: responseData, timestamp: Date.now() })
        );
      } else {
        console.error("Error al obtener los deliveries", response.statusText);
      }
    } catch (error) {
      console.error("Error al obtener los deliveries", error);
    }
  };

  useEffect(() => {
    getDeliveries();
  }, []);

  return deliveries;
};

export default useDeliveries;
