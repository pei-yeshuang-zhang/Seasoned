import request from 'superagent'

const rootUrl = '/api/v1'

export async function postFavourite(recipe, auth0Id) {
  try {
    const res = await request
      .post(`${rootUrl}/favourites`)
      .send(recipe, auth0Id)
    return res.body
  } catch (err) {
    console.log('Err message: ' + err)
  }
}

export async function getUserFavourites(auth0_id) {
  try {
    const res = await request.get(`${rootUrl}/favourites/user/${auth0_id}`)
    return res.body
  } catch (err) {
    console.log('Err message: ' + err)
  }
}

export async function patchFavourite(id, favourite) {
  const res = await request.patch('/api/v1/favourites/' + id).send(favourite)
  return res.body
}

export async function removeFavourite(id) {
  try {
    const res = await request.delete(`${rootUrl}/favourites/${id}`)
    return res.body
  } catch (err) {
    console.log('Err message: ' + err)
  }
}
