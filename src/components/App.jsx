import { useState, useEffect } from 'react';
import { AppComponent } from './App.styled';
import { SearchBar } from './SearchBar/SearchBar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { LoadMoreBtn } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';
import { fetchImages } from 'api/apiPixabay';
import Notiflix from 'notiflix';

export const App = () => {
  const [searchQuerry, setSearchQuerry] = useState('');

  const [images, setImages] = useState([]);

  const [page, setPage] = useState(1);

  const [isLoading, setIsLoading] = useState(false);

  const [showButton, setShowButton] = useState(false);

  const [showModal, setShowModal] = useState(false);

  const [largeImage, setLargeImage] = useState('');

  useEffect(() => {
    if (!searchQuerry) {
      return;
    }

    try {
      const getImages = async () => {
        const {
          data: { hits, totalHits },
        } = await fetchImages(searchQuerry, page);

        const filteredData = hits.map(
          ({ id, webformatURL, largeImageURL, tags }) => ({
            id,
            webformatURL,
            largeImageURL,
            tags,
          })
        );
        if (!filteredData.length) {
          setShowButton(false);
          setIsLoading(false);
          Notiflix.Notify.warning('Enter another word to search');
          return;
        }

        const isLastPage = Math.ceil(totalHits / 12) !== page;
        setShowButton(isLastPage);

        setImages(prevHits => [...prevHits, ...filteredData]);
        setIsLoading(false);
      };
      getImages();
    } catch (e) {
      console.log(e);
    }
  }, [page, searchQuerry]);

  const onLoadMore = () => {
    setIsLoading(true);
    const nextPage = page + 1;
    setPage(nextPage);
  };

  const handleSubmit = searchWord => {
    setSearchQuerry(searchWord.toLowerCase().trim());
    setPage(1);
    setImages([]);
    setShowButton(false);
    setIsLoading(true);
  };

  const onShowModal = image => {
    setLargeImage(image);
    setShowModal(true);
  };

  const closeModal = () => {
    setLargeImage('');
    setShowModal(false);
  };

  return (
    <AppComponent>
      <SearchBar handlerSubmit={handleSubmit} />
      <ImageGallery hits={images} showModal={onShowModal} />
      {isLoading && <Loader />}
      {showButton && <LoadMoreBtn onClick={onLoadMore} />}
      {showModal && <Modal closeModal={closeModal} largeImage={largeImage} />}
    </AppComponent>
  );
};
