import { Session } from "next-auth";
import { toast } from "sonner";

type Types = {
  session: Session | null;
  quantity: number;
  size: string;
  productSlug: string;
  setIsProcessing: (value: boolean) => void;
  refresh: () => void;
};

export const handleItemCart = async ({
  session,
  quantity,
  size,
  productSlug,
  setIsProcessing,
  refresh,
}: Types) => {
  if (!session) return toast.error("Necesitas iniciar sesión para continuar");
  setIsProcessing(true);
  try {
    const res = await fetch(`/api/v1/cart`, {
      method: "PATCH",
      body: JSON.stringify({
        userId: session.user.id,
        product: {
          quantity,
          size,
          productSlug,
        },
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.ok) {
      toast.success("Operación en el carro completada correctamente");
    } else {
      const data = await res.json();
      toast.error(data.message);
    }
    refresh();
  } catch (error) {
    toast.error("Se produjo un error al agregar el producto al carrito");
  } finally {
    setIsProcessing(false);
  }
};
