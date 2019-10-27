import * as types from "../actions/actionTypes";

const initialState = {
  landing_films: null,
  heroebanner_films: null,
  currentlyshowing_films: null,
  upcoming_films: null,
  cinemastate: null,
  cinemastateid: 1,
  cinemastatename: "Lagos",
  showtime: null,
  activemovie: null,
  daterange: null,
  filmgenre: null,
  vod_films: null,
  svod_films: null,
  featured_cinema_film: null,
  film_one: null
};
export default function(state = initialState, action) {
  switch (action.type) {
    case types.SAVE_LANDING_FILMS:
      return {
        ...state,
        landing_films: action.landing_films
      };
    case types.SAVE_FEATURED_CINEMA_FILM:
      return {
        ...state,
        featured_cinema_film: action.featured_cinema_film
      };
    case types.SAVE_FILM_GENRE:
      return {
        ...state,
        filmgenre: action.filmgenre
      };
    case types.SAVE_DATE_RANGE:
      return {
        ...state,
        daterange: action.daterange
      };
    case types.SAVE_HEROE_BANNER:
      return {
        ...state,
        heroebanner_films: action.heroebanner_films
      };
    case types.SAVE_SHOW_TIME:
      return {
        ...state,
        showtime: action.showtime
      };
    case types.CLEAR_PREV_SHOW_TIME:
      return {
        ...state,
        showtime: null
      };
    case types.SAVE_ACTIVE_MOVIE:
      return {
        ...state,
        activemovie: action.activemovie
      };
    case types.SAVE_CINEMA_STATE:
      return {
        ...state,
        cinemastate: action.cinemastate
      };
    case types.SAVE_CINEMA_STATE_ID:
      return {
        ...state,
        cinemastateid: action.cinemastateid
      };
    case types.SAVE_CINEMA_STATE_NAME:
      return {
        ...state,
        cinemastatename: action.cinemastatename
      };
    case types.SAVE_CURRENTLY_SHOWING:
      return {
        ...state,
        currentlyshowing_films: action.currentlyshowing_films
      };
    case types.SAVE_UPCOMING_FILMS:
      return {
        ...state,
        upcoming_films: action.upcoming_films
      };
    case types.SAVE_VOD_FILMS:
      return {
        ...state,
        vod_films: action.vod_films
      };
    case types.SAVE_SVOD_FILMS:
      return {
        ...state,
        svod_films: action.svod_films
      };
    case types.SAVE_FILM_ONE:
      return {
        ...state,
        film_one: action.film_one
      };

    default:
      return state;
  }
}
