import React from "react";
import { data } from "./OpendataData";
import OpendataInfo from "./OpendataInfo";

const Opendata = () => {
  return (
    <>
      {data.map(d => (
        <OpendataInfo key={d.id} {...d} />
      ))}
    </>
  );
};

export default Opendata;
