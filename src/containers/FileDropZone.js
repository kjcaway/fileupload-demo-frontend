import React, { useMemo, useState } from "react";
import { useDropzone } from "react-dropzone";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { useDispatch, useSelector } from "react-redux";
import * as popup from "../store/reducer/popup";
import * as progress from "../store/reducer/progress";
import httpClient from "../lib/httpClient";

/**
 * 파일 드래그 앤 드랍 컴포넌트(react-dropzone)
 */

const useStyles = makeStyles((theme) =>
  createStyles({
    btngroup: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
  })
);

const baseStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px",
  borderWidth: 2,
  borderRadius: 2,
  borderColor: "#eeeeee",
  borderStyle: "dashed",
  backgroundColor: "#fafafa",
  color: "#bdbdbd",
  outline: "none",
  transition: "border .24s ease-in-out",
};

const activeStyle = {
  borderColor: "#2196f3",
};

const acceptStyle = {
  borderColor: "#00e676",
};

const rejectStyle = {
  borderColor: "#ff1744",
};

function FileDropZone(props) {
  const classes = useStyles();
  const isProgressShow = useSelector((store) => store.progress.isShow);
  const [file, setFile] = useState(undefined);
  const dispatch = useDispatch();

  /**
   * 드래그 앤 드랍 이벤트 핸들러
   * 
   * @param {Array<File>} files 
   * @param {Array<Error>} error 
   */
  const onDropHandler = (files, error) => {
    if (error.length !== 0) {
      // check invalid file or many files
      const message = error[0].errors[0].message;
      dispatch({
        type: popup.OPEN_POPUP,
        payload: {
          title: "Error",
          contents: message,
        },
      });
    } else {
      setFile(files[0]);
    }
  };

  const {
    acceptedFiles,
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    accept: "text/plain, application/vnd.ms-excel",
    onDrop: onDropHandler,
    maxFiles: 1,
  });

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isDragActive, isDragReject, isDragAccept]
  );

  const acceptedFileItems = acceptedFiles.map((file) => (
    <li key={file.path}>
      {file.path} ({file.size} bytes)
    </li>
  ));

  /**
   * 업로드 버튼 클릭 이벤트 핸들러
   */
  const onSubmitHandler = async () => {
    // file upload
    const formData = new FormData();
    formData.append("memberFile", file);
    try {
      dispatch({ type: progress.SHOW_PROGRESS });
      const res = await httpClient.post("/api/member/upload", formData);

      if (res.data.resultCode === "SUCCESS") {
        const taskId = res.data.taskId;
        const totalCount = res.data.totalCount;

        doPolling(taskId, totalCount);
      }
    } catch (error) {
      const message = error.message;
      dispatch({
        type: popup.OPEN_POPUP,
        payload: {
          title: "Error",
          contents: message,
        },
      });
      dispatch({ type: progress.HIDE_PROGRESS });
    }
  };

  /**
   * 데이터 저장 진행도 Polling
   */
  const doPolling = (taskId, max) => {
    setTimeout(async () => {
      const res = await httpClient.get(`/api/member/${taskId}`);
      const progressCount = res.data.progressCount;
      const percentage = Math.floor((progressCount * 100) / max) + 1;

      dispatch({ type: progress.SET_PERCENTAGE, payload: percentage });
      if (percentage < 100) {
        doPolling(taskId, max);
      } else {
        dispatch({
          type: popup.OPEN_POPUP,
          payload: {
            title: "Completed",
            contents: "File upload and inserted " + progressCount + " rows.",
          },
        });
      }
    }, 1000);
  };

  return (
    <section className="container">
      <div {...getRootProps({ style })}>
        <input {...getInputProps()} />
        <p>Drag and drop one file here, or click to select file</p>
        <em>(Only *.csv will be accepted)</em>
      </div>
      {acceptedFileItems.length > 0 && (
        // 파일 선택 시 업로드 버튼 노출
        <aside>
          <h4>File information</h4>
          <ul>{acceptedFileItems}</ul>

          <div className={classes.btngroup}>
            <Button
              variant="contained"
              color="primary"
              onClick={onSubmitHandler}
              disabled={isProgressShow}
            >
              {isProgressShow ? "Uploading..." : "Upload"}
            </Button>
          </div>
        </aside>
      )}
    </section>
  );
}

export default FileDropZone;
