import {
  put, call, takeEvery, all
} from "redux-saga/effects";
import axios from "axios";
import _ from "lodash";
import api from "../../api/api";
import * as dataActions from "./CharacterDetails.actions";
import CHARACTER_DETAILS from "./CharacterDetails.constants";


function* getCharacterDetails({ id }) {
  try {
    const { data } = yield call(axios.get, `${api.characters}/${id}`);
    const episodesDetails = yield all(
      _.map(
        _.takeRight(data.episode, 5),
        (episodeItem) => call(axios.get, episodeItem)
      )
    );
    yield put(dataActions.getCharacterDetailsFinish(data, episodesDetails));
  }
  catch (error) {
    yield put(dataActions.getCharacterDetailsRejected({ fetching: false }));
  }
}

export default function* GetCharacterDetailsSaga() {
  yield takeEvery(CHARACTER_DETAILS.GET_CHARACTER_DETAILS_START, getCharacterDetails);
}
