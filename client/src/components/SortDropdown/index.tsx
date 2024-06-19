import React, { useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { FormControl, InputLabel } from '@mui/material';

const sortOptions = ['Title', 'Due Date'];

const SortDropdown = React.memo(() => {
  const [sort, setSort] = useState('none');

  const handleChange = (event: SelectChangeEvent) => {
    setSort(event.target.value);
  };

  return (
    <FormControl style={{height: 40, width: 200}}>
        <InputLabel id="sort-by-label">Sort by:</InputLabel>
        <Select
        labelId="sort-by-label"
        label="Sort by:"
        value={sort}
        defaultValue='none'
        onChange={handleChange}
        displayEmpty
        inputProps={{ 'aria-label': 'Filter' }}
        style={{height: 40}}
        >
        <MenuItem value="none">
            <span>None</span>
        </MenuItem>
        {sortOptions.map((option) => (
            <MenuItem key={option} value={option}>
            {option}
            </MenuItem>
        ))}
        </Select>
    </FormControl>
  );
});

SortDropdown.displayName = 'SortDropdown';
export default SortDropdown;
