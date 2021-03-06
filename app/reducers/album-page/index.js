import * as types from '../../constants/ActionTypes.js';
import { combineReducers } from 'redux';

export function albumPageData(state = null, action) {
  switch (action.type) {
    case types.RECEIVE_ALBUM_PAGE_DATA:
      // TODO: need a better solution for dealing with images here
      // what if this image is not defined
      // need to also confirm that all the required properties are here
      return {
        artist: action.json.album.artist,
        tracks: action.json.album.tracks.track,
        name: action.json.album.name,
        image: action.json.album.image[2]['#text'],
      }
    case types.CLEAR_ALBUM_PAGE_DATA:
      return null;
    default:
      return state
  }
}

export function currentAlbumPageError(state = false, action) {
  switch(action.type) {
    case types.ALBUM_PAGE_DATA_ERROR:
      return true;
    case types.CLEAR_ALBUM_PAGE_ERROR:
      return false;
    default:
      return state;
  }
}


export const albumPage = combineReducers({
  albumPageData,
  currentAlbumPageError,
});
