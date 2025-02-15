import type { SVGProps } from "react";

const AddGroup: React.FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg
    width="110px"
    height="110px"
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
        stroke="#007aff"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8 12H16"
        stroke="#007aff"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 16V8"
        stroke="#007aff"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
  </svg>
);

export default AddGroup;
