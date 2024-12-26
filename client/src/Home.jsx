import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import Logo from './images/logo.png';
import Logo_2 from './images/logo_2.jpg';
import Background from './images/bg-16.jpg'
import Marquee from "./components/Marquee";
import { useEffect } from "react";


export const Home = () => {

  useEffect(() => {
    window.scrollTo(0,0)
  },[])
  
  return (
    <>
    <div className="container-fluid">
      <Header />
      <div className="background">
        <img 
          src={Background} 
          className="img-fluid w-100 vh-100" 
          alt="Background" 
        />
      </div>
      <div className="background_2">
        <img 
          src={Logo_2}
          className="img-fluid w-100 vh-100" 
          alt="Background" 
        />
      </div>
      <div className="container text-center">
        <img 
          className="mt-5 img-fluid" 
          src={Logo} 
          style={{ width: '700px', maxWidth: '100%', height: 'auto', paddingTop: '90px' }} 
          alt="Logo" 
        />
        <Marquee />
      </div>
    </div>
    <Footer />
  </>
  );
};
