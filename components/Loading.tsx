import React from 'react';
import loadAnim from '@/public/Animation - 1724982467046.gif';
import Image from 'next/image';
const Loading = () => {
  return (
    <div
      style={{
        display: 'flex ',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        margin: '150px',
      }}
    >
      <Image src={loadAnim} alt="Loading" priority={true} />
    </div>
  );
};

export default Loading;
