import React, { useState } from 'react';

const BannerImage = ({ bannerUrl }) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="banner-container">
      {!loaded && <div className="banner-skeleton" />}
      <img
        src={
          bannerUrl ||
          'https://placehold.co/300x150/25aff3/ffffff?text=Group+Banner'
        }
        alt="Group Banner"
        className={`cover ${loaded ? 'show' : 'hide'}`}
        onLoad={() => setLoaded(true)}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src =
            'https://placehold.co/300x150/25aff3/ffffff?text=Group+Banner';
          setLoaded(true);
        }}
      />
    </div>
  );
};

export default BannerImage;
