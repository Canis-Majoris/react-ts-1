import React from "react";
import "./index.less";

export interface BackgroundImageProps extends React.ComponentProps<"div"> {
  loading?: boolean;
  src: string;
  position?: string;
  size?: string;
  repeat?: string;
  overlay?: any;
  aspectRatio?: any;
}

const BackgroundImage = ({
  loading,
  src,
  position = "center",
  size = "cover",
  repeat = "no-repeat",
  className,
  style,
  overlay,
  aspectRatio = "auto",
  onClick,
  ...rest
}: BackgroundImageProps) => (
  <div
    className={`background-image ${className || ""} ${
      !!overlay ? "with-overlay" : ""
    }`}
    style={{
      ...(src ? { backgroundImage: `url(${src})` } : {}),
      backgroundSize: size,
      backgroundRepeat: repeat,
      backgroundPosition: position,
      aspectRatio,
      ...(onClick ? { cursor: "pointer" } : null),
      ...style,
    }}
    onClick={onClick}
    {...rest}
  >
    {overlay && <div className="background-image-overlay">{overlay}</div>}
  </div>
);

export default BackgroundImage;
