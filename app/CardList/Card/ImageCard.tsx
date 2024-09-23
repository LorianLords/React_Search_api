import defaultImg from '@/public/react.svg';
import React, { useState } from 'react';
import placeholder from '@/public/placeholder.jpg';
import Image from 'next/image';

interface imageProps {
  image: string | null;
}
const ImageCard = ({ image }: imageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);

  console.log(image);
  return (
    <div style={{ position: 'relative' }}>
      {/* {!isLoaded && <Image src={placeholder} alt="placeholder" />}*/}
      <Image
        src={image || defaultImg}
        alt="picture"
        onLoad={() => setIsLoaded(true)}
        onError={() => setIsLoaded(false)}
        style={{ display: isLoaded ? 'block' : 'none' }}
        width={300}
        height={300}
        /* layout="fill" // Will size the image to fill the parent container
        objectFit="contain" // see - https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit
        objectPosition="center"*/
        /* placeholder={'blur'}
        blurDataURL={image || defaultImg}*/
      />
    </div>
  );
};

export default ImageCard;
