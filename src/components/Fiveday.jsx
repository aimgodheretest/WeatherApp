const FiveDayForecast = ({ forecastData }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      weekday: "short",
      day: "numeric",
      month: "short",
    }).format(date);
  };

  // Group forecasts by day
  const dailyForecasts = forecastData.list.reduce((acc, item) => {
    const date = new Date(item.dt_txt).toDateString();
    if (!acc[date]) {
      acc[date] = item;
    }
    return acc;
  }, {});

  const forecasts = Object.values(dailyForecasts).slice(0, 5);

  return (
    <div className="space-y-2">
      {forecasts.map((item, index) => (
        <div
          key={index}
          className="flex items-center justify-between py-2 px-1 hover:bg-gray-600 rounded"
        >
          <div className="w-16 font-medium">{formatDate(item.dt_txt)}</div>
          <div className="flex-1 flex items-center justify-center">
            <div className="w-24 text-center">
              {item.weather[0].description}
            </div>
          </div>
          <div className="w-16 text-right font-bold">
            {Math.round(item.main.temp)}°c
          </div>
        </div>
      ))}
    </div>
  );
};

export default FiveDayForecast;
