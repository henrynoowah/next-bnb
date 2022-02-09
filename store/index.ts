import { HYDRATE, createWrapper, MakeStore } from "next-redux-wrapper";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  TypedUseSelectorHook,
  useSelector as useReduxSelector
} from "react-redux";
import userSlice from "./user";
import commonSlice from "./common";
import authSlice from "./auth";
import registerRoomSlice from "./registerRoom";

const rootReducer = combineReducers({
  user: userSlice.reducer,
  common: commonSlice.reducer,
  auth: authSlice.reducer,
  registerRoom: registerRoomSlice.reducer
});

export type RootState = ReturnType<typeof rootReducer>;

let initialRootState: RootState;

const reducer = (state: any, action: any) => {
  if (action.type === HYDRATE) {
    // if (action.payload.app === 'init') delete action.payload.app;
    // if (action.payload.page === 'init') delete action.payload.page;
    if (state === initialRootState) {
      return {
        ...state,
        ...action.payload
      };
    }
    return state;
  }
  return rootReducer(state, action);
};

// 타입 지원되는 커스텀 useSelector 만들기
export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;

const initiStore = () => {
  const store = configureStore({
    reducer,
    devTools: true
  });
  initialRootState = store.getState();
  return store;
}

export const wrapper = createWrapper(initiStore);