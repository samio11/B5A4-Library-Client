import HomeBanner from "./HomeBanner";
import HomeFooter from "./HomeFooter";
import HomeTable from "./HomeTable";

const HomePage = () => {
  return (
    <div>
      <div>
        <HomeBanner></HomeBanner>
        <div className="mt-7 text-center">
          <h2 className="text-xl md:text-2xl font-bold italic">
            All Available Books
          </h2>
          <p className="text-xs md:text-sm text-gray-500 font-semibold">
            Browse our full collection and find your next great read
          </p>
          <hr className="w-[30%] mx-auto mt-3" />
        </div>
        <div className="mt-5">
          <HomeTable></HomeTable>
        </div>
        <div>
          <HomeFooter></HomeFooter>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
