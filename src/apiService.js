import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';

async function getImages(params) {
  const { query, page, key, perpage } = params;
  try {
    const response = await axios.get(
      `?image_type=photo&orientation=horizontal&q=${query}&page=${page}&per_page=${perpage}&key=${key}`,
    );

    return response;
  } catch (error) {
    return error;
  }
}

export default getImages;
