import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";

import CharacterListReducer from "./containers/CharacterList/CharacterList.reducer";
import CharacterDetailsReducer from "./containers/CharacterDetails/CharacterDetails.reducer";


const rootReducer = (history) => combineReducers({
  characterList: CharacterListReducer,
  characterDetails: CharacterDetailsReducer,
  router: connectRouter(history)
});


export default rootReducer;
