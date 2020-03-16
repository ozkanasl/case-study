import React from "react";
import { Image } from "semantic-ui-react";
import headImage from "../../assets/images/header.png";

const Header = () => (
  <div>
    <Image src={headImage} fluid />
  </div>
);

export default Header;
