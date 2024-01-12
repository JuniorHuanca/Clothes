import { useFetch } from "@/hooks/useFetch";
import { IUser } from "@/shared/types";
import User from "./User";

type Props = {};

const Users = async (props: Props) => {
  const data = await useFetch<IUser[]>(
    `${process.env.BASE_URL}/api/v1/dashboard/users`
  );

  return (
    <div className="flex flex-wrap justify-center gap-2">
      {data.map((e) => (
        <User key={e.id} {...e} />
      ))}
      {data.length === 0 && (
        <p className="text-center">Usuarios no encontrados</p>
      )}
    </div>
  );
};

export default Users;
