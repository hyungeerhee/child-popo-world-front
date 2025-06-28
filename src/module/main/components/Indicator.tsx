interface IndicatorProps {
  currentStep: number;
  totalSteps: number;
  className?: string;
}

export const Indicator = ({ currentStep, totalSteps, className = "" }: IndicatorProps) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {Array.from({ length: totalSteps }).map((_, index) => (
        <div
          key={index}
          className={`w-2 h-2 rounded-full transition-all duration-300 ${
            index === currentStep - 1 ? "bg-main-yellow-700 w-2 h-2" : "bg-main-yellow-300 w-2 h-2"
          }`}
        />
      ))}
    </div>
  );
};
