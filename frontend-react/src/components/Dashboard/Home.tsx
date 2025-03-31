const Home = () => {
  return (
    <div className="flex h-full flex-col items-center justify-center pb-12">
      <h1 className="text-7xl font-bold">
        <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
          Researcher Network
        </span>
      </h1>
      <p className="mt-3 text-4xl text-gray-300">
        Connect, collaborate, and innovate.
      </p>
      <img src="/logo.svg" alt="Logo" className="mt-8 h-48" />
    </div>
  );
};

export default Home;
