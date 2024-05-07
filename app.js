const imgPoke2 = document.querySelector('#poke2')
const namePoke2 = document.querySelector('#nombrePoke-rival')
const poke2Tipo = document.querySelector('#tipoRival')
const poke2Ataque = document.querySelector('#ataqueRival')
const inputPoke = document.querySelector('#inputPoke')
const btnPoke = document.querySelector('#btnPoke')
const imgPoke1 = document.querySelector('#poke1')
const poke1Tipo = document.querySelector('#tipoPropio')
const namePoke1 = document.querySelector('#nombrePoke-propio')
const poke1Ataque = document.querySelector('#ataquePropio')
const btnAtacar = document.querySelector('#btnAtacar')

const getNumRandom = () => {
  let min = Math.ceil(0)
  let max = Math.floor(1001)

  return Math.floor(Math.random() * (max - min) + min)
}

const obtenerPokePropio = () => {
  const numPokePropio = inputPoke.value

  // alert(numPokePropio);

  axios
    .get(`https://pokeapi.co/api/v2/pokemon/${numPokePropio}`)
    .then((res) => {
      return res.data
    })
    .then((res) => {
      console.log(res)
      imgPoke1.src = res.sprites.back_default
      poke1Tipo.innerHTML = 'Tipo: ' + res.types[0].type.name
      namePoke1.innerHTML = 'Nombre: ' + res.name
      poke1Ataque.innerHTML = res.stats[0].base_stat
    })
}

const obtenerPokeRival = () => {
  const numPokeRival = getNumRandom()

  axios
    .get(`https://pokeapi.co/api/v2/pokemon/${numPokeRival}`)
    .then((res) => {
      return res.data
    })
    .then((res) => {
      console.log(res)
      imgPoke2.src = res.sprites.front_default
      poke2Tipo.innerHTML = 'Tipo: ' + res.types[0].type.name
      namePoke2.innerHTML = 'Nombre: ' + res.name
      poke2Ataque.innerHTML = res.stats[0].base_stat
    })
}

const combate = () => {
  const ataquePropio = poke1Ataque.innerHTML
  const ataqueRival = poke2Ataque.innerHTML

  if (ataquePropio > ataqueRival) {
    alert('Ganaste')
  } else {
    alert('Perdiste')
  }
}

window.addEventListener('load', obtenerPokeRival)
btnPoke.addEventListener('click', obtenerPokePropio)
btnAtacar.addEventListener('click', combate)
