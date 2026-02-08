"use client";

import Sal from "sal.js";
import { useEffect, useState } from "react";
import Image from "next/image";

import shapeOne from "../../public/images/bg/icon-shape/icon-shape-one.png";
import shapeTwo from "../../public/images/bg/icon-shape/icon-shape-two.png";
import shapeThree from "../../public/images/bg/icon-shape/icon-shape-three.png";
import shapeFour from "../../public/images/bg/icon-shape/icon-shape-four.png";

import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
} from "@mui/material";

/*
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import LoopIcon from '@mui/icons-material/Loop';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
*/

import { useAppContext } from "@/context/Context";

const INTERVAL_UPDATE=9000;

const _messages = [
  {
    text: "Download video id and saving it from YoutbeAPI",
    image: '/images/icons/cho_dark.png',
    image_light: '/images/icons/cho_light.png',
    alt: 'Cho1',
  },
  {
    text: "Extracting features and reducing to 512 dimensions using Principal Component Analysis (PCA)",
    image: '/images/icons/cho_1_dark.png',
    image_light: '/images/icons/cho_1_light.png',
    alt: 'Cho2',
  },
  {
    text: "Running selected model inference",
    image: '/images/icons/cho_2_dark.png',
    image_light: '/images/icons/cho_2_light.png',
    alt: 'Cho2',
  },
  {
    text: "Generating 10s clips of model inference results",
    image: '/images/icons/cho_3_dark.png',
    image_light: '/images/icons/cho_3_light.png',
    alt: 'Cho3',
  }
];

const modelConfigTranslations = {
  "json_soccernet_calf_resnetpca512": "configs/contextawarelossfunction/json_soccernet_calf_resnetpca512.py",
  "json_soccernet_calf_resnetpca512_amateur_model_no_tf": "configs/contextawarelossfunction/json_soccernet_calf_resnetpca512_amateur_model_no_tf.py",
  "json_soccernet_calf_resnetpca512_amateur_model_st_2": "configs/contextawarelossfunction/json_soccernet_calf_resnetpca512_amateur_model_st_2.py"
}


function VideosPage({videoUrls}) {

  const getLabelSecondsName = (videoName) => {
    const nameWithoutExt = videoName.replace(/\.[^/.]+$/, "");

    // 2. Split by underscores
    const parts = nameWithoutExt.split("_");
    return `${parts[1]} ${parts[2]}`;
  }

  console.log(`f===> ${JSON.stringify(videoUrls)}`)

  return (
      <Grid container spacing={4} justifyContent="center">
        {videoUrls?.map((videoUrl) => (
          <Grid item xs={12} sm={12} md={12} key={videoUrl}>
            <Card sx={{ display: "flex", flexDirection: "column" }}>

              <Box sx={{ position: "relative", paddingTop: "56.25%" }}>
                <video
                  controls
                  preload="metadata"
                  style={{
                    position: "flex",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                  }}
                >
                  <source src={videoUrl} type="video/mp4" />
                </video>
              </Box>
              <CardContent>
                <Typography variant="h6" component="div">
                  {getLabelSecondsName(videoUrl)}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
  );
}


export default function StatusPanel({ loading, data, modelType }) {

  const [messages, setMessages] = useState(_messages);
  const [visibleIndex, setVisibleIndex] = useState(0);
  const [iconIndex, setIconIndex] = useState("🔄");
  const [currentIndex, setCurrentIndex] = useState(visibleIndex);
  const [width, setWidth] = useState(126);
  const [heitgh, setHeigth] = useState(258);
  const { isLightTheme } = useAppContext();
  const [fade, setFadeState] = useState('fade-in');
  const [fadeState, setFade] = useState(false);

  const envModelSet = modelConfigTranslations[modelType];

  const statusIcon = {
    started: "🔄",
    finished: "✅",
    completed: "✅",
    downloading: "🔄",
    error: "❌",
    "": "🔄",
  };

  const dataArray = {
    phase_1_status: {message: "Processing Video buffer Download", sub: ""},
    phase_2_status: {message: "Generating PCA 512-Dimensions", sub: ""},
    phase_3_status: {message: "Processing Model Inference", sub: ""},
    phase_4_status: {message: "Generating clips", sub: ""}
  }

  const phases = [
    { key: "phase_1_status", index: 0 },
    { key: "phase_2_status", index: 1 },
    { key: "phase_3_status", index: 2 },
    { key: "phase_4_status", index: 3 },
  ];

  const getVisiblePhases = (data) => {
    const lastIndex = phases.findLastIndex(
      (p) => data?.[p.key]
    );
  
    if (lastIndex === -1) return [phases[0]];

    console.log(`[DEBUG]:: => ${lastIndex} as lastIndex set.`)
  
    const g = phases.slice(0, lastIndex + 1);
    console.log(`[DEBUG]:: => ${JSON.stringify(g)} as g set.`)
    return g;
  };

  const getIcons = (status) => {
    if (!status) { return }

    // setIconIndex(statusIcon[status] || "🔄")
    return statusIcon[status]
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false); // start fade-out
      setTimeout(() => {
        setFade(true); // fade-in
      }, INTERVAL_UPDATE);
    }, INTERVAL_UPDATE);
    return () => clearInterval(interval);
  }, [visibleIndex]);
  
  useEffect(() => {
    console.log(`[DEBUG]:: => ${visibleIndex} as visibleIndex set.`)
    const interval = setInterval(() => {
      setVisibleIndex(prev => (prev + 1) % getVisiblePhases(data).length);
    }, INTERVAL_UPDATE);

    return () => clearInterval(interval);
  }, [data]);

  if (loading) {
    return <p>⏳ Checking status…</p>;
  }

  if (!data) {
    return <></>;
  }

  

  if (data[envModelSet]?.s3_objects_list && data[envModelSet].s3_objects_list.length > 0) {
    return (
      <div className="col-lg-12 d-flex justify-content-center align-items-center">
        <VideosPage videoUrls={data[envModelSet]?.s3_objects_list} />
      </div>
    )
  }

  return (
    <>
      <div className="inner text-center" style={{ top: "100px" }}>
        <h1 className="title display-one flex flex-col12 items-center justify-center text-center" style={{ width: "100vh !important", maxWidth: "100vh !important" }}>
          <span className="text-6xl sm:text-6xl lg:text-6xl font-bold">...We Are{" "}</span>
          <br/>
        </h1>
        <span className="header-caption mt-4">
          <span className="cd-headline rotate-1">
            <span
              className="cd-words-wrapper block text-12xl sm:text-12xl lg:text-12xl !w-auto"
              style={{ width: "auto" }}
            >
              {getVisiblePhases(data).map(({ key, index }) => (
                <b
                  key={key}
                  className={visibleIndex === index ? "is-visible" : "is-hidden"}
                  style={{ fontSize: "30px" }}
                >
                  <span
                    className="text-1xl sm:text-1xl lg:text-1xl font-bold"
                    style={{ fontSize: "3rem" }}
                  >
                    {getIcons(data[key])}{" "}
                  </span>

                  <span
                    className="theme-gradient"
                    style={{ fontSize: "3rem" }}
                  >
                    {dataArray[key].message}
                  </span>
                </b>
              ))}
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
          <Image
            src={shapeOne}
            width={100}
            height={95}
            alt="Icon Shape"
            className="iconshape iconshape-one"
          />
        </div>
      </div>
    </>
  );
}