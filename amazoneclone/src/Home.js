import React from "react";
import "./Home.css";
import Product from "./Product";
function Home() {
  return (
  
    <div className="home">
      <div className="home__container">
        <img
          src="https://images-eu.ssl-images-amazon.com/images/G/31/prime/PD22/GW/ACQ/IN-PD-22-teaser-GW_3000x1200_2._CB631707276_.jpg"
          alt="prime image"
          className="home__image"
        />

        <div className="home__row">
          <Product
            id={1}
            title={"Echo Dot (4th Gen, 2020 release) with clock | Next generation smart speaker with powerful bass, LED display and Alexa (Blue)"}
            price={"29.99"}
            image={
              "https://m.media-amazon.com/images/I/61u0y9ADElL._AC_UY327_FMwebp_QL65_.jpg"
            }
            rating={5}
          />
          <Product
            id={2}
            title={'The Lean startup'}
            price={5}
            image={
              "https://m.media-amazon.com/images/I/81vvgZqCskL._AC_UY327_FMwebp_QL65_.jpg"
            }
            rating={5}
          />
        </div>
        <div className="home__row">
          <Product
            id={3}
            title={"boAt Wave Lite Smartwatch with 1.69"}
            price={"20.2"}
            image={
              "https://m.media-amazon.com/images/I/61yMzD6RG8L._AC_UL480_FMwebp_QL65_.jpg"
            }
            rating={5}
          />
          <Product
            id={4}
            title={"boAt Airdopes 441 Bluetooth Truly Wireless in Ear Earbuds"}
            price={"30"}
            image={
              "https://m.media-amazon.com/images/I/51bXdtCylPL._AC_UL480_FMwebp_QL65_.jpg"
            }
            rating={5}
          />
          <Product
            id={5}
            title={"2021 Apple iPad Pro with Apple M1 chip (11-inch/27.96 cm, Wi-Fi, 128GB) - Space Grey (3rd Generation)"}
            price={"1000"}
            image={
              "https://m.media-amazon.com/images/I/81Y5WuARqpS._AC_UY327_FMwebp_QL65_.jpg"
            }
            rating={5}
          />
        </div>
        <div className="home__row">
          <Product
           id={6}
            title={"Samsung 27 inch (68.5 cm) Curved LED Backlit Computer Monitor - Full HD, VA Panel with VGA, HDMI, Audio Ports  "}
            price={"2000"}
            image={
              "https://m.media-amazon.com/images/I/51WxeKy7BKL._AC_UY327_FMwebp_QL65_.jpg"
            }
            rating={5}
          />
        </div>
      </div>
    </div>
  
  );
}

export default Home;
