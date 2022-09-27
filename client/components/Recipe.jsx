import React, { useState } from 'react'

import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import FavoriteBorder from '@mui/icons-material/FavoriteBorder'
import Favorite from '@mui/icons-material/Favorite'
import { pink } from '@mui/material/colors'
import { Typography } from '@mui/material'

import { useAuth0 } from '@auth0/auth0-react'
import { postFavourite } from '../apis/favourites'

export default function Recipe() {
  const { id } = useParams()
  const { user } = useAuth0()
  const recipes = useSelector((state) => state.recipes)
  const [checked, setChecked] = useState(false)
  const recipe = recipes[id]

  const { label, image, ingredients, healthLabels, url } = recipe.recipe

  const dietary = healthLabels.filter((word) => {
    return word === 'Vegan' || word === 'Vegetarian' || word === 'Gluten-Free'
  })

  const handleFavorite = async (e) => {
    setChecked(!e.target.checked)

    console.log('Posting to the database now: ', user.sub, recipe)
    await postFavourite(user.sub, recipe)
  }

  return (
    <div>
      <h3>{label}</h3>
      <img src={image} alt={label} />
      <FormGroup>
        <FormControlLabel
          control={
            <Checkbox
              icon={<FavoriteBorder />}
              checkedIcon={<Favorite />}
              checked={checked}
              onChange={handleFavorite}
              sx={{
                color: pink[800],
                '&.Mui-checked': {
                  color: pink[600],
                },
              }}
            />
          }
          label="Add to Favourite"
        />
      </FormGroup>
      <p>
        <strong>{dietary.map((e) => e + ' ')} </strong>
      </p>
      <div>
        <Typography variant="h4">Ingredients</Typography>
        <ul>
          {ingredients.map((ingredient, idx) => (
            <li key={idx}>{ingredient.text}</li>
          ))}
        </ul>
        <h4>Instructions</h4>
        <a href={url}>Click this link</a>
      </div>
    </div>
  )
}
