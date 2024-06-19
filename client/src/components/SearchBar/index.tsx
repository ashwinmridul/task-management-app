import { TextField, InputAdornment, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import React, { useState } from 'react';

const SearchBar = React.memo(() => {
  const [searchValue, setSearchValue] = useState('');

  const handleClear = () => {
    setSearchValue('');
  };

  return (
    <TextField
      id="search-input"
      label="Search"
      variant="outlined"
      fullWidth
      size="small"
      value={searchValue}
      onChange={(e) => setSearchValue(e.target.value)}
      sx={{
        '& .MuiInputBase-root': {padding: 0, paddingLeft: '10px'}
      }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={handleClear}>
              <ClearIcon />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
});

SearchBar.displayName = 'SearchBar';
export default SearchBar;
