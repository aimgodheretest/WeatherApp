import { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import FilterDramaTwoToneIcon from "@mui/icons-material/FilterDramaTwoTone";
import GpsFixedIcon from "@mui/icons-material/GpsFixed";
import { styled } from "@mui/material/styles";

const SearchField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#4b5563",
    },
    "&:hover fieldset": {
      borderColor: "#6b7280",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#9ca3af",
    },
    backgroundColor: "#374151",
    borderRadius: "8px",
    color: "white",
  },
  "& .MuiInputLabel-root": {
    color: "#9ca3af",
  },
  "& .MuiInputBase-input": {
    color: "white",
  },
});

const Navbar = ({ onSearch, onCurrentLocation }) => {
  const [searchCity, setSearchCity] = useState("");

  const handleSearchClick = () => {
    if (searchCity.trim()) {
      onSearch(searchCity);
      setSearchCity("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearchClick();
    }
  };

  return (
    <nav className="bg-gray-800 py-3 px-6 shadow-md">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Logo Section */}
        <div className="flex items-center gap-2">
          <FilterDramaTwoToneIcon className="text-blue-400 text-2xl" />
          <p className="font-bold text-xl bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
            WeatherDash
          </p>
        </div>

        {/* Search Section */}
        <div className="flex-1 max-w-md flex items-center gap-2 w-full">
          <SearchField
            variant="outlined"
            placeholder="Search city..."
            size="small"
            value={searchCity}
            onChange={(e) => setSearchCity(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon className="text-gray-400" />
                </InputAdornment>
              ),
            }}
          />
          <Button
            variant="contained"
            onClick={handleSearchClick}
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-md h-[40px]"
            disableElevation
          >
            Search
          </Button>
        </div>

        {/* Location Button */}
        <button
          onClick={onCurrentLocation}
          className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-md transition-colors duration-200"
        >
          <GpsFixedIcon className="text-blue-400" />
          <span className="text-sm font-medium">Current Location</span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
