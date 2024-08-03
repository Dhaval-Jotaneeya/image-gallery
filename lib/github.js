// lib/github.js
import axios from 'axios';

const FULL_IMAGES_REPO = 'https://api.github.com/repos/FamilyWebsites/2023-My-Birthday-Celebration-in-Office/contents/photos';
const THUMBNAILS_REPO = 'https://api.github.com/repos/FamilyWebsites/2023-My-Birthday-Celebration-in-Office/contents/photos/thumbnails';

export const fetchImages = async () => {
  try {
    const [fullImagesResponse, thumbnailsResponse] = await Promise.all([
      axios.get(FULL_IMAGES_REPO),
      axios.get(THUMBNAILS_REPO)
    ]);

    const fullImages = fullImagesResponse.data
      .filter(file => file.type === 'file')
      .map(file => ({ name: file.name, url: file.download_url }));

    const thumbnails = thumbnailsResponse.data
      .filter(file => file.type === 'file' )
      .map(file => ({ name: file.name, url: file.download_url }));

    const images = fullImages.map(image => {
      const thumbnail = thumbnails.find(thumb => thumb.name === image.name);
      return {
        name: image.name,
        fullUrl: image.url,
        thumbnailUrl: thumbnail ? thumbnail.url : image.url // Fallback to full image if thumbnail not found
      };
    });

    return images;
  } catch (error) {
    console.error('Error fetching images from GitHub:', error);
    return [];
  }
};
