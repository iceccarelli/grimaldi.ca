import Image from 'next/image';

export type PlateProps = {
  src: string;
  alt: string;
  code: string;
  title: string;
  caption: string;
  priority?: boolean;
  className?: string;
  sizes?: string;
};

/**
 * Responsive editorial image plate.
 * Local assets are optimized by next/image; only the lead image is preloaded.
 */
export default function Plate({
  src,
  alt,
  code,
  title,
  caption,
  priority = false,
  className = '',
  sizes = '(max-width: 720px) 100vw, (max-width: 1100px) 50vw, 33vw',
}: PlateProps) {
  return (
    <figure className={('plate ' + className).trim()}>
      <div className="plate-media">
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          quality={82}
        />
      </div>
      <figcaption className="plate-caption">
        <span className="plate-code">{code}</span>
        <strong className="plate-title">{title}</strong>
        <span className="plate-note">{caption}</span>
      </figcaption>
    </figure>
  );
}
