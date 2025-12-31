import Link from "next/link";
import Image from "next/image";
import React from "react";

import TabData from "../../data/tabStyle.json";
import { useAppContext } from "@/context/Context";

const TabStyleOne = ({tabStyleOneData, buttonText}) => {
  const { isLightTheme } = useAppContext();

  console.log(`buttonText => ${buttonText}`)
  return (
    <>
      <div className="row row--30 align-items-center">
        <div className="col-lg-12">
          <div className="rainbow-default-tab style-three generator-tab-defalt">
            <ul className="nav nav-tabs tab-button" role="tablist">
              {TabData &&
                TabData.TabStyleOne.map((data, index) => (
                  <li
                    className="nav-item tabs__tab "
                    role="presentation"
                    key={index}
                  >
                    <button
                      className={`nav-link rainbow-gradient-btn without-shape-circle ${
                        data.isSelect ? "active" : ""
                      }`}
                      id={`${data.menuId}-tab`}
                      data-bs-toggle="tab"
                      data-bs-target={`#${data.target}`}
                      type="button"
                      role="tab"
                      aria-controls={data.target}
                      aria-selected="false"
                    >
                      <span className="generator-icon">
                        <Image
                          style={{ width: 64, height: 64}}
                          src={data.iconImg}
                          width={124}
                          height={124}
                          alt="Vedio Generator Icon"
                        />
                        {data.text}
                      </span>
                      <span className="border-bottom-style"></span>
                    </button>
                  </li>
                ))}
            </ul>

            <div className="rainbow-tab-content tab-content">
              {TabData && tabStyleOneData &&
                TabData.TabStyleOne.map((tab, index) => (
                  <div
                    className={`tab-pane fade ${
                      tab.isSelect ? "show active" : ""
                    }`}
                    id={tab.target}
                    role="tabpanel"
                    aria-labelledby={`${tab.menuId}-tab`}
                    key={index}
                  >
                    <div className="inner">
                      <div className="row">
                        <div className="col-xl-6">
                          <div className="section-title">
                            <h2 className="title">{tabStyleOneData[index].title || ''}</h2>
                            <div className="features-section">
                              <ul className="list-style--1">
                                {tab.subItem.map((item, i) => (
                                  <li key={i}>
                                    <i className="fa-regular fa-circle-check"></i>
                                    {tabStyleOneData[index].subItem[i].text || ''}
                                  </li>
                                ))}
                              </ul>
                            </div>
                            {/*
                            <div className="read-more">
                              <Link
                                className="btn-default color-blacked"
                                href="#"
                              >
                                {buttonText}
                                <i className="fa-sharp fa-solid fa-arrow-right ps-2"></i>
                              </Link>
                            </div>*/}
                          </div>
                        </div>
                        <div className="col-xl-6 mt_md--30 mt_sm--30">
                          <div className="export-img">
                            <div className="inner-without-padding">
                              <div className="export-img img-bg-shape">
                                <Image
                                  style={{ width: "969px", height: "483px" }}
                                  src="/images/service/Graphic.png"
                                  width={869}
                                  height={583}
                                  alt="Example lifecycle"
                                />
                                <div className="image-shape"></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TabStyleOne;
