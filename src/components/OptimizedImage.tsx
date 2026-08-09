'use client';

import Image, { type ImageProps } from 'next/image';
import { useState, type ReactNode } from 'react';

type OptimizedImageProps = ImageProps & {
  fallback?: ReactNode;
};

export function OptimizedImage({ fallback, onError, ...props }: OptimizedImageProps) {
  const [failed, setFailed] = useState(false);

  if (failed && fallback) return fallback;

  return (
    <Image
      {...props}
      alt={props.alt}
      onError={(event) => {
        setFailed(true);
        onError?.(event);
      }}
    />
  );
}

export default OptimizedImage;
