import errorImg from '../assets/img/error.svg';

const ErrorPage = () => {
  return (
    <div className="w-full flex items-center justify-center h-screen bg-peach bg-opacity-80">
      <img src={errorImg} className="w-1/3" alt="" />
    </div>
  );
};

export default ErrorPage;
