import React, { ReactNode } from "react";

interface TooltipProps {
  /** The text or node to show inside the tooltip */
  content: ReactNode;
  /** Element that triggers the tooltip (e.g. a button or icon) */
  children: ReactNode;
  /** Optional: top | bottom | left | right */
  position?: "top" | "bottom" | "left" | "right";
}

function Tooltip({ content, children, position = "top" }: TooltipProps) {
  const positionClasses: Record<string, string> = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-1.5 ",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
    left: "right-full top-1/2 -translate-y-1/2 mr-2",
    right: "left-full top-1/2 -translate-y-1/2 ml-2",
  };

  const arrowClasses: Record<string, string> = {
    top: "top-full left-1/2 -translate-x-1/2 border-t-white",
    bottom: "bottom-full left-1/2 -translate-x-1/2 border-b-white",
    left: "left-full top-1/2 -translate-y-1/2 border-l-white",
    right: "right-full top-1/2 -translate-y-1/2 border-r-white",
  };

  return (
    <div className="relative inline-block group">
      {children}
      <span
        className={`
          absolute
          ${positionClasses[position]}
          px-3 py-1 
          text-xs text-gray-800
          bg-white shadow-lg
          rounded
          opacity-0
          pointer-events-none
          transition-opacity duration-200
          group-hover:opacity-100
          whitespace-nowrap
          z-50
        `}
      >
        {content}

        <span
          className={`absolute w-0 h-0 border-4 border-transparent ${arrowClasses[position]}`}
        />
      </span>
    </div>
  );
}

export default Tooltip;
