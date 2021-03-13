import React from "react";
import CommonLayout from "../components/CommonLayout";
import Base from "../components/Base";
import FileDropZone from "../containers/FileDropZone";
import ProgressBar from "../containers/ProgressBar";

/**
 * 메인 페이지
 */
function Main() {
  return (
    <CommonLayout 
      subject="File Drop zone"
      description="Let's upload file. you can just upload file type (*.csv)">
      <React.Fragment>
        <FileDropZone />
        <ProgressBar />
        <Base />
      </React.Fragment>
    </CommonLayout>
  );
}

export default Main;
