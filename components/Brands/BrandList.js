import Image from "next/image";
import Link from "next/link";
import React from "react";
import Slider from "react-slick";

import brandImg1 from "../../public/images/brand/strapi.png";
import brandImg2 from "../../public/images/brand/stenciljs.png";
import brandImg3 from "../../public/images/brand/spotify.png";
import brandImg4 from "../../public/images/brand/woocommerce.png";
import brandImg5 from "../../public/images/brand/slack.png";
import brandImg6 from "../../public/images/brand/mapbox.png";

import Bmg from "../../public/images/brand/bmg_1.png"
import Lumen from "../../public/images/brand/lumen_1.png"

const BrandList = () => {
  var settings = {
    centerMode: true,
    draggable: false,
    centerPadding: "150px",
    dots: false,
    arrows: false,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 0,
    speed: 8000,
    pauseOnHover: true,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: "40px",
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 992,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: "40px",
          slidesToShow: 3,
        },
      },
    ],
  };
  return (
    <>
      <Slider
        {...settings}
        className="brand-list brand-style-2 slider-brand slider-brand-activation"
      >
        <li className="slide-single-layout">
          <Link href="#">
            <Image
              src={Bmg}
              width={132}
              height={132}
              alt="Brand Image"
            />
          </Link>
        </li>
        <li className="slide-single-layout">
          <Link href="#">
            <Image
              src={Lumen}
              width={132}
              height={132}
              alt="Brand Image"
            />
          </Link>
        </li>
        <li className="slide-single-layout">
          <Link href="#">
            <Image
              src={Bmg}
              width={132}
              height={132}
              alt="Brand Image"
            />
          </Link>
        </li>
        <li className="slide-single-layout">
          <Link href="#">
            <Image
              src={Lumen}
              width={132}
              height={132}
              alt="Brand Image"
            />
          </Link>
        </li>
        <li className="slide-single-layout">
          <Link href="#">
            <Image
              src={Bmg}
              width={132}
              height={132}
              alt="Brand Image"
            />
          </Link>
        </li>
      </Slider>
    </>
  );
};

export default BrandList;
