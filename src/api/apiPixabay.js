import axios from 'axios';

const MY_KEY = '34183699-29109d6fbf2dd60241f6d6e15';
const BASE_URL = 'https://pixabay.com/api/';
const OPTIONS_FOR_RESPONSE =
  'image_type=photo&orientation=horizontal&safesearch=true';

export const fetchImages = async (searchQuerry, page) => {
  return await axios.get(
    `${BASE_URL}?q=${searchQuerry}&page=${page}&key=${MY_KEY}&${OPTIONS_FOR_RESPONSE}&per_page=12`
  );
};
