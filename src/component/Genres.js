import { Chip } from "@mui/material";
import axios from "axios";
import React, { useEffect } from "react";

const Genres = ({
  selectedGenres,
  setSelectedGenres,
  genres,
  setGenres,
  type,
  setPage,
}) => {
  const handleAddGenre = (genre) => {
    setSelectedGenres([...selectedGenres, genre]);
    setGenres(genres.filter((item) => item.id !== genre.id));
    setPage(1);
  };

  const handleRemove = (genre) => {
    setSelectedGenres(selectedGenres.filter((item) => item.id !== genre.id));
    setGenres([...genres, genre]);
    setPage(1);
  };

  const fetchGenres = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/genre/${type}/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    );
    setGenres(data.genres);
  };

  // console.log("genres", genres);

  useEffect(() => {
    fetchGenres();

    return () => {
      setGenres({});
    };
    // eslint-disable-next-line
  }, []);

  return (
    <div style={{ padding: "6px 0" }}>
      {selectedGenres &&
        selectedGenres.map((item) => (
          <Chip
            label={item.name}
            style={{ margin: 2 }}
            size='small'
            key={item.id}
            clickable
            onDelete={()=>handleRemove(item)}
          />
        ))}
      {genres &&
        genres.map((item) => (
          <Chip
            label={item.name}
            style={{ margin: 2 }}
            size='small'
            key={item.id}
            color='primary'
            clickable
            onClick={() => handleAddGenre(item)}
          />
        ))}
    </div>
  );
};

export default Genres;
