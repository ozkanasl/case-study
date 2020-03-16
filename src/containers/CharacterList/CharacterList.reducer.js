import CHARACTER_LIST from "./CharacterList.constants";

const initialState = {
  isLoading: false,
  errorMessage: "",
  page: 1,
  characterList: [],
  allCharacterLoaded: false
};

const CharacterListReducer = (state: Object = initialState, action: Object) => {
  switch (action.type) {
    case CHARACTER_LIST.TRIGGER_GET_CHARACTER_LIST:
      return {
        ...state,
        isLoading: true
      };

    case CHARACTER_LIST.GET_CHARACTER_LIST_FINISH:
      return {
        ...state,
        characterList: action.characterList,
        page: action.page,
        isLoading: false
      };
    case CHARACTER_LIST.GET_CHARACTER_LIST_REJECTED:
      return {
        ...state,
        isLoading: false,
        errorMessage: action.errorMessage
      };
    default:
      return state;
  }

};


export default CharacterListReducer;
