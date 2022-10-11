import React from "react";
import backgroundImage from '../../../assets/background_photo.png'
import Image from 'react-bootstrap/Image'
import { SImageBackground } from "../../../styles/Auth/Login/ImageBackground";

const ImageBackground = () => {
  return <SImageBackground>
    <Image src={backgroundImage} alt='backgroundImage' fluid />
  </SImageBackground>;
};

export default ImageBackground;
