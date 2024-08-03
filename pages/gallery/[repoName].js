// pages/gallery/[repoName].js
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { fetchImages } from '../../lib/github';

const Gallery = () => {
  const router = useRouter();
  const { repoName } = router.query;
  const [images, setImages] = useState([]);

  useEffect(() => {
    if (repoName) {
      const getImages = async () => {
        const images = await fetchImages(repoName);
        setImages(images);
      };
      getImages();
    }
  }, [repoName]);

  return (
    <div>
      <h1>{repoName} Image Gallery</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {images.map((image, index) => (
          <div key={index} style={{ margin: '10px' }}>
            <img
              src={image.thumbnailUrl}
              alt={`Thumbnail ${index}`}
              style={{ width: '200px', cursor: 'pointer' }}
              onClick={() => window.open(image.fullUrl, '_blank')}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
