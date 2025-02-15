import type { SVGProps } from "react";

const Invites: React.FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M16 0H2C0.9 0 0 0.9 0 2V16C0 17.1 0.9 18 2 18H16C17.1 18 18 17.1 18 16V2C18 0.9 17.1 0 16 0ZM16 2V11H12.44C12.08 11 11.76 11.19 11.58 11.5C11.06 12.4 10.11 13 9 13C7.89 13 6.94 12.4 6.42 11.5C6.24 11.19 5.91 11 5.56 11H2V2H16Z"
      fill="#007AFF"
    />
  </svg>
);

export default Invites;
