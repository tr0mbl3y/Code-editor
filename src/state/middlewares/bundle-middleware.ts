import { ActionType } from "../action-types";
import { Middleware } from "./middleware";
import bundle from "../../bundler";

//this is logic to select code cell based on user action
//only when user type in code cell we would dp bundling in other cases
//like movin,remving  code/text cell nothing happens
let timer: any;
export const bundlerMiddleware: Middleware = ({ getState, dispatch }) => (
  next
) => (action) => {
  next(action);
  //console.log(action);

  if (action.type !== ActionType.UPDATE_CELL) {
    return;
  }
  const {
    //we only care about data inside cell inside state object
    // thasts why we are destuctring specified properties only
    cells: { data: cellData },
  } = getState();

  const cell = cellData[action.payload.id];
  //console.log(cell);
  if (cell.type === "text") {
    return;
  }
  clearTimeout(timer);
  timer = setTimeout(async () => {
    console.log("starting bundling");
    const result = await bundle(action.payload.content);

    dispatch({
      type: ActionType.BUNDLE_CREATED,
      payload: {
        cellId: action.payload.id,
        bundle: result,
      },
    });
    console.log("dispatched bundle created");
  }, 750);
};
