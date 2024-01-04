import { useFetch } from "@/hooks/useFetch";
import { IUser } from "@/shared/types";
import User from "./User";

type Props = {};

const Users = async (props: Props) => {
  try {
    const data = await useFetch<IUser[]>(
      `${process.env.BASE_URL}/api/v1/dashboard/users`
    );

    return (
      <div className="flex flex-wrap gap-2">
        {data.map((e) => (
          <User key={e.id} {...e} />
        ))}
        {data.length === 0 && (
          <p className="text-center">Usuarios no encontrados</p>
        )}
      </div>
    );
  } catch (error) {
    if (error instanceof Error) {
      return <p className="text-center">{error.message}</p>;
    }
  }
};

export default Users;
