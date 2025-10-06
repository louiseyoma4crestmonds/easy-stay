type ListconProps = {
  className?: string;
};

function ListIcon({ className }: ListconProps) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M3.33301 5H16.6663H3.33301ZM3.33301 10H16.6663H3.33301ZM3.33301 15H16.6663H3.33301Z"
        fill="currentColor"
      />
      <path
        d="M3.33301 15H16.6663M3.33301 5H16.6663H3.33301ZM3.33301 10H16.6663H3.33301Z"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}

export default ListIcon;
