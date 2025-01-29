const ShareButton = ({ url, title }) => {
  const share = () => {
    navigator.share({ title, url });
  };

  return (
    <button
      onClick={share}
      className="px-4 py-2 bg-darkgreen text-white rounded-lg"
    >
      Share
    </button>
  );
};

export default ShareButton;
