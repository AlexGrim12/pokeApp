'use client'
import { useState, useEffect, ChangeEvent } from 'react'
import axios from 'axios'
import Confetti from 'react-confetti'

interface Pokemon {
  name: string
  types: { type: { name: string } }[]
  stats: { base_stat: number }[]
  sprites: { front_default: string; back_default: string }
}

const getNumRandom = (): number => Math.floor(Math.random() * 1000) + 1

const Home = () => {
  const [pokemonJugador, setPokemonJugador] = useState<Pokemon | null>(null)
  const [pokemonRival, setPokemonRival] = useState<Pokemon | null>(null)
  const [inputPoke, setInputPoke] = useState<string>('')
  const [resultado, setResultado] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    obtenerPokeRival()
  }, [])

  const obtenerPokeRival = () => {
    const numPokeRival = getNumRandom()
    axios
      .get<Pokemon>(`https://pokeapi.co/api/v2/pokemon/${numPokeRival}`)
      .then((res) => {
        setPokemonRival(res.data)
      })
  }

  const obtenerPokePropio = () => {
    const num = parseInt(inputPoke, 10)
    if (isNaN(num) || num < 1 || num > 1000) {
      setError('Por favor ingresa un número válido entre 1 y 1000.')
      return
    }
    setError(null)
    axios
      .get<Pokemon>(`https://pokeapi.co/api/v2/pokemon/${num}`)
      .then((res) => {
        setPokemonJugador(res.data)
      })
  }

  const combate = () => {
    if (!pokemonJugador || !pokemonRival) return

    const ataquePropio = pokemonJugador.stats[0].base_stat
    const ataqueRival = pokemonRival.stats[0].base_stat

    if (ataquePropio > ataqueRival) {
      setResultado('Ganaste')
    } else {
      setResultado('Perdiste')
    }
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputPoke(e.target.value)
  }

  const cerrarResultado = () => {
    setResultado(null)
  }

  return (
    <div
      className="min-h-screen bg-zinc-900 text-gray-100 flex flex-col items-center justify-center p-4"
      style={{
        backgroundImage: `url(${'https://e00-marca.uecdn.es/assets/multimedia/imagenes/2022/03/01/16461269752807.jpg'})`, // Aplicando la imagen de fondo
        backgroundSize: 'cover', // Ajusta el tamaño de la imagen para cubrir todo el contenedor
        backgroundPosition: 'center', // Centra la imagen en el contenedor}}>
      }}
    >
      <div className="flex space-x-4 mb-4">
        <div
          className="bg-zinc-800 p-6 rounded-lg shadow-md w-full max-w-md"
          style={{
            background: 'rgba( 0, 0, 0, 0.25 )',
            boxShadow: '0 8px 32px 0 rgba( 31, 38, 135, 0.37 )',
            backdropFilter: 'blur( 4px )',
            WebkitBackdropFilter: 'blur( 4px )',
            borderRadius: '10px',
            border: '1px solid rgba( 255, 255, 255, 0.18 )',
          }}
        >
          <div className="flex flex-col items-center min-w-72">
            {pokemonJugador && (
              <>
                <h3 className="text-xl font-semibold" id="nombrePoke-propio">
                  {pokemonJugador.name.toUpperCase()}
                </h3>
                <p id="tipoPropio">Tipo: {pokemonJugador.types[0].type.name}</p>
                <p>
                  Ataque:{' '}
                  <span id="ataquePropio">
                    {pokemonJugador.stats[0].base_stat}
                  </span>
                </p>
                <img
                  id="poke1"
                  src={pokemonJugador.sprites.back_default}
                  alt={pokemonJugador.name}
                  className="w-32 h-32"
                />
              </>
            )}
          </div>
        </div>
        <div
          className="bg-zinc-800 p-6 rounded-lg shadow-md w-full max-w-md "
          style={{
            background: 'rgba( 0, 0, 0, 0.25 )',
            boxShadow: '0 8px 32px 0 rgba( 31, 38, 135, 0.37 )',
            backdropFilter: 'blur( 4px )',
            WebkitBackdropFilter: 'blur( 4px )',
            borderRadius: '10px',
            border: '1px solid rgba( 255, 255, 255, 0.18 )',
          }}
        >
          <div className="flex flex-col items-center min-w-72">
            {pokemonRival && (
              <>
                <h3 className="text-xl font-semibold" id="nombrePoke-rival">
                  {pokemonRival.name.toUpperCase()}
                </h3>
                <p id="tipoRival">Tipo: {pokemonRival.types[0].type.name}</p>
                <p>
                  Ataque:{' '}
                  <span id="ataqueRival">
                    {pokemonRival.stats[0].base_stat}
                  </span>
                </p>
                <img
                  id="poke2"
                  src={pokemonRival.sprites.front_default}
                  alt={pokemonRival.name}
                  className="w-32 h-32"
                />
              </>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center space-y-4">
        <input
          type="text"
          id="inputPoke"
          value={inputPoke}
          onChange={handleInputChange}
          placeholder="Ej: 1, 2, 3"
          className="p-2 border border-zinc-600 rounded bg-zinc-700 text-gray-100
          "
        />
        {error && <p className="text-red-500">{error}</p>}
        <button
          id="btnPoke"
          onClick={obtenerPokePropio}
          className="bg-zinc-800 text-white px-4 py-2 rounded hover:bg-zinc-700"
        >
          Elegir Pokémon
        </button>
        <button
          id="btnAtacar"
          onClick={combate}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-500"
        >
          Atacar
        </button>
      <footer
        className="text-center text-sm mt-4 p-2 bg-zinc-800 rounded-lg shadow-md w-full max-w-sm"
        style={{
          background: 'rgba( 0, 0, 0, 0.25 )',
          boxShadow: '0 8px 32px 0 rgba( 31, 38, 135, 0.37 )',
          backdropFilter: 'blur( 4px )',
          WebkitBackdropFilter: 'blur( 4px )',
          borderRadius: '10px',
          border: '1px solid rgba( 255, 255, 255, 0.18 )',
        }}
      >
        Alejandro Grimaldo
      </footer>
      </div>

      {resultado && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75">
          {resultado === 'Ganaste' && <Confetti />}
          <div className="bg-zinc-800 px-16 py-10 rounded-lg shadow-md text-center relative">
            <button
              onClick={cerrarResultado}
              className="absolute top-2 right-2 text-white"
            >
              &#x2716;
            </button>
            <h3 className="text-xl font-semibold">{resultado}</h3>
          </div>
        </div>
      )}
    </div>
  )
}

export default Home
