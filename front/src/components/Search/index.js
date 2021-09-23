import { TextField, InputAdornment, IconButton } from "@mui/material";
import SearchTwoToneIcon from "@mui/icons-material/SearchTwoTone";
import SearchResult from "./result";

const Search = ({ onSearch, jobs, onNextPage, hasMore }) => {
  const onKeyDown = (e) => {
    if (e.keyCode === 13) {
      onSearch(e.target.value);
    }
  };

  const onChange = (e) => onSearch(e.target.value);

  return (
    <>
      <TextField
        onKeyDown={onKeyDown}
        style={{ marginBottom: 20 }}
        fullWidth
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={onChange}
                edge="end"
              >
                <SearchTwoToneIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <SearchResult jobs={jobs} onNextPage={onNextPage} hasMore={hasMore} />
    </>
  );
};

export default Search;
