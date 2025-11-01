interface SectionTitleProps {
  children: React.ReactNode;
  align?: "left" | "center" | "right";
  className?: string;
}

export const SectionTitle = ({
  children,
  align = "left",
  className = "",
}: SectionTitleProps) => {
  const alignmentClass = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  }[align];

  return (
    <h2
      className={`text-5xl md:text-7xl lg:text-8xl font-black leading-none ${alignmentClass} ${className}`}
    >
      {children}
    </h2>
  );
};

