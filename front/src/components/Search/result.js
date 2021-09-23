import Empty from "../Job/empty";
import List from "../Job/list";
import { Button } from "@mui/material";

const SearchResult = ({ jobs, onNextPage, hasMore }) => (
  <>
    {jobs?.length > 0 ? (
      <>
        <List jobs={jobs} />
        {hasMore && (
          <Button variant="outlined" onClick={onNextPage} fullWidth>
            Load More
          </Button>
        )}
      </>
    ) : (
      <Empty />
    )}
  </>
);

export default SearchResult;
