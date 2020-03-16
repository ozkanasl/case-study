import { fork } from "redux-saga/effects";



import GetCharacterListSaga from "./containers/CharacterList/CharacterList.saga";

import GetCharacterDetailsSaga from "./containers/CharacterDetails/CharacterDetails.saga";

export default function* rootSaga() {
  yield fork(GetCharacterListSaga);
  yield fork(GetCharacterDetailsSaga);
}
