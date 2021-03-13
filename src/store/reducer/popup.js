import produce from "immer";

/**
 * 팝업 기능 스토어
 */
export const OPEN_POPUP = "OPEN_POPUP";
export const CLOSE_POPUP = "CLOSE_POPUP";

export function openConfirm(payload) {
  return {
    type: OPEN_POPUP,
    payload: payload,
  };
}

export function closeConfirm() {
  return {
    type: CLOSE_POPUP,
  };
}

const initialState = {
  confirm: {
    isShow: false,
    title: "",
    contents: "",
  },
};

export function popupReducer(state = initialState, action) {
  switch (action.type) {
    case OPEN_POPUP:
      return produce(state, (draft) => {
        draft.confirm.isShow = true;
        draft.confirm.title = action.payload.title;
        draft.confirm.contents = action.payload.contents;
      });
    case CLOSE_POPUP:
      return produce(state, (draft) => {
        draft.confirm.isShow = false;
      });
    default:
      return state;
  }
}
