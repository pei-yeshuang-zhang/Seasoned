import { getRecipes } from '../apis/recipes'
import { getProduce, getAvailableProduct } from '../apis/produce'
import {
  postFavourite,
  getUserFavourites,
  patchFavourite,
  removeFavourite,
  changeRating,
} from '../apis/favourites'

export const DISPLAY_RECIPES = 'DISPLAY_RECIPES'
export const SELECT_DIETARY = 'SELECT_DIETARY'
export const REMOVE_DIETARY = 'REMOVE_DIETARY'
export const DISPLAY_PRODUCT = 'DISPLAY_PRODUCT'

export const SHOW_FAVOURITES = 'SHOW_FAVOURITES'
export const SAVE_FAVOURITE = 'SAVE_FAVOURITE'
export const EDIT_FAVOURITE = 'EDIT_FAVOURITE'
export const DEL_FAVOURITE = 'DEL_FAVOURITE'
export const EDIT_RATING = 'EDIT_RATING'

export const SET_PRODUCE = 'SET_PRODUCE'

export const LOADING = 'LOADING'
export const STOP_LOADING = 'STOP_LOADING'

export function displayAvailableProducts(product) {
  return {
    type: DISPLAY_PRODUCT,
    payload: product,
  }
}

export function fetchSeason(season) {
  return async (dispatch) => {
    try {
      const product = await getAvailableProduct(season)
      dispatch(displayAvailableProducts(product))
    } catch (err) {
      console.log('fetchSeason - ' + err)
    }
  }
}

export function setLoading() {
  return {
    type: LOADING,
  }
}

export function stopLoading() {
  return {
    type: STOP_LOADING,
  }
}

export function dietarySelect(dietaryType) {
  return {
    type: SELECT_DIETARY,
    payload: dietaryType,
  }
}

export function dietaryRemove(dietaryType) {
  return {
    type: REMOVE_DIETARY,
    payload: dietaryType,
  }
}

export function displayRecipes(recipes) {
  return {
    type: DISPLAY_RECIPES,
    payload: recipes,
  }
}

export function fetchRecipes(userInput) {
  return async (dispatch) => {
    try {
      dispatch(setLoading())
      const recipes = await getRecipes(userInput)
      setTimeout(() => {
        dispatch(stopLoading())
        dispatch(displayRecipes(recipes))
      }, 1000)
    } catch (err) {
      console.log('fetchRecipes - ' + err)
    }
  }
}

export function setProduce(produce) {
  return {
    type: SET_PRODUCE,
    payload: produce,
  }
}

export function fetchProduce() {
  return async (dispatch) => {
    try {
      const produce = await getProduce()
      dispatch(setProduce(produce))
    } catch (err) {
      console.log('fetchProduce - ' + err)
    }
  }
}

export function showFavourites(favourites) {
  return {
    type: SHOW_FAVOURITES,
    payload: favourites,
  }
}

export function getFavourites(auth0_id) {
  return async (dispatch) => {
    try {
      const res = await getUserFavourites(auth0_id)
      return dispatch(showFavourites(res))
    } catch (err) {
      console.log('getFavourites - ', err.message)
    }
  }
}

export function removeFavouriteAction(id, auth0_id) {
  return async (dispatch) => {
    try {
      removeFavourite(id)
      return dispatch(getFavourites(auth0_id))
    } catch (err) {
      console.log('removeFavouriteAction - ', err.message)
    }
  }
}

export function changeFavourite(id) {
  return {
    type: EDIT_FAVOURITE,
    payload: id,
  }
}

export function editFavourite(id, recipeObj) {
  changeFavourite(id)
  return async (dispatch) => {
    try {
      const res = await patchFavourite(id, recipeObj)
      return dispatch(changeFavourite(id))
    } catch (err) {
      console.log('editFavourite - ', err.message)
    }
  }
}

// export function changeRating(favourite) {
//   return {
//     type: EDIT_RATING,
//     payload: favourite,
//   }
// }

// export function editRating(id, rating) {
//   const favourite = { id, rating }
//   console.log(favourite)
//   return async (dispatch) => {
//     try {
//       const res = await patchFavourite(id, favourite)
//       return dispatch(changeRating(favourite))
//     } catch (err) {
//       console.log('editRating - ', err.message)
//     }
//   }
// }
