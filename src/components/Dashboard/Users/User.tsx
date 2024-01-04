"use client";

import { IUser } from "@/shared/types";
import Image from "next/image";
import { useState } from "react";
const User = (props: IUser) => {
  const [showRolesList, setShowRolesList] = useState(false);
  const [selectedRole, setSelectedRole] = useState(props.role.name);

  const handleSave = () => {
    console.log("Rol seleccionado:", selectedRole);
    setShowRolesList(false);
  };
  const styleByRole: { [key: string]: string } = {
    Administrador: "bg-blue-500",
    Usuario: "bg-red-500",
    Delivery: "bg-green-500",
  };
  return (
    <div className="flex flex-col justify-between gap-2 bg-white shadow-lg rounded-lg p-2 w-72 overflow-hidden">
      <div>
        {props.image && (
          <Image
            unoptimized
            src={props.image}
            width={500}
            height={500}
            alt={props.name}
            className="rounded-md"
          />
        )}
        <span className="text-gray-600 line-clamp-1 hover:line-clamp-none">
          {props.email}
        </span>
        <h2 className="text-xl line-clamp-1 hover:line-clamp-none font-semibold text-gray-800">
          {props.name}
        </h2>
      </div>
      {showRolesList ? (
        <div>
          <ul className="flex flex-col gap-1">
            {Object.keys(styleByRole).map((roleName) => (
              <li
                key={roleName}
                className={`${styleByRole[roleName]} ${
                  roleName === selectedRole ? "font-bold text-white" : ""
                } p-2 rounded-lg text-center hover:cursor-pointer`}
                onClick={() => setSelectedRole(roleName)}
              >
                {roleName}
              </li>
            ))}
          </ul>
          <div className="flex mt-2">
            <button
              type="button"
              className="bg-gray-300 text-gray-700 px-2 py-1 rounded mr-2"
              onClick={() => setShowRolesList(false)}
            >
              Cancelar
            </button>
            <button
              type="button"
              className="bg-blue-500 text-white px-2 py-1 rounded"
              onClick={handleSave}
            >
              Guardar
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
