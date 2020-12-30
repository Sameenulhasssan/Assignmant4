import { GET_COUNTRIES_INFO, GET_GLOBAL_INFO, HANDLE_FAVOURITE, REFRESH_FAVORITES } from "../actionTypes";

import { getCountriesInfo, getGlobalInfo, handleFavourite, refreshFavorites } from "../actions/globalActions";

export const initialState = { countriesInfo: [], globalInfo: {}, favourites: [] };

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_GLOBAL_INFO:
      return getGlobalInfo(state, action);
    case GET_COUNTRIES_INFO:
      return getCountriesInfo(state, action);
    case HANDLE_FAVOURITE:
      return handleFavourite(state, action);
    case REFRESH_FAVORITES:
      return refreshFavorites(state, action);
    default:
      return state;
  }
};
