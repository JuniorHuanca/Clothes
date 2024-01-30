type Props = {
  text: string;
  icon: React.ReactNode;
  alignment?: "left" | "right" | "top" | "bottom";
};

const alignmentBox = {
  left: "top-1/2 transform -translate-y-1/2 right-[120%]",
  right: "top-1/2 transform -translate-y-1/2 left-[120%]",
  top: "left-1/2 transform -translate-x-1/2 bottom-[130%]",
  bottom: "left-1/2 transform -translate-x-1/2 top-[130%]",
};

const alignmentArrow = {
  left: "top-1/2 transform -translate-y-1/2 -right-[2%]",
  right: "top-1/2 transform -translate-y-1/2 -left-[2%]",
  top: "left-1/2 transform -translate-x-1/2 -bottom-[10%]",
  bottom: "left-1/2 transform -translate-x-1/2 -top-[10%]",
};

const Tooltip = ({ icon, text, alignment = "bottom" }: Props) => {
  return (
    <div className="relative inline-block">
      <div className="peer relative">{icon}</div>
      <div
        className={`w-max absolute hidden peer-hover:block bg-black p-2 rounded-md shadow-md text-white text-center z-10 ${alignmentBox[alignment]}`}
      >
        <span
          className={`-z-10 w-3 h-3 bg-black absolute ${alignmentArrow[alignment]} rotate-45`}
        />
        <p>{text}</p>
      </div>
    </div>
  );
};

export default Tooltip;
