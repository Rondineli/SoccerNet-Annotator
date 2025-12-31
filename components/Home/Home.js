import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Sal from "sal.js";


import PricingData from "../../data/pricing.json";

import SplitImg from "../../public/images/split/split-2.png";
//import SplitLogo from "../../public/images/split/split-2-logo.png";

import DarkSplitLogo from "../../public/images/logo/black_logo_white_background__1bg.png"
import SplitLogo from "../../public/images/logo/white_logo_black_background__1bg.png"

import DarkSplitImg from "../../public/images/light/split/split-2.png";
//import DarkSplitLogo from "../../public/images/light/split/split-2-logo.png";

import bannerImg from "../../public/images/bg/slider-main-image.png";
import bannerWhiteImg from "../../public/images/light/bg/slider-main-image.png";
import shapeOne from "../../public/images/bg/icon-shape/icon-shape-one.png";
import shapeTwo from "../../public/images/bg/icon-shape/icon-shape-two.png";
import shapeThree from "../../public/images/bg/icon-shape/icon-shape-three.png";
import shapeFour from "../../public/images/bg/icon-shape/icon-shape-four.png";
import bgShape from "../../public/images/bg/split-bg-shape.png";
import bgShapeOne from "../../public/images/bg/bg-shape-four.png";
import bgShapeTwo from "../../public/images/bg/bg-shape-five.png";
import bgShapeThree from "../../public/images/bg/bg-shape-two.png";

import BrandList from "../Brands/BrandList";
import TabStyleOne from "../TabStyles/TabStyle-One";
import ServiceStyleOne from "../Services/ServiceStyle-One";
import AdvanceTab from "../TabStyles/AdvanceTab";
import CtaOne from "../CallToActions/Cta-One";
import Pricing from "../Pricing/Pricing";
import ServiceTwo from "../Services/Service-Two";
import Testimonial from "../Testimonials/Testimonial";
import BrandTwo from "../Brands/Brand-Two";
import CtaTwo from "../CallToActions/Cta-Two";
import { useAppContext } from "@/context/Context";

const _messages = [
  {
    text: "Inteligência em Tecnologia da Informação",
    image: '/images/icons/cho_dark.png',
    image_light: '/images/icons/cho_light.png',
    alt: 'Cho1',
  },
  {
    text: 'I.A - Inteligência Artificial - Automação, Desenvolvimento e Testes.',
    image: '/images/icons/cho_1_dark.png',
    image_light: '/images/icons/cho_1_light.png',
    alt: 'Cho2',
  },
  {
    text: 'Inteligência em Monitoramento',
    image: '/images/icons/cho_2_dark.png',
    image_light: '/images/icons/cho_2_light.png',
    alt: 'Cho2',
  },
  {
    text: 'Consultoria para que sua empresa tenha Cases de Sucesso!',
    image: '/images/icons/cho_3_dark.png',
    image_light: '/images/icons/cho_3_light.png',
    alt: 'Cho3',
  },
  {
    text: 'Pare de se preocupar com a demanda, nós trazemos os recursos necessários para que ela seja atendida!',
    image: '/images/icons/cho_4_dark.png',
    image_light: '/images/icons/cho_4_light.png',
    alt: 'Cho4',
  },
];

const INTERVAL_UPDATE=9000;

const Home = ({messagesText, sectionsText}) => {
  const [visibleIndex, setVisibleIndex] = useState(0);
  const { isLightTheme } = useAppContext();
  const [width, setWidth] = useState(126);
  const [heitgh, setHeigth] = useState(258);
  const [currentIndex, setCurrentIndex] = useState(visibleIndex);
  const [hasMounted, setHasMounted] = useState(false);
  const [fadeState, setFade] = useState(false);
  const [fade, setFadeState] = useState('fade-in');
  const [messages, setMessages] = useState(_messages);

  /*
  useEffect(() => {
    const newMessage = messages[visibleIndex];
    const result = messagesText[visibleIndex];
    newMessage.translatedText = result;
    newMessage.visibleIndex = visibleIndex;

    setMessage(newMessage);
  }, [visibleIndex])*/

  useEffect(() => {
    if (messagesText?.length) {
      const updated = _messages.map((item, index) => ({
        ...item,
        text: messagesText[index] || item.text, // fallback to original if not present
      }));
      setMessages(updated);
    }
  }, [messagesText]);


  useEffect(() => {
    Sal();

    const intervalId = setInterval(() => {
      setVisibleIndex((prevIndex) => (prevIndex + 1) % 5);
    }, INTERVAL_UPDATE);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleIndex(prev => (prev + 1) % messages.length);
    }, INTERVAL_UPDATE);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setHasMounted(true);
    console.log('setHasMounted to true')
  }, []); // empty dependency array = run once on mount

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false); // start fade-out
      setTimeout(() => {
        setFade(true); // fade-in
      }, INTERVAL_UPDATE);
    }, INTERVAL_UPDATE);
    return () => clearInterval(interval);
  }, [visibleIndex]);

  
  const style = {
    opacity: fade ? 1 : 0,
    transition: "opacity 0.4s ease-in-out",
    textAlign: "center",
  };


  return (
    <>
      <div
        className="slider-area slider-style-1 variation-default slider-bg-image bg-banner1 slider-bg-shape"
        data-black-overlay="1"
      >
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-12 d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
              <div className="inner text-center">
                <h1 className="title display-one flex flex-col items-center justify-center text-center">
                  <span className="text-4xl sm:text-5xl lg:text-6xl font-bold">...We Are{" "}</span>
                  <br/>
                </h1>
                <span className="header-caption mt-4">
                  <span className="cd-headline rotate-1">
                    <span className="cd-words-wrapper block text-6xl sm:text-6xl lg:text-5xl">
                      <b className={`${visibleIndex === 0 ? 'is-visible' : 'is-hidden'} theme-gradient`}>iTech</b>
                      <b className={`${visibleIndex === 1 ? 'is-visible' : 'is-hidden'} theme-gradient`}>I.A</b>
                      <b className={`${visibleIndex === 2 ? 'is-visible' : 'is-hidden'} theme-gradient`}>iMonitory</b>
                      <b className={`${visibleIndex === 3 ? 'is-visible' : 'is-hidden'} theme-gradient`}>Partners</b>
                      <b className={`${visibleIndex === 4 ? 'is-visible' : 'is-hidden'} theme-gradient`} style={{fontSize: '55px'}}>Outsourcing</b>
                    </span>
                  </span>
                </span>
                  <span className="inner mt-4">
                    <span className="cd-headline rotate-1">
                      <span className="cd-words-wrapper block text-6xl sm:text-6xl lg:text-5xl force-center">
                        {messages.map((item, idx) => (
                          <b key={idx} className={`${visibleIndex === idx ? 'is-visible' : 'is-hidden'}`}>
                            <p style={{
                              margin: 0,
                              textAlign: 'center',
                              wordBreak: 'break-word',
                              whiteSpace: 'normal',
                              maxWidth: '90vw',
                            }} className={"force-center"}>
                              {item.text}
                            </p>
                            <Image
                              src={isLightTheme ? item.image : item.image_light}
                              width={width}
                              height={heitgh}
                              alt={item.alt}
                              style={{ marginTop: "8px" }}
                            />
                          </b>
                        ))}
                      </span>
                    </span>
                  </span>
                <div className="inner-shape">
                  <Image
                    src={shapeOne}
                    width={100}
                    height={95}
                    alt="Icon Shape"
                    className="iconshape iconshape-one"
                  />
                  <Image
                    src={shapeTwo}
                    width={60}
                    height={57}
                    alt="Icon Shape"
                    className="iconshape iconshape-two"
                  />
                  <Image
                    src={shapeThree}
                    width={42}
                    height={31}
                    alt="Icon Shape"
                    className="iconshape iconshape-three"
                  />
                  <Image
                    src={shapeFour}
                    width={100}
                    height={95}
                    alt="Icon Shape"
                    className="iconshape iconshape-four"
                  />
                </div>
              </div>
            </div>
            <div className="col-lg-11 col-xl-11 justify-content-center">
              
              <div className="container">
                <div className="row">
                  <div className="col-lg-12">
                    <div
                      className="section-title text-center"
                      data-sal="slide-up"
                      data-sal-duration="700"
                      data-sal-delay="100"
                      >
                      <h2 className="title mb--20">
                        ...We Are
                        <br />
                        <span className="header-caption">
                          <span className="cd-headline rotate-1">
                            <span style={{ fontSize: '54px' }} className="cd-words-wrapper theme-gradient">Observability</span>
                          </span>
                        </span>
                      </h2>
                      <Link
                        className="btn-default btn-large color-blacked"
                        href="https://observability.weai.com.br/new/client"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Try It Now{" "}
                        <i className="fa-sharp fa-light fa-arrow-right ml--5"></i>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="slider-frame">
                <Image
                  className="slider-image-effect"
                  src={"/images/tab/observability.png"}
                  width={1055}
                  height={898}
                  alt="Banner Images"
                />
              </div>
              {/*
              <div className="aiwave-service-area rainbow-section-gap">
                <div className="container">
                  <div className="row row--15 service-wrapper">
                    <ServiceTwo />
                  </div>
                </div>
              </div>
              */}
            </div>
          </div>
        </div>

        <div className="bg-shape">
          <Image
            className="bg-shape-one"
            width={640}
            height={949}
            src={bgShapeOne}
            alt="Bg Shape"
          />
          <Image
            className="bg-shape-two"
            src={bgShapeTwo}
            width={626}
            height={1004}
            alt="Bg Shape"
          />
        </div>
      </div>
      
      <section id="our-clients">
        <div className="rainbow-brand-area rainbow-section-gap">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div
                  className="section-title rating-title text-center sal-animate"
                  data-sal="slide-up"
                  data-sal-duration="700"
                  data-sal-delay="100"
                >
                  <p className="b1 mb--0 small-title">
                    {`${sectionsText.section_1}:`}
                  </p>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12 mt--10">
                <BrandList />
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="rainbow-service-area rainbow-section-gap">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div
                className="section-title text-center pb--60"
                data-sal="slide-up"
                data-sal-duration="700"
                data-sal-delay="100"
              >
                <h4 className="subtitle">
                  <span className="theme-gradient">
                  {`${sectionsText.section_2[0]}`}
                  </span>
                </h4>
                <h2 className="title mb--0">
                {`${sectionsText.section_2[1]}`}  <br /> {`${sectionsText.section_2[2]}`}.
                </h2>
              </div>
            </div>
          </div>
          <TabStyleOne tabStyleOneData={sectionsText.tabStyleOne} buttonText={sectionsText.buttonText} />
          {/*
            "tabStyleOne": tCommon('tabs.TabStyleOne', { returnObjects: true }),
            "advanceTab": tCommon('tabs.advanceTab', { returnObjects: true })/>
          */}
        </div>
      </div>

      <div className="rainbow-service-area rainbow-section-gap rainbow-section-gapBottom-big">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div
                className="section-title text-left"
                data-sal="slide-up"
                data-sal-duration="400"
                data-sal-delay="150"
              >
                <h4 className="subtitle">
                  <span className="theme-gradient">{sectionsText.section_3?.subtitle}</span>
                </h4>
                <h2 className="title mb--60">
                  {sectionsText.section_3?.new_subtitle}{" "}
                  <span className="subtitle" style={{ fontSize: '54px' }}>
                    <span className="theme-gradient">WeAI</span>
                  </span>
                </h2>
              </div>
            </div>
          </div>
        </div>
        <ServiceStyleOne serviceOne={sectionsText.serviceOne} buttonText={sectionsText.buttonText}/>
      </div>

      <div className="rainbow-advance-tab-area aiwave-bg-gradient rainbow-section-gap-big">
        <div className="container">
          <div className="html-tabs" data-tabs="true">
            <AdvanceTab tabStyleOneData={sectionsText.advanceTab} buttonText={sectionsText.buttonText} />
          </div>
        </div>
        <div className="bg-shape">
          <Image src={bgShape} width={630} height={879} alt="Bg Shape" />
        </div>
      </div>

      <div className="rainbow-collobration-area rainbow-section-gap-big">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div
                className="section-title text-center"
                data-sal="slide-up"
                data-sal-duration="700"
                data-sal-delay="100"
              >
                <h4 className="subtitle ">
                  <span className="theme-gradient">{sectionsText.section_4[0]}</span>
                </h4>
                <h2 className="title mb--20">
                  {sectionsText.section_4[1]}
                  <br /> {sectionsText.section_4[2]}
                </h2>
                <Link
                  className="btn-default btn-large color-blacked"
                  href="/contact"
                >
                  {sectionsText.buttonText}{" "}
                  <i className="fa-sharp fa-light fa-arrow-right ml--5"></i>
                </Link>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12 mt--60">
              <div className="collabration-image-section">
                <Image
                  src={isLightTheme ? SplitImg : DarkSplitImg}
                  width={1305}
                  height={712}
                  alt="collabration-image"
                />
                <div className="logo-section">
                  <div className="center-logo">
                    <Image
                      src={isLightTheme ? SplitLogo : DarkSplitLogo}
                      width={104}
                      height={143}
                      alt="Small Logo"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="rainbow-rn-cta">
        <div className="container">
          <CtaOne />
        </div>
      </div>
      <div className="rainbow-testimonial-area rainbow-section-gap"></div>
      {/*
      <div className="aiwave-pricing-area wrapper rainbow-section-gap-big">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div
                className="section-title text-center"
                data-sal="slide-up"
                data-sal-duration="400"
                data-sal-delay="150"
              >
                <h4 className="subtitle">
                  <span className="theme-gradient">Pricing</span>
                </h4>
                <h2 className="title w-600 mb--40">
                  Pricing plans for everyone
                </h2>
              </div>

              <nav className="aiwave-tab">
                <div
                  className="tab-btn-grp nav nav-tabs text-center justify-content-center"
                  id="nav-tab"
                  role="tablist"
                >
                  {PricingData &&
                    PricingData.pricing.map((data, index) => (
                      <button
                        className={`nav-link ${data.isSelect ? "active" : ""}`}
                        id={`${data.priceId}-tab`}
                        data-bs-toggle="tab"
                        data-bs-target={`#${data.priceId}`}
                        type="button"
                        role="tab"
                        aria-controls={data.priceId}
                        aria-selected="false"
                        key={index}
                      >
                        {data.priceType}{" "}
                        {data.discount ? (
                          <span className="rainbow-badge-card badge-border">
                            -{data.discount}%
                          </span>
                        ) : (
                          ""
                        )}
                      </button>
                    ))}
                </div>
              </nav>
            </div>
          </div>

          <Pricing
            parentClass="col-xl-4 col-lg-6 col-md-6 col-12 mt--40"
            start={0}
            end={3}
            isBadge={true}
            gap="mt_dec--40"
          />
        </div>
      </div>
      

      <div className="rainbow-testimonial-area rainbow-section-gap">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div
                className="section-title text-left"
                data-sal="slide-up"
                data-sal-duration="400"
                data-sal-delay="150"
              >
                <h4 className="subtitle">
                  <span className="theme-gradient">Assisting individuals</span>
                </h4>
                <h2 className="title mb--60">The opinions of the community</h2>
              </div>
            </div>
          </div>
        </div>
        <Testimonial />
      </div>
      */}
    </>
  );
};

export default Home;
