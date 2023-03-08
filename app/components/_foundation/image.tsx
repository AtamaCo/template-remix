export interface ImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
}

export interface ImageData extends Omit<ImageProps, 'className'> {}

export function Image({ src, alt, className, width, height }: ImageProps) {
  return (
    <img
      src={src}
      className={className}
      alt={alt}
      width={width}
      height={height}
    />
  );
}
