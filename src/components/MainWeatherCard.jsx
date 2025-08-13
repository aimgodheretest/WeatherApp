import CloudIcon from "@mui/icons-material/Cloud";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LocationOnIcon from "@mui/icons-material/LocationOn";

const MainWeatherCard = ({ weatherData }) => {
  const temperatureCelsius = weatherData?.main?.temp || "N/A";
  const weatherDescription = weatherData?.weather?.[0]?.description || "N/A";
  const cityName = weatherData?.name || "City not available";
  const countryName = weatherData?.sys?.country || "Country not available";
  const timestamp = weatherData?.dt || null;

  const currentDate = timestamp
    ? new Date(timestamp * 1000).toLocaleDateString("en-US", {
        weekday: "long",
        month: "short",
        day: "numeric",
      })
    : "Date not available";

  const renderTemperatureIcon = () => {
    if (temperatureCelsius > 23) {
      return <WbSunnyIcon className="text-orange-400 text-3xl" />;
    } else if (temperatureCelsius < 10) {
      return <AcUnitIcon className="text-blue-300 text-3xl" />;
    } else {
      return <CloudIcon className="text-gray-300 text-3xl" />;
    }
  };

  return (
    <div className="bg-gray-700 rounded-lg p-4">
      <div className="text-gray-300">Now</div>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <span className="text-4xl font-bold mr-2">
            {temperatureCelsius}°c
          </span>
          {renderTemperatureIcon()}
        </div>
        <div className="text-right">
          <div className="capitalize">{weatherDescription}</div>
          <div className="text-sm text-gray-300">{currentDate}</div>
        </div>
      </div>
      <div className="flex items-center mt-4 text-sm">
        <LocationOnIcon className="mr-1 text-sm" />
        <span>
          {cityName}, {countryName}
        </span>
      </div>
    </div>
  );
};

export default MainWeatherCard;
