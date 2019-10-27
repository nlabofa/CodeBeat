import * as constant from "../Constants";
import * as actionTypes from "./actionTypes";
import axios from "axios";
import Moment from "moment";
import { extendMoment } from "moment-range";
//import store from "../../root.store";
import {
  LoaderStart,
  LoaderStop,
  alertMessage,
  clearMessage,
  ItemLoaderStart,
  ItemLoaderStop
} from "./index";
import NavigationService from "../../Routes/NavigationService";
//import AsyncStorage from "@react-native-community/async-storage";
const moment = extendMoment(Moment);

export const saveLandingFilms = films => {
  return {
    type: actionTypes.SAVE_LANDING_FILMS,
    landing_films: films
  };
};
export const saveHeroeBanner = films => {
  return {
    type: actionTypes.SAVE_HEROE_BANNER,
    heroebanner_films: films
  };
};
export const saveCurrentlyShowing = films => {
  return {
    type: actionTypes.SAVE_CURRENTLY_SHOWING,
    currentlyshowing_films: films
  };
};
export const saveUpcomingFilms = films => {
  return {
    type: actionTypes.SAVE_UPCOMING_FILMS,
    upcoming_films: films
  };
};
export const saveVODFilms = films => {
  return {
    type: actionTypes.SAVE_VOD_FILMS,
    vod_films: films
  };
};
export const saveSVODFilms = films => {
  return {
    type: actionTypes.SAVE_SVOD_FILMS,
    svod_films: films
  };
};
export const saveFilmOneMovies = films => {
  return {
    type: actionTypes.SAVE_FILM_ONE,
    film_one: films
  };
};
export const saveCinemaState = state => {
  return {
    type: actionTypes.SAVE_CINEMA_STATE,
    cinemastate: state
  };
};
export const setCinemaStateId = id => {
  return {
    type: actionTypes.SAVE_CINEMA_STATE_ID,
    cinemastateid: id
  };
};
export const setCinemaStateName = name => {
  return {
    type: actionTypes.SAVE_CINEMA_STATE_NAME,
    cinemastatename: name
  };
};
export const saveFeaturedCinemaFilms = data => {
  return {
    type: actionTypes.SAVE_FEATURED_CINEMA_FILM,
    featured_cinema_film: data
  };
};
export const saveShowTime = data => {
  return {
    type: actionTypes.SAVE_SHOW_TIME,
    showtime: data
  };
};
export const saveActiveMovie = data => {
  return {
    type: actionTypes.SAVE_ACTIVE_MOVIE,
    activemovie: data
  };
};
export const clearPrevShowTime = () => {
  return {
    type: actionTypes.CLEAR_PREV_SHOW_TIME
  };
};
export const saveDateRange = data => {
  return {
    type: actionTypes.SAVE_DATE_RANGE,
    daterange: data
  };
};
export const saveFilmGenre = data => {
  return {
    type: actionTypes.SAVE_FILM_GENRE,
    filmgenre: data
  };
};
export const formatRange = () => {
  return dispatch => {
    const range = moment.range(moment(), moment().add(7, "day"));
    const range2 = Array.from(range.by("day"));
    var result = range2.map(date => ({
      //day: date.format("ddd"),
      day: date.format("ddd").toUpperCase(),
      month: moment(date).isSame(moment(), "day")
        ? "TODAY"
        : date.format("MMM").toUpperCase(),
      date: date.format("DD").toUpperCase(),
      fulldate: date
    }));
    dispatch(saveDateRange(result));
  };
};

export const fetchShowTime = data => {
  console.log(data);
  return dispatch => {
    // dispatch(clearPrevShowTime());
    dispatch(LoaderStart());
    axios
      .post(constant.baseUrl + "/filmhouse/get-showtimes-for-state", data)
      .then(response => {
        dispatch(LoaderStop());
        console.log(response);
        if (response.status == 200) {
          dispatch(saveShowTime(response.data.data));
        }
      })
      .catch(err => {
        dispatch(LoaderStop());
        // console.log(err);
        console.log(err.response.data);
      });
  };
};
export const fetchGenres = () => {
  return dispatch => {
    // dispatch(LoaderStart());
    axios
      .get(constant.baseUrl + `/genres`)
      .then(response => {
        // console.log(response);
        dispatch(saveFilmGenre(response.data.data));
      })
      .catch(err => {
        console.log(err);
        console.log(err.response.data);
      });
  };
};
export const fetchCinemaState = () => {
  return dispatch => {
    // dispatch(LoaderStart());
    axios
      .get(constant.baseUrl + `/states`)
      .then(response => {
        // console.log(response);
        dispatch(saveCinemaState(response.data.data));
      })
      .catch(err => {
        console.log(err);
        console.log(err.response.data);
      });
  };
};
export const fetchFeaturedFilms = () => {
  return dispatch => {
    // dispatch(LoaderStart());
    axios
      .get(
        constant.baseUrl +
          `/films?featured=true&$limit=5&$order=-createdAt&$include=${"film_casts,projections,film_categories"}` +
          constant.defaultQueryParams
      )
      .then(response => {
        // console.log(response.data.data);
        dispatch(saveHeroeBanner(response.data.data));
      })
      .catch(err => {
        console.log(err);
        console.log(err.response.data);
      });
  };
};
export const fetchCurrentlyShowing = () => {
  return dispatch => {
    // dispatch(LoaderStart());
    axios
      .get(
        constant.baseUrl +
          `/films?$order=-createdAt&$limit=15&type=cinema&$include=${"film_casts,projections,film_categories"}` +
          constant.defaultQueryParams
      )
      .then(response => {
        //console.log(response.data.data);
        dispatch(saveCurrentlyShowing(response.data.data));
      })
      .catch(err => {
        console.log(err);
        console.log(err.response.data);
      });
  };
};
export const fetchFeaturedCinemaFilms = () => {
  return dispatch => {
    // dispatch(LoaderStart());
    axios
      .get(
        constant.baseUrl +
          `/films?$limit=5&featured=true&type=cinema&$order=-createdAt&$include=${"film_casts,projections,film_categories"}` +
          constant.defaultQueryParams
      )
      .then(response => {
        // console.log(response.data.data);
        dispatch(saveFeaturedCinemaFilms(response.data.data));
      })
      .catch(err => {
        console.log(err);
        console.log(err.response.data);
      });
  };
};
export const fetchUpcoming = () => {
  return dispatch => {
    // dispatch(LoaderStart());
    axios
      .get(
        constant.baseUrl +
          `/films?$limit=10&type=cinema&upcoming=true&$order=-createdAt&$include=${"film_casts,projections,film_categories"}` +
          constant.defaultQueryParams
      )
      .then(response => {
        // console.log(response.data.data);
        dispatch(saveUpcomingFilms(response.data.data));
      })
      .catch(err => {
        console.log(err);
        console.log(err.response.data);
      });
  };
};
export const fetchVODFilms = () => {
  return dispatch => {
    // dispatch(LoaderStart());
    axios
      .get(
        constant.baseUrl +
          `/films?$limit=20&type=svod&type=tvod&$order=-createdAt&$include=${"film_casts,projections,film_categories"}` +
          constant.defaultQueryParams
      )
      .then(response => {
        // console.log(response.data.data);
        dispatch(saveVODFilms(response.data.data));
      })
      .catch(err => {
        console.log(err);
        console.log(err.response.data);
      });
  };
};
// export const fetchSVODFilms = () => {
//   return dispatch => {
//     // dispatch(LoaderStart());
//     axios
//       .get(
//         constant.baseUrl +
//           `/films?$limit=10&type=svod&$include=${"film_casts,projections,film_categories"}` +
//           constant.defaultQueryParams
//       )
//       .then(response => {
//         // console.log(response.data.data);
//         dispatch(saveSVODFilms(response.data.data));
//       })
//       .catch(err => {
//         console.log(err);
//         console.log(err.response.data);
//       });
//   };
// };

export const fetchLandingFilms = () => {
  return dispatch => {
    dispatch(fetchFeaturedFilms());
    dispatch(fetchFeaturedCinemaFilms());
    dispatch(fetchCurrentlyShowing());
    dispatch(fetchUpcoming());
    dispatch(fetchVODFilms());
    // dispatch(fetchSVODFilms());
    // axios
    //   .get(
    //     constant.baseUrl +
    //       `/films?$limit=${25}&$include=${"film_casts,projections,film_categories"}` +
    //       constant.defaultQueryParams
    //   )
    //   .then(response => {
    //     console.log(response.data.data);
    //     dispatch(saveLandingFilms(response.data.data));
    //     dispatch(saveHeroeBanner(response.data.data.slice(5, 8)));
    //     dispatch(saveCurrentlyShowing(response.data.data.slice(3, 8)));
    //     dispatch(saveUpcomingFilms(response.data.data.slice(8, 14)));
    //     dispatch(saveVODFilms(response.data.data.slice(14, 19)));
    //     dispatch(saveSVODFilms(response.data.data.slice(19, 25)));
    //   })
    //   .catch(err => {
    //     console.log(err);
    //     console.log(err.response.data);
    //   });
  };
};
