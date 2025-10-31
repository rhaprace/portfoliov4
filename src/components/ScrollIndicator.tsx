export const ScrollIndicator = () => {
  return (
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
      <span className="text-sm text-gray-600 font-medium">Scroll Down</span>
      <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center p-1">
        <div className="w-1.5 h-3 bg-gray-600 rounded-full"></div>
      </div>
    </div>
  );
};

