import CHARACTER_LIST from "./CharacterList.constants";


export const getCharacterListStart = () => ({
  type: CHARACTER_LIST.GET_CHARACTER_LIST_START
});

export const triggerGetCharacterList = (newPage) => ({
  type: CHARACTER_LIST.TRIGGER_GET_CHARACTER_LIST,
  newPage
});

export const getCharacterListFinish = (characterList, page) => ({
  type: CHARACTER_LIST.GET_CHARACTER_LIST_FINISH,
  characterList,
  page
});

export const getCharacterListRejected = (errorMessage) => ({
  type: CHARACTER_LIST.GET_CHARACTER_LIST_REJECTED,
  errorMessage
});
