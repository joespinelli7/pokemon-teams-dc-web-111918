const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

document.addEventListener("DOMContentLoaded", () => {
  getAllTrainers();

})

function getAllTrainers() {
  fetch(TRAINERS_URL)
    .then(res => res.json())
    .then(trainers => {
      trainers.forEach( trainer => {
        renderTrainer(trainer)
      })
    })
}

function renderTrainer(trainer) {
  let trainerMain = document.querySelector('main')

  let trainerDiv = document.createElement('div')
  trainerDiv.classList.add('card')
  trainerDiv.dataset["id"] = trainer.id

  let trainerNameP = document.createElement('p')
  trainerNameP.innerText = trainer.name

  let addPokeBtn = document.createElement('button')
  addPokeBtn.dataset["trainerId"] = trainer.id
  addPokeBtn.innerText = "Add Pokemon"
  addPokeBtn.addEventListener('click', () => fetchNewPokemon(trainer))
  trainerDiv.appendChild(trainerNameP)
  trainerDiv.appendChild(addPokeBtn)

  let ul = document.createElement('ul')
  ul.classList.add(`pokemon-${trainer.id}`)

  trainer.pokemons.forEach( (pokemon) =>{

    let li = createLiPokemon(pokemon)
    ul.appendChild(li)
    trainerDiv.appendChild(ul)

  })

  trainerMain.appendChild(trainerDiv)
}

function createLiPokemon(pokemon) {
  let li = document.createElement('li')
  li.innerText = `${pokemon.nickname} (${pokemon.species})`
  li.classList.add(`pokemon-${pokemon.id}`)
  let releaseBtn = document.createElement('button')

  releaseBtn.dataset["pokemonId"] = pokemon.id
  releaseBtn.classList.add("release")
  releaseBtn.innerText = "Release"
  releaseBtn.addEventListener('click', () => deletePokemon(pokemon))
  li.appendChild(releaseBtn)
  return li
}

function fetchNewPokemon(trainer) {
  fetch(POKEMONS_URL, {
    method: "POST",
    headers: {
      "Content-Type" : "application/json",
      "Accept" : "application/json"
    },
    body: JSON.stringify({
      trainer_id: trainer.id
    })
  })
  .then(res => res.json())
  .then(pokemon => {
    // debugger
    renderPokemon(pokemon)
  })
}

function renderPokemon(pokemon) {
  //find area (specific trainer's card) to append newly created pokemon li tolet
  // let button = document.querySelector(`[data-trainer-id="${pokemon.trainer_id}"]`)
  let ul = document.querySelector(`.pokemon-${pokemon.trainer_id}`)
  let li = createLiPokemon(pokemon)
  ul.appendChild(li)
}

function deletePokemon(pokemon) {
  fetch(`${POKEMONS_URL}/${pokemon.id}`, {
    method: "DELETE"
  })
  .then(res => res.json())
  .then(pokemon => {
    removePokemonHTML(pokemon)
  })
}

function removePokemonHTML(pokemon) {
  let li = document.querySelector(`.pokemon-${pokemon.id}`)
  li.remove()
}
