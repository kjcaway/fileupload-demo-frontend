import React from "react";
import { DialogContentText } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useDispatch, useSelector } from "react-redux";
import * as popup from "../../store/reducer/popup";

/**
 * 팝업을 위한 컴포넌트
 */
function PopConfirm() {
  const isShow = useSelector((store) => store.popup.confirm.isShow);
  const title = useSelector((store) => store.popup.confirm.title);
  const contents = useSelector((store) => store.popup.confirm.contents);
  const dispatch = useDispatch();

  const handleClickClose = () => {
    dispatch({ type: popup.CLOSE_POPUP });
  };


  return (
    <Dialog
      open={isShow}
      onClose={handleClickClose}
      aria-labelledby="dialog-title"
    >
      <DialogTitle id="dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{contents}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClickClose} variant="outlined" color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default PopConfirm;
