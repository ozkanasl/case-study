import { put, call, takeEvery, select } from "redux-saga/effects";
import axios from "axios";
import api from "../../api/api";
import * as dataActions from "./CharacterList.actions";
import CHARACTER_LIST from "./CharacterList.constants";

import _ from "lodash";

function* getCharacterList({ newPage = 1 }) {
  try {
    const { data } = yield call(axios.get, api.characters, {
      params: {
        page: newPage
      }
    });

    if (_.get(data.info, "next")) {
      const oldList = yield select(state => {
        return _.get(state, "characterList.characterList", []);
      });
      yield put(dataActions.getCharacterListFinish(
        [
          ...oldList,
          ...data.results
        ],
        newPage
      ));
    }
    else {
      yield put(dataActions.getCharacterListRejected());
    }
  }
  catch {
    yield put(dataActions.getCharacterListRejected());
  }
}


export default function* GetCharacterListSaga() {
  yield takeEvery(CHARACTER_LIST.GET_CHARACTER_LIST_START, getCharacterList);
  yield takeEvery(CHARACTER_LIST.TRIGGER_GET_CHARACTER_LIST, getCharacterList);
}
