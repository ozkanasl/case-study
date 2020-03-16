import CHARACTER_DETAILS from "./CharacterDetails.constants";

const initialState = {
  isLoading: true,
  characterDetails: {}
};

const CharacterDetailsReducer = (state: Object = initialState, action: Object) => {
  switch (action.type) {
    case CHARACTER_DETAILS.GET_CHARACTER_DETAILS_START:
      return {
        ...state
      };

    case CHARACTER_DETAILS.GET_CHARACTER_DETAILS_FINISH:
      return {
        ...state,
        characterDetails: action.characterDetails,
        getEpisodesDetails: action.getEpisodesDetails,
        isLoading: false
      };
    case CHARACTER_DETAILS.GET_CHARACTER_DETAILS_REJECTED:
      return {
        ...state,
        isLoading: false,
        errorMessage: action.errorMessage
      };
    default:
      return state;
  }

};


export default CharacterDetailsReducer;
