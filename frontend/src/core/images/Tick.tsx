import type { SVGProps } from "react";

const Tick: React.FC<SVGProps<SVGSVGElement>> = (props) => (
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
      <path
        d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
        stroke="#292D32"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.75 12L10.58 14.83L16.25 9.17004"
        stroke="#292D32"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
  </svg>
);

export default Tick;
