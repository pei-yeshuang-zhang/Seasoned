import {
  SHOW_FAVOURITES,
  SAVE_FAVOURITE,
  DEL_FAVOURITE,
  EDIT_FAVOURITE,
  EDIT_RATING,
} from '../actions'

function favourites(state = [], action) {
  const { type, payload } = action

  switch (type) {
    case SHOW_FAVOURITES:
      return payload
    case SAVE_FAVOURITE:
      return [...state, payload]
    case DEL_FAVOURITE:
      return state.filter((favourite) => !favourite.id === payload.id)
    case EDIT_FAVOURITE:
      return state.map((favourite) => {
        if (favourite.id === payload) {
          favourite.done = !favourite.done
        }
        return favourite
      })
    // case EDIT_RATING:
    //   console.log('EDIT_RATING', payload)
    //   return state.map((favourite) => {
    //     if (favourite.id === payload.id) {
    //       favourite.rating = payload.rating
    //     }
    //     return favourite
    //   })
    default:
      return state
  }
}

export default favourites
