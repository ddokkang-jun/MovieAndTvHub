import { Button, Tab, Tabs, TextField, ThemeProvider } from "@mui/material";
import React, { useEffect, useState } from "react";
import { createTheme } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import SingleContent from "../../component/SingleContent/SingleContent";
import CustomPagination from "../../component/Pagination/CustomPagination";

const Search = () => {
  const [type, setType] = useState(0);
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [content, setContent] = useState();
  const [numOfPages, setNumOfPages] = useState();

  const darkTheme = createTheme({
    palette: {
      type: "dark",
      primary: {
        main: "#fff",
      },
    },
  });

  const fetchSearch = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/search/${type ? "tv" : "movie"}?api_key=${
        process.env.REACT_APP_API_KEY
      }&language=en-US&query=${searchText}&page=${page}&include_adult=false`
    );
    // console.log("data",data);
    setContent(data.results);
    setNumOfPages(data.total_pages);
  };

  useEffect(() => {
    window.scroll(0, 0);
    fetchSearch();
  }, [type, page]);

  return (
    <div>
      <ThemeProvider theme={darkTheme}>
        <div style={{ display: "flex", margin: "15px 0" }}>
          <TextField
            style={{ flex: 1 }}
            className='searchBox'
            label='Search'
            variant='filled'
            onChange={(event) => setSearchText(event.target.value)}
          />
          <Button
            variant='contained'
            style={{ marginLeft: 10 }}
            onClick={fetchSearch}>
            <SearchIcon />
          </Button>
        </div>

        <Tabs
          value={type}
          indicatorColor='primary'
          textColor='primary'
          style={{ paddingBottom: 5 }}
          onChange={(event, newValue) => {
            setType(newValue);
            setPage(1);
          }}>
          <Tab style={{ width: "50%" }} label='Search Movies' />
          <Tab style={{ width: "50%" }} label='Search TV Series' />
        </Tabs>
      </ThemeProvider>

      <div className='trending'>
        {content &&
          content.map((item) => (
            <SingleContent
              key={item.id}
              id={item.id}
              poster={item.poster_path}
              title={item.title || item.name}
              date={item.first_air_date || item.release_date}
              media_type={type ? "tv" : "movie"}
              vote_average={item.vote_average}
            />
          ))}
        {searchText &&
          !content &&
          (type ? <h2>No Series Found</h2> : <h2>No Movies Found</h2>)}
      </div>
      {numOfPages > 1 && (
        <CustomPagination setPage={setPage} numOfPages={numOfPages} />
      )}
    </div>
  );
};

export default Search;
