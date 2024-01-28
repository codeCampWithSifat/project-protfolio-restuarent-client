const LoadingButton = () => {
  return (
    <div className="h-[600px] flex justify-center items-center">
      <button className="btn">
        <span className="loading loading-spinner"></span>
        loading
      </button>
    </div>
  );
};

export default LoadingButton;
