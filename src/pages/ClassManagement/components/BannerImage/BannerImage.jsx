import React, { useState } from 'react';
import { MdGroups } from 'react-icons/md';

const BannerImage = ({ bannerUrl }) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="banner-container">
      {!loaded && <div className="banner-skeleton" />}
      {bannerUrl ? (
        <img
          src={bannerUrl}
          alt="Group Banner"
          className="group-banner-img"
        />
      ) : (
        <MdGroups
          size={140}
          color="grey"
        />
      )}
    </div>
  );
};

export default BannerImage;
