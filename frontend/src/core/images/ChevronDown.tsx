import type { SVGProps } from "react";

const ChevronDown: React.FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg
    width="64px"
    height="64px"
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
      <rect width="24" height="24" fill="white" />
      <path
        d="M17 9.5L12 14.5L7 9.5"
        stroke="#000000"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
  </svg>
);

export default ChevronDown;
