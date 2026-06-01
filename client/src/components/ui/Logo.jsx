const Logo = () => {
  return (
    <div className="flex items-center justify-center space-x-1">
      <div className="flex items-center justify-center lg:w-8 lg:h-8 w-6 h-6 p-2 rounded-full bg-blue-600 dark:bg-amber-600 text-white shadow-md">
        <span className="flex items-center justify-center lg:font-extrabold lg:text-2xl text-xl font-stretch-ultra-expanded text-shadow-2xs">
          N
        </span>
      </div>
      <h2 className="lg:text-xl text-lg lg:font-extrabold">
        NOVA <span className="font-light text-base-content">LTS</span>
      </h2>
    </div>
  );
};

export default Logo;
