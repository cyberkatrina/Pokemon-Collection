
let max = 1300
let min = 0
let randomPokeNum
let twoPokemon
let twoPokemonTypes = []
let strengthBonus = 1.5


const randomPokeGen = () => {
  randomPokeNum = Math.floor(Math.random() * (max - min + 1) + min);
}
randomPokeGen()

const getPokemon = () => {
  fetch(`https://pokeapi.co/api/v2/pokemon?limit=2&offset=${randomPokeNum}`)
    .then(res => {
      if(!res.ok) {
        throw Error(res.statusText)
      } return res.json()
    })
    .then(pokemon => twoPokemon = pokemon.results)
    .then(pokemon => getPokemonDetails())


}
getPokemon()

getPokemonDetails = () => {
  for (let i = 0; i < twoPokemon.length; i++) {
    fetch(twoPokemon[i].url)
    .then(res => {
      if(!res.ok) {
        throw Error(res.statusText)
      } return res.json()
    })
    .then(pokemon => twoPokemon[i] = pokemon)
    .then(pokemon => getTypeDetails(pokemon, i))

    

  }
  
}


const getTypeDetails = (pokemon, index) => {
  let pokeA = pokemon.types
  // let pokeB = twoPokemon[1].types
  for (let i = 0; i < pokeA.length; i++) {
    fetch(pokeA[i].type.url)
    .then(res => {
      if(!res.ok) {
        throw Error(res.statusText)
      } return res.json()
    })
    .then(types => pokeA = types)
    .then(types => twoPokemonTypes[index] = types)

  }
  // for (let i = 0; i < pokeB.length; i++) {
  //   fetch(pokeB[i].type.url)
  //   .then(res => {
  //     if(!res.ok) {
  //       throw Error(res.statusText)
  //     } return res.json()
  //   })
  //   .then(types => pokeB = types)
  //   .then(types => twoPokemonTypes[1] = types)
  // }

}



const refetchPokemon = () => {
  randomPokeGen()
  getPokemon()
  console.log("Two new pokemon chosen")
}



const logFetch = () => {
  randomPokeGen()
  console.log(randomPokeNum)
  console.log(twoPokemon)
}

const logGoodPokemon = () => {
  console.log(twoPokemon)
}


const compareTwoBasic = () => {
  aPower = 0
  bPower = 0
  for (let i = 0; i < twoPokemon[0].stats.length; i++) {
    aPower += twoPokemon[0].stats[i].base_stat
  }
  for (let i = 0; i < twoPokemon[1].stats.length; i++) {
    bPower += twoPokemon[1].stats[i].base_stat
  }


  console.log(aPower + " vs " + bPower)
  if (aPower > bPower) {
    console.log(twoPokemon[0].name + "is stronger than " + twoPokemon[1].name)
  } else if (aPower < bPower) {
    console.log(twoPokemon[1].name + "is stronger than " + twoPokemon[0].name)
  } else {
    console.log(twoPokemon[0].name + "is just as strong as " + twoPokemon[0].name)
  }
}




const compareTwoAdvanced = () => {
  let pokeAStrength = twoPokemonTypes[0].damage_relations.double_damage_to
  let pokeAWeakness = twoPokemonTypes[0].damage_relations.half_damage_to

  let pokeBStrength = twoPokemonTypes[1].damage_relations.double_damage_to
  let pokeBWeakness = twoPokemonTypes[1].damage_relations.half_damage_to



  aPower = 0
  bPower = 0
  for (let i = 0; i < twoPokemon[0].stats.length; i++) {
    aPower += twoPokemon[0].stats[i].base_stat
  }
  for (let i = 0; i < twoPokemon[1].stats.length; i++) {
    bPower += twoPokemon[1].stats[i].base_stat
  }

  console.log(twoPokemon)
  for (let i = 0; i < pokeAStrength.length; i++) {
    for (let j = 0; j < twoPokemon[1].types.length; j++) {
      if (pokeAStrength[i].name === twoPokemon[1].types[j].type.name) {
        aPower = aPower * strengthBonus
        console.log(twoPokemon[0].name + " is strong against " + twoPokemon[1].types[j].type.name)
      }
      
    }
  }
  for (let i = 0; i < pokeAWeakness.length; i++) {
    for (let j = 0; j < twoPokemon[1].types.length; j++) {
      if (pokeAWeakness[i].name === twoPokemon[1].types[j].type.name) {
        aPower = aPower / strengthBonus
        console.log(twoPokemon[0].name + " is weak against " + twoPokemon[1].types[j].type.name)
      }
    }
  }

  for (let i = 0; i < pokeBStrength.length; i++) {
    for (let j = 0; j < twoPokemon[0].types.length; j++) {
      if (pokeBStrength[i].name === twoPokemon[0].types[j].type.name) {
        bPower = bPower * strengthBonus
        console.log(twoPokemon[1].name + " is strong against " + twoPokemon[0].types[j].type.name)
      }
    }
  }
  for (let i = 0; i < pokeBWeakness.length; i++) {
    for (let j = 0; j < twoPokemon[1].types.length; j++) {
      if (pokeBWeakness[i].name === twoPokemon[0].types[j].type.name) {
        bPower = bPower / strengthBonus
        console.log(twoPokemon[1].name + " is weak against " + twoPokemon[0].types[j].type.name)
      }
    }
  }

  
  console.log(aPower + " vs " + bPower)
  if (aPower > bPower) {
    console.log(twoPokemon[0].name + " is stronger than " + twoPokemon[1].name)
  } else if (aPower < bPower) {
    console.log(twoPokemon[1].name + " is stronger than " + twoPokemon[0].name)
  } else {
    console.log(twoPokemon[0].name + " is just as strong as " + twoPokemon[0].name)
  }
}
