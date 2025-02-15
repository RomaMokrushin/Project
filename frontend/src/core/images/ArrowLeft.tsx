import type { SVGProps } from "react";

const ArrowLeft: React.FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg
    width="32px"
    height="32px"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g id="SVGRepo_bgCarrier" strokeWidth="0" />
    <g
      id="SVGRepo_tracerCarrier"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <g id="SVGRepo_iconCarrier">
      <path
        d="M5 12H19M5 12L11 6M5 12L11 18"
        stroke="#000000"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
  </svg>
);

export default ArrowLeft;
