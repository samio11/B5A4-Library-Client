const HomeBanner = () => {
  return (
    <div className="w-auto h-auto lg:h-[500px] flex flex-col-reverse md:flex-row justify-center items-center gap-2">
      {/* Left */}
      <div className="flex-1">
        <div className="flex justify-center items-center">
          <div className="text-center w-[70%] space-y-3">
            <h2 className="text-xl lg:text-2xl font-semibold italic">
              {" "}
              Manage, borrow, and discover books all in one
            </h2>
            <p className="text-xs lg:sm text-gray-600">
              Whether you're a casual reader or an avid collector, our system
              helps you keep track of your entire book collection and explore
              new reads in just a few clicks.
            </p>
          </div>
        </div>
      </div>
      {/* Right */}
      <div className="flex-1">
        <img src="banner1.png" alt="Read Book " />
      </div>
    </div>
  );
};

export default HomeBanner;
