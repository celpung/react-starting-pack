import React from "react";

const Home: React.FC = () => {
  return (
    <div className="h-screen w-screen flex justify-center">
      <div className="container flex justify-center items-center">
        <div className="flex flex-col gap-6 text-center">
          <h5>React Starting pack</h5>
          <p>This is a starting pack for react</p>
          <div className="text-center">
            <a href="/palletes">Pallete</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
