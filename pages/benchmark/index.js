import { useState, useEffect } from "react";
import MetricsTable from "@/components/Benchmark/MetricsTable";
import CenteredLoader from "@/components/Loader/CenteredLoader";

import React from "react";
import Context from "@/context/Context";

import PageHead from "../Head";

import Header from "@/components/Header/Header";
import PopupMobileMenu from "@/components/Header/PopUpMobileMenu";
import Footer from "@/components/Footers/Footer";
import Copyright from "@/components/Footers/Copyright";

const menuText = [
  "Process ID",
  "Curate",
  "BenchMark"
]

export default function BenchMArkPage() {
  const [statusData, setStatusData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchStatus = async () => {
    console.log(`Fetch starting....`)

    if (statusData?.status === "finished") {
      return statusData;
    }

    console.log(`Done with Fetch starting....`)

    setLoading(true);
    try {
      const res = await fetch(`/api/videos/benchmark`, {
        method: 'GET',
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        }
      });
    
      if (!res.ok) {
        throw new Error("Request failed");
      }

      const data = await res.json();

      setStatusData(data);
      return data;

    } catch (err) {
      setStatusData({ status: "error", message: "Failed to fetch status" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStatus()
  }, [])

  return (
    <>
      <PageHead title="Home" />
      <main className="page-wrapper">
        <Context>
          <Header
            headerTransparent="header-transparent"
            headerSticky="header-sticky"
            btnClass="rainbow-gradient-btn"
            menuText={menuText}
          />
          <PopupMobileMenu />
          <div
            className="slider-area slider-style-1 variation-default slider-bg-image bg-banner1 slider-bg-shape"
            data-black-overlay="1"
          >
            <div className="container" style={{ height: '100vh', top: '100px' }}>
            {statusData ? (
              <div className="row justify-content-center">
                <MetricsTable
                  data={statusData}
                />
              </div>
            ) : (
              <CenteredLoader />
            )}
            </div>
          </div>
          <Footer />
          <Copyright />
        </Context>
      </main>
    </>



  );
}
