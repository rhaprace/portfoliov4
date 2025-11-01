interface ImageContainerProps {
  src: string;
  alt: string;
  className?: string;
}

export const ImageContainer = ({
  src,
  alt,
  className = ""
}: ImageContainerProps) => {
  return (
    <div className={`w-full aspect-[16/10] md:aspect-[4/3] lg:aspect-[3/2] bg-gray-100 overflow-hidden rounded-2xl shadow-lg ${className}`}>
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-fill"
        loading="lazy"
      />
    </div>
  );
};

