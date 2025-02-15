import type { SVGProps } from "react";

const Card: React.FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg
    width="20"
    height="16"
    viewBox="0 0 20 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M18 0H2C0.89 0 0.00999999 0.89 0.00999999 2L0 14C0 15.11 0.89 16 2 16H18C19.11 16 20 15.11 20 14V2C20 0.89 19.11 0 18 0ZM17 14H3C2.45 14 2 13.55 2 13V8H18V13C18 13.55 17.55 14 17 14ZM18 4H2V3C2 2.45 2.45 2 3 2H17C17.55 2 18 2.45 18 3V4Z"
      fill="#007AFF"
      fillOpacity="1"
    />
  </svg>
);

export default Card;
