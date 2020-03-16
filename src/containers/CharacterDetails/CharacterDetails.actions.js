import CHARACTER_DETAILS from "./CharacterDetails.constants";


export const getCharacterDetailsStart = (id) => ({
  type: CHARACTER_DETAILS.GET_CHARACTER_DETAILS_START,
  id
});


export const getCharacterDetailsFinish = (characterDetails, getEpisodesDetails) => ({
  type: CHARACTER_DETAILS.GET_CHARACTER_DETAILS_FINISH,
  characterDetails,
  getEpisodesDetails
});

export const getCharacterDetailsRejected = (errorMessage) => ({
  type: CHARACTER_DETAILS.GET_CHARACTER_DETAILS_REJECTED,
  errorMessage
});
