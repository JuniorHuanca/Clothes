type Props = {
  text?: string;
};

const NotFoundProducts = ({ text = "No se encontraron productos." }: Props) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <h2 className="text-3xl font-bold mb-4 text-gray-800">¡Oops!</h2>
      <p className="text-lg text-gray-600 mb-8 text-center">{text}</p>
      <img
        src="https://cdn.pixabay.com/photo/2016/11/18/23/38/child-1837375_960_720.png"
        alt="Error 404"
        className="max-w-xs"
      />
    </div>
  );
};

export default NotFoundProducts;
