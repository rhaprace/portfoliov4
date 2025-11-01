interface ParagraphProps {
  children: React.ReactNode;
  align?: "left" | "center" | "right" | "justify";
  size?: "sm" | "base" | "lg" | "xl";
  className?: string;
}

export const Paragraph = ({
  children,
  align = "left",
  size = "lg",
  className = "",
}: ParagraphProps) => {
  const alignmentClass = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
    justify: "text-justify",
  }[align];

  const sizeClass = {
    sm: "text-base md:text-lg",
    base: "text-lg md:text-xl",
    lg: "text-lg md:text-xl lg:text-2xl",
    xl: "text-xl md:text-2xl lg:text-3xl",
  }[size];

  return (
    <p
      className={`leading-relaxed text-gray-800 font-medium ${alignmentClass} ${sizeClass} ${className}`}
    >
      {children}
    </p>
  );
};

