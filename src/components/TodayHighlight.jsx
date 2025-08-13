import HighlightBox from "../../src/components/Highlightbox.jsx";
import DeviceThermostatIcon from "@mui/icons-material/DeviceThermostat";
import CompressIcon from "@mui/icons-material/Compress";
import VisibilityIcon from "@mui/icons-material/Visibility";
import InvertColorsIcon from "@mui/icons-material/InvertColors";
import NightsStayIcon from "@mui/icons-material/NightsStay";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import AirIcon from "@mui/icons-material/Air";

const TodayHighlights = ({ weatherData, airQualityData }) => {
  const { main, visibility, sys } = weatherData;
  const airQualityIndex = airQualityData?.main?.aqi;
  const { co, no, no2, o3 } = airQualityData?.components || {};

  const renderAirQualityDescription = (aqi) => {
    switch (aqi) {
      case 1:
        return "Good";
      case 2:
        return "Fair";
      case 3:
        return "Moderate";
      case 4:
        return "Poor";
      case 5:
        return "Very Poor";
      default:
        return "Unknown";
    }
  };

  const highlights = [
    { title: "Humidity", value: `${main.humidity}%`, Icon: InvertColorsIcon },
    { title: "Pressure", value: `${main.pressure} hPa`, Icon: CompressIcon },
    {
      title: "Visibility",
      value: `${visibility / 1000} km`,
      Icon: VisibilityIcon,
    },
    {
      title: "Feels Like",
      value: `${main.feels_like}°C`,
      Icon: DeviceThermostatIcon,
    },
  ];

  return (
    <div className="bg-gray-700 rounded-lg p-4 h-full flex flex-col">
      <h2 className="text-lg font-bold mb-4">Today's Highlights</h2>

      <div className="grid grid-cols-2 gap-4 flex-grow">
        {/* Air Quality */}
        <div className="bg-gray-600 p-3 rounded-lg flex flex-col">
          <div className="flex justify-between items-center mb-2">
            <p className="font-medium">Air Quality</p>
            <span
              className={`px-2 py-1 rounded text-xs font-bold ${
                airQualityIndex === 1
                  ? "bg-green-500"
                  : airQualityIndex === 2
                  ? "bg-yellow-500"
                  : airQualityIndex === 3
                  ? "bg-orange-500"
                  : "bg-red-500"
              }`}
            >
              {renderAirQualityDescription(airQualityIndex)}
            </span>
          </div>
          <div className="grid grid-cols-2 gap-2 text-sm mt-auto">
            <div>
              <p className="font-medium">CO</p>
              <p>{co} µg/m³</p>
            </div>
            <div>
              <p className="font-medium">NO</p>
              <p>{no} µg/m³</p>
            </div>
            <div>
              <p className="font-medium">NO₂</p>
              <p>{no2} µg/m³</p>
            </div>
            <div>
              <p className="font-medium">O₃</p>
              <p>{o3} µg/m³</p>
            </div>
          </div>
        </div>

        {/* Sunrise & Sunset */}
        <div className="bg-gray-600 p-3 rounded-lg flex flex-col">
          <p className="font-medium mb-3">Sunrise & Sunset</p>
          <div className="flex justify-between mt-auto">
            <div className="flex flex-col items-center">
              <WbSunnyIcon className="text-yellow-400" />
              <p className="text-sm">
                {new Date(sys.sunrise * 1000).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
            <div className="flex flex-col items-center">
              <NightsStayIcon className="text-blue-300" />
              <p className="text-sm">
                {new Date(sys.sunset * 1000).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
          </div>
        </div>

        {/* Other Highlights */}
        <div className="col-span-2 grid grid-cols-2 gap-3">
          {highlights.map((highlight, index) => (
            <HighlightBox
              key={index}
              title={highlight.title}
              value={highlight.value}
              Icon={highlight.Icon}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TodayHighlights;
