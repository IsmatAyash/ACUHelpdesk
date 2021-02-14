import React from "react";
import { data } from "./ReportsData";
import ReportsInfo from "./ReportsInfo";

const Reports = () => {
  return (
    <>
      {data.map(d => (
        <ReportsInfo key={d.id} {...d} />
      ))}
    </>
  );
};

export default Reports;
