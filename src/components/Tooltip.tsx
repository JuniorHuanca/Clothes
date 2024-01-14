// type Props = {
//   text: string;
//   icon: React.ReactNode;
//   alignment?: "left" | "center" | "right";
// };

// const alignmentClasses = {
//   left: "left-1",
//   right: "right-1",
//   center: "left-1/2 transform -translate-x-1/2",
// };

// const Tooltip = ({ icon, text, alignment = "center" }: Props) => {
//   const tooltipClasses = `absolute hidden peer-hover:block bg-teal-600 p-2 rounded-md shadow-md text-white text-center z-10 ${
//     alignment === "center"
//       ? alignmentClasses[alignment]
//       : alignment === "right"
//       ? "right-0"
//       : "left-0"
//   } mt-2`;

//   return (
//     <div className="relative inline-block">
//       <div className="peer relative">{icon}</div>
//       <div className={tooltipClasses}>
//         <span
//           className={`-z-10 w-4 h-4 bg-teal-600 absolute top-0 ${alignmentClasses[alignment]} -mt-1 rotate-45`}
//         />
//         {text}
//       </div>
//     </div>
//   );
// };

// export default Tooltip;

type Props = {
  text: string;
  icon: React.ReactNode;
  alignment?: "left" | "right" | "top" | "button";
};

const alignmentBox = {
  left: "top-1/2 transform -translate-y-1/2 left-8",
  right: "top-1/2 transform -translate-y-1/2 right-8",
  top: "left-1/2 transform -translate-x-1/2 mt-2",
  button: "left-1/2 transform -translate-x-1/2 mt-2",
};

const alignmentArrow = {
  left: "top-1/2 transform -translate-y-1/2 -left-1",
  right: "top-1/2 transform -translate-y-1/2 -right-1",
  top: "left-1/2 transform -translate-x-1/2 mt-2",
  button: "left-1/2 transform -translate-x-1/2 -top-1",
};

const Tooltip = ({ icon, text, alignment = "button" }: Props) => {
  return (
    <div className="relative inline-block">
      <div className="peer relative">{icon}</div>
      <div
        className={`absolute hidden peer-hover:block bg-teal-600 p-2 rounded-md shadow-md text-white text-center z-10 ${alignmentBox[alignment]}`}
      >
        <span
          className={`-z-10 w-4 h-4 bg-teal-600 absolute top-0 ${alignmentArrow[alignment]} rotate-45`}
        />
        {text}
      </div>
    </div>
  );
};

export default Tooltip;
