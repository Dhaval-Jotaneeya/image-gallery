// lib/github.js
import axios from 'axios';

const USERNAME = 'FamilyWebsites';

export const fetchRepositories = async () => {
  const REPO_URL = `https://api.github.com/users/${USERNAME}/repos`;
  try {
    const response = await axios.get(REPO_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching repositories from GitHub:', error);
    return [];
  }
};

// Existing fetchImages function remains unchanged
export const fetchImages = async (repoName) => {
  const FULL_IMAGES_REPO = `https://api.github.com/repos/${USERNAME}/${repoName}/contents/images`;
  const THUMBNAILS_REPO = `https://api.github.com/repos/${USERNAME}/${repoName}/contents/images/thumbnails`;

  try {
    const [fullImagesResponse, thumbnailsResponse] = await Promise.all([
      axios.get(FULL_IMAGES_REPO),
      axios.get(THUMBNAILS_REPO)
    ]);

    const fullImages = fullImagesResponse.data
      .filter(file => file.type === 'file' && /\.(jpg|jpeg|png|gif)$/i.test(file.name))
      .map(file => ({ name: file.name, url: file.download_url }));

    const thumbnails = thumbnailsResponse.data
      .filter(file => file.type === 'file' && /\.(jpg|jpeg|png|gif)$/i.test(file.name))
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
