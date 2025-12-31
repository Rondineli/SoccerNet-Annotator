import React from "react";
import Context from "@/context/Context";

import PageHead from "../Head";

import CurateComp from "@/components/CurateComp/CurateComp";


const CurateComp2 = () => {
  return (
    <>
      <PageHead title="Curate" />

      <main className="page-wrapper">
        <Context>
          <CurateComp />
        </Context>
      </main>
    </>
  );
};


export default CurateComp2;