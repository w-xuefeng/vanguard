import * as React from "react";
import logo from "@/assets/logo.png";

interface IHomeProps {}

const Home: React.FC<IHomeProps> = (props) => {
  return (
    <div>
      <img src={logo} alt="logo" width="500px" />
      Home Page
    </div>
  );
};

export default Home;
