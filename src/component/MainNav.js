import * as React from "react";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import TheatersIcon from "@mui/icons-material/Theaters";
import LiveTvIcon from "@mui/icons-material/LiveTv";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";

export default function SimpleBottomNavigation() {
  const [value, setValue] = React.useState(0);
  let navigate = useNavigate();

  React.useEffect(() => {
    if (value === 0) {
      navigate("/");
    } else if (value === 1) {
      navigate("/movies");
    } else if (value === 2) {
      navigate("/series");
    } else if (value === 3) {
      navigate("/search");
    }
  }, [value]);

  return (
    <>
      <Box
        sx={{
          width: 1,
          position: "fixed",
          bottom: 0,
          zIndex: 100,
          backgroundColor: "#2d313a",
        }}>
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}>
          <BottomNavigationAction label='Trending' icon={<WhatshotIcon />} />
          <BottomNavigationAction label='Movies' icon={<TheatersIcon />} />
          <BottomNavigationAction label='TV Series' icon={<LiveTvIcon />} />
          <BottomNavigationAction label='Search' icon={<SearchIcon />} />
        </BottomNavigation>
      </Box>
    </>
  );
}
