import type { ShapeType } from "../data/symbols";

interface GeometricShapeProps {
  shape: ShapeType;
  gradient: string;
  size: number;
}

export const GeometricShape = ({ shape, gradient, size }: GeometricShapeProps) => {
  const renderShape = () => {
    const baseClasses = `bg-gradient-to-br ${gradient} shadow-xl border-2 border-gray-400`;

    switch (shape) {
      case "circle":
        return (
          <div
            className={`${baseClasses} rounded-full`}
            style={{ width: size, height: size }}
          />
        );

      case "square":
        return (
          <div
            className={`${baseClasses} rounded-lg`}
            style={{ width: size, height: size }}
          />
        );

      case "triangle":
        return (
          <div
            className="relative"
            style={{ width: size, height: size }}
          >
            <div
              className={`absolute inset-0 bg-gradient-to-br ${gradient} shadow-xl border-2 border-gray-400`}
              style={{
                clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
              }}
            />
          </div>
        );

      case "diamond":
        return (
          <div
            className={`${baseClasses} rotate-45`}
            style={{ width: size * 0.7, height: size * 0.7 }}
          />
        );

      case "hexagon":
        return (
          <div
            className="relative"
            style={{ width: size, height: size }}
          >
            <div
              className={`absolute inset-0 bg-gradient-to-br ${gradient} shadow-xl border-2 border-gray-400`}
              style={{
                clipPath: "polygon(30% 0%, 70% 0%, 100% 50%, 70% 100%, 30% 100%, 0% 50%)",
              }}
            />
          </div>
        );

      case "star":
        return (
          <div
            className="relative"
            style={{ width: size, height: size }}
          >
            <div
              className={`absolute inset-0 bg-gradient-to-br ${gradient} shadow-xl border-2 border-gray-400`}
              style={{
                clipPath: "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
              }}
            />
          </div>
        );

      default:
        return null;
    }
  };

  return <div className="flex items-center justify-center">{renderShape()}</div>;
};

