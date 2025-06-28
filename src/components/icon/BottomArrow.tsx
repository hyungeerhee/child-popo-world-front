interface BottomArrowProps {
  className?: string;
  color?: string;
  size?: number;
}

export const BottomArrow = ({ 
  className = "", 
  color = "#000000", 
  size = 48 
}: BottomArrowProps) => {
  return (
    <div className={`${className}`}>
      <svg 
        width={size} 
        height={size} 
        viewBox="0 0 24 24" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        style={{ color }}
      >
        <path 
          d="M7 10L12 15L17 10" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};