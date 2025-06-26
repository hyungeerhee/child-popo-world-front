interface SpeechBubbleProps {
  children: React.ReactNode;
  className?: string;
}

export const SpeechBubble = ({ className = "", children }: SpeechBubbleProps) => {
  return (
    <div className={` ${className}`}>
      <div className="relative">
        {/* 말풍선 본체 */}
        <div className="flex flex-col-reverse text-sm bg-white rounded-lg px-4 py-2 w-[15rem] ">
          {children}
        </div>
        {/* 화살표 */}
        <div
          className={`absolute -bottom-1 left-1/2 -translate-x-1/2 border-t-white border-t-8 border-x-transparent border-x-8 border-b-0`}
        />
      </div>
    </div>
  );
};
