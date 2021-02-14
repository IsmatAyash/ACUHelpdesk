import React from "react";
import { data } from "./SocecocabData";
import SocecocabInfo from "./SocecocabInfo";

const Socecocab = () => {
  return (
    <>
      {data.map(d => (
        <SocecocabInfo key={d.id} {...d} />
      ))}
    </>
  );
};

export default Socecocab;
