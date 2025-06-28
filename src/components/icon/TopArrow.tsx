interface TopArrowProps {
    className?: string;
    color?: string;
    size?: number;
  }
  
  export const TopArrow = ({ 
    className = "", 
    color = "#000000", 
    size = 48 
  }: TopArrowProps) => {
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
            d="M7 14L12 9L17 14" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
        </svg>
      </div>
    );
  };