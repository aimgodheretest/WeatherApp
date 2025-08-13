const HighlightBox = ({ title, value, Icon }) => {
  return (
    <div className="bg-gray-600 p-3 rounded-lg">
      <div className="text-sm text-gray-300">{title}</div>
      <div className="flex items-center justify-between mt-1">
        <Icon className="text-xl opacity-70" />
        <p className="text-lg font-medium">{value}</p>
      </div>
    </div>
  );
};

export default HighlightBox;
