import React, { useEffect, useState } from 'react';
import { MdGroups } from 'react-icons/md';

const BannerImage = ({ bannerUrl, height = '200px', borderRadius = '0px' }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!bannerUrl) return;
    const img = new Image();
    img.src = bannerUrl;
    img.onload = () => setLoaded(true);
  }, [bannerUrl]);

  return (
    <div
      className="banner-container"
      style={{ height }}>
      {!loaded && bannerUrl && <div className="banner-skeleton" />}
      {bannerUrl && loaded ? (
        <img
          src={bannerUrl}
          style={{ borderRadius }}
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
