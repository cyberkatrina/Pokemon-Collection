
let max = 500
let min = 0
let twoPokemon = []
let twoPokemonTypes = []
let strengthBonus = 1.5

window.onload = function() {
  getPokemon()
  randomPokeGen()
}

const randomPokeGen = () => {
  let randomPokeNum = Math.floor(Math.random() * max);
  return randomPokeNum
}

const getPokemon = () => {
  let allPoke = []
  let dropDown1 = document.getElementById('choice1');
  let dropDown2 = document.getElementById('choice2');
  let newDefault1 = new Option('Select Pokemon', null, true, true)
  let newDefault2 = new Option('Select Pokemon', null, true, true)
  // newDefault1.disabled = true
  dropDown1.add(newDefault1)
  dropDown2.add(newDefault2)

  
  fetch(`https://pokeapi.co/api/v2/pokemon?&limit=500`)
    .then(res => {
      if(!res.ok) {
        throw Error(res.statusText)
      } return res.json()
    })
    .then(pokemon => allPoke = pokemon.results)
    .then(pokemon => twoPokemon.push(allPoke[randomPokeGen()]))
    .then(pokemon => twoPokemon.push(allPoke[randomPokeGen()]))
    .then(pokemon => getPokemonDetails())
    .catch(err => console.log(`Error,  ${err}`))
    .then(pokemon => {
      allPoke.forEach(pokemon => {
        let option = new Option(pokemon.name)
        console.log(option)
        dropDown1.add(option)
        dropDown2.add(option)
      });

  });
    
}

const getPokemonAgain = () => {
  twoPokemon = []
  let stats1 = document.getElementById("stats1")
  let stats2 = document.getElementById("stats2")
  twoPokemon.push(allPoke[randomPokeGen()])
  twoPokemon.push(allPoke[randomPokeGen()])
  getPokemonDetails()
  stats1.innerHTML = ""
  stats2.innerHTML = ""
    
}


const getPokemonDetails = () => {
  for (let i = 0; i < twoPokemon.length; i++) {
    fetch(twoPokemon[i].url)
    .then(res => {
      if(!res.ok) {
        throw Error(res.statusText)
      } return res.json()
    })
    
    .then(pokemon => twoPokemon[i] = pokemon)
    .then(pokemon => getTypeDetails(pokemon, i))
    .then(pokemon => poke1.src = twoPokemon[0].sprites.front_default)
    .then(pokemon => poke2.src = twoPokemon[1].sprites.front_default)
    .then(pokemon => displayStats(twoPokemon[0], 1))
    .then(pokemon => displayStats(twoPokemon[1], 2))
    .catch(err => console.log(`Error,  ${err}`))
    

  }
  
}

const displayStats = (pokemon, id) => {
  const stats = document.getElementById(`stats${id}`)
  for (let i = 0; i < pokemon.stats.length; i++) {
    const li = document.createElement('li')
    const text = document.createTextNode(`${pokemon.stats[i].stat.name}:  ${pokemon.stats[i].base_stat}`)
    li.appendChild(text)
    stats.append(li)
  }
}


const getTypeDetails = (pokemon, index) => {
  if (!twoPokemon[0].sprites.front_default || !twoPokemon[1].sprites.front_default) {
    getPokemon()
  }
  let pokeA = pokemon.types
  for (let i = 0; i < pokeA.length; i++) {
    fetch(pokeA[i].type.url)
    .then(res => {
      if(!res.ok) {
        throw Error(res.statusText)
      } return res.json()
    })
    .then(types => pokeA = types)
    .then(types => twoPokemonTypes[index] = types)
    .catch(err => console.log(`Error,  ${err}`))

  }
  

}

const logFetch = () => {
  // console.log(twoPokemon)
  console.log(allPoke)
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
    poke2.src = "https://i.gifer.com/YQDj.gif"
    setTimeout(
      function(){ 
        poke2.src="";
      }, 2000);
  } else if (aPower < bPower) {
    poke1.src = "https://i.gifer.com/YQDj.gif"
    setTimeout(
      function(){ 
        poke1.src="";
      }, 2000);
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
    poke2.src = "https://i.gifer.com/YQDj.gif"
  } else if (aPower < bPower) {
    poke1.src = "https://i.gifer.com/YQDj.gif"
    console.log(twoPokemon[1].name + " is stronger than " + twoPokemon[0].name)
  } else {
    console.log(twoPokemon[0].name + " is just as strong as " + twoPokemon[0].name)
  }
}
