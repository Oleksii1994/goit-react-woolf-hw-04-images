import PropTypes from 'prop-types';
import { useState } from 'react';
import { FaSistrix } from 'react-icons/fa';
import {
  SearchBarHeader,
  SearchForm,
  SearchInput,
  SearchFormBtn,
  SearchFormBtnLabel,
} from './SearchBar.styled';

export const SearchBar = ({ handlerSubmit }) => {
  const [searchQuerry, setSearchQuerry] = useState('');

  const onChange = ({ target }) => {
    setSearchQuerry(target.value);
  };

  const onSubmit = event => {
    event.preventDefault();

    handlerSubmit(searchQuerry);
    setSearchQuerry('');
  };

  return (
    <SearchBarHeader>
      <SearchForm onSubmit={onSubmit}>
        <SearchFormBtn type="submit" className="button">
          <FaSistrix size="24px" />
          <SearchFormBtnLabel className="button-label">
            Search
          </SearchFormBtnLabel>
        </SearchFormBtn>

        <SearchInput
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={searchQuerry}
          onChange={onChange}
        />
      </SearchForm>
    </SearchBarHeader>
  );
};

SearchBar.propTypes = {
  handlerSubmit: PropTypes.func.isRequired,
};
