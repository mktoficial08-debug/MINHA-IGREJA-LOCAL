import React from 'react';

const ChurchIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M18 7.5L12 2L6 7.5V22H18V7.5Z" />
    <path d="M12 22V16" />
    <path d="M10 9H14" />
    <path d="M12 7V11" />
  </svg>
);

export default ChurchIcon;
