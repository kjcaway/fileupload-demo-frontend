import produce from "immer";

/**
 * 팝업 기능 스토어
 */
export const SHOW_PROGRESS = "SHOW_PROGRESS";
export const HIDE_PROGRESS = "HIDE_PROGRESS";
export const SET_PERCENTAGE = "SET_PERCENTAGE";

export function showProgress(payload) {
  return {
    type: SHOW_PROGRESS
  };
}

export function hideProgress() {
  return {
    type: HIDE_PROGRESS
  };
}

export function setPercentage(paylaod) {
  return {
    type: SET_PERCENTAGE,
    payload: paylaod
  };
}

const initialState = {
  isShow: false,
  percentage: 0
};

export function progressReducer(state = initialState, action) {
  switch (action.type) {
    case SHOW_PROGRESS:
      return produce(state, (draft) => {
        draft.isShow = true;
      });
    case HIDE_PROGRESS:
      return produce(state, (draft) => {
        draft.isShow = false;
      });
    case SET_PERCENTAGE:
      return produce(state, (draft) => {
        draft.percentage = action.payload;
      });
    default:
      return state;
  }
}
