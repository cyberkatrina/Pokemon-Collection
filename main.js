let max = 400
let min = 0
let twoPokemon = []
let twoPokemonTypes = []
let strengthBonus = 1.5
let dropDown1 = document.getElementById('choice1');
let dropDown2 = document.getElementById('choice2');
let allPoke = []
let explosionGif = "https://media.tenor.com/P6RWJwQW_YsAAAAi/explosion-gif.gif"
let skullImg = "./pixel-skull.png"
let result = document.getElementById("result")
let name1 = document.getElementById("name1")
let name2 = document.getElementById("name2")
let type1 = document.getElementById("type1")
let type2 = document.getElementById("type2")
let stats1 = document.getElementById("stats1")
let stats2 = document.getElementById("stats2")
let totalElementOne = document.getElementById("total-one")
let totalElementTwo = document.getElementById("total-two")
let timeouts = []



window.onload = function() {
  getPokemon()
}

const randomPokeGen = () => {
  let randomPokeNum = Math.floor(Math.random() * max);
  return randomPokeNum
}

const getPokemon = () => {
  allPoke = []
  fetch(`https://pokeapi.co/api/v2/pokemon?&limit=400`)
    .then(res => {
      if(!res.ok) {
        throw Error(res.statusText)
      } return res.json()
    })
    .then(pokemon => allPoke = pokemon.results)
    .then(pokemon => twoPokemon.push(allPoke[randomPokeGen()]))
    .then(pokemon => twoPokemon.push(allPoke[randomPokeGen()])) 
    .then(pokemon => {
      name1.innerHTML = twoPokemon[0].name
      name2.innerHTML = twoPokemon[1].name
      console.log(twoPokemon[0])
    })
    .then(pokemon => dropDown1.appendChild(new Option(twoPokemon[0].name, JSON.stringify(twoPokemon[0]))))
    .then(pokemon => dropDown2.appendChild(new Option(twoPokemon[1].name, JSON.stringify(twoPokemon[1]))))
    .then(pokemon => getPokemonDetails())
    .catch(err => console.log(`Error,  ${err}`))
    .then(pokemon => {
      allPoke.forEach(pokemon => {
        //converts the pokemon obj into a string so it can be stored in the html as the .value
        let option1 = new Option(pokemon.name, JSON.stringify(pokemon)) 
        let option2 = new Option(pokemon.name, JSON.stringify(pokemon))
        dropDown1.appendChild(option1)
        dropDown2.appendChild(option2)
      });
  }); 
}

const getPokemonDetails = () => {
  console.log(twoPokemon)
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
    .then(pokemon => {
      type1.innerHTML = ""
      type2.innerHTML = ""
      for (let i = 0; i < twoPokemon[0].types.length; i++) {
        const li = document.createElement('li')
        const text = document.createTextNode(`${twoPokemon[0].types[i].type.name}`)
        li.appendChild(text)
        type1.append(li)
      }
      for (let i = 0; i < twoPokemon[1].types.length; i++) {
        const li = document.createElement('li')
        const text = document.createTextNode(`${twoPokemon[1].types[i].type.name}`)
        li.appendChild(text)
        type2.append(li)
      }
    })
    .catch(err => console.log(`Error,  ${err}`))
  }
}

const getTypeDetails = (pokemon, index) => {
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

const randomizeIndividual = (button) => {
  twoPokemon[button.name] = allPoke[randomPokeGen()]
  name1.innerHTML = twoPokemon[0].name
  name2.innerHTML = twoPokemon[1].name
  getPokemonDetails()
  if (button.name == 0) {
    for (let i = 0; i < dropDown1.options.length; i++){
      if (JSON.parse(dropDown1.options[i].value).name == twoPokemon[0].name){
          dropDown1.options[i].selected = true;
          break;
      }
    } 
  } else {
    for (let i = 0; i < dropDown2.options.length; i++){
      if (JSON.parse(dropDown2.options[i].value).name == twoPokemon[1].name){
          dropDown2.options[i].selected = true;
          break;
      }
    }
  }
}

const changeValue = () => { 
  console.log("changing value")
  console.log(JSON.parse(dropDown1.value))
  twoPokemon[0] = JSON.parse(dropDown1.value)
  twoPokemon[1] = JSON.parse(dropDown2.value)
  console.log(twoPokemon[0].url)
  name1.innerHTML = twoPokemon[0].name
  name2.innerHTML = twoPokemon[1].name
  getPokemonDetails()
  document.getElementById("result").innerHTML = 'Which Pokemon is stronger?'
  totalElementOne.innerHTML = "Total = ???"
  totalElementTwo.innerHTML = "Total = ???"
}

const getPokemonAgain = () => {
  twoPokemon = []
  twoPokemon.push(allPoke[randomPokeGen()])
  twoPokemon.push(allPoke[randomPokeGen()])
  getPokemonDetails()
  stats1.innerHTML = ""
  stats2.innerHTML = ""
  type1.innerHTML = ""
  type2.innerHTML = ""
  totalElementOne.innerHTML = "Total = ???"
  totalElementTwo.innerHTML = "Total = ???"
  dropDown1.value = JSON.stringify(twoPokemon[0])
  dropDown2.value = JSON.stringify(twoPokemon[1])
  name1.innerHTML = twoPokemon[0].name
  name2.innerHTML = twoPokemon[1].name
  document.getElementById("result").innerHTML = 'Which Pokemon is stronger?'
}

const displayStats = (pokemon, id) => {
  const stats = document.getElementById(`stats${id}`)
  stats.innerHTML = ''
  for (let i = 0; i < pokemon.stats.length; i++) {
    const li = document.createElement('li')
    const text = document.createTextNode(`${pokemon.stats[i].stat.name}:  ${pokemon.stats[i].base_stat}`)
    li.appendChild(text)
    stats.append(li)
  }
}

const logFetch = () => {
  console.log(twoPokemon)
  console.log(allPoke)
}

const compareTwoBasic = () => {
  poke1.src = twoPokemon[0].sprites.front_default
  poke2.src = twoPokemon[1].sprites.front_default

  aPower = 0
  bPower = 0
  let capilalizedNameOne = twoPokemon[0].name.charAt(0).toUpperCase() + twoPokemon[0].name.slice(1)
  let capilalizedNameTwo = twoPokemon[1].name.charAt(0).toUpperCase() + twoPokemon[1].name.slice(1)


  for (let i = 0; i < twoPokemon[0].stats.length; i++) {
    aPower += twoPokemon[0].stats[i].base_stat
  }
  for (let i = 0; i < twoPokemon[1].stats.length; i++) {
    bPower += twoPokemon[1].stats[i].base_stat
  }
  // console.log(aPower + " vs " + bPower)
  if (aPower > bPower) {
    result.innerHTML = capilalizedNameOne + " is stronger than " + capilalizedNameTwo + "."
    poke2.src = explosionGif
    setTimeout(
      function(){ 
        poke2.src = skullImg;
      }, 1200);
  } else if (aPower < bPower) {
    poke1.src = explosionGif
    setTimeout(
      function(){ 
        poke1.src = skullImg;
      }, 1200);
    result.innerHTML = capilalizedNameTwo + " is stronger than " + capilalizedNameOne + "."
    
  } else {
    result.innerHTML = capilalizedNameOne + " is just as strong as " + capilalizedNameTwo + "."
  }
  totalElementOne.innerHTML = "Total = " + aPower
  totalElementTwo.innerHTML = "Total = " + bPower
}

const compareTwoAdvanced = () => { 
  poke1.src = twoPokemon[0].sprites.front_default
  poke2.src = twoPokemon[1].sprites.front_default

  let capilalizedNameOne = twoPokemon[0].name.charAt(0).toUpperCase() + twoPokemon[0].name.slice(1)
  let capilalizedNameTwo = twoPokemon[1].name.charAt(0).toUpperCase() + twoPokemon[1].name.slice(1)
  // console.log(twoPokemonTypes)
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
  let aBasePower = aPower
  let bBasePower = bPower

  // console.log(twoPokemon)
  for (let i = 0; i < pokeAStrength.length; i++) {
    for (let j = 0; j < twoPokemon[1].types.length; j++) {
      if (pokeAStrength[i].name === twoPokemon[1].types[j].type.name) {
        aPower = aPower * strengthBonus
        result.innerHTML = twoPokemon[0].name + " is strong against " + twoPokemon[1].types[j].type.name
      }
    }
  }
  for (let i = 0; i < pokeAWeakness.length; i++) {
    for (let j = 0; j < twoPokemon[1].types.length; j++) {
      if (pokeAWeakness[i].name === twoPokemon[1].types[j].type.name) {
        aPower = aPower / strengthBonus
        result.innerHTML = twoPokemon[0].name + " is weak against " + twoPokemon[1].types[j].type.name
      }
    }
  }
  for (let i = 0; i < pokeBStrength.length; i++) {
    for (let j = 0; j < twoPokemon[0].types.length; j++) {
      if (pokeBStrength[i].name === twoPokemon[0].types[j].type.name) {
        bPower = bPower * strengthBonus
        result.innerHTML = twoPokemon[1].name + " is strong against " + twoPokemon[0].types[j].type.name
      }
    }
  }
  for (let i = 0; i < pokeBWeakness.length; i++) {
    for (let j = 0; j < twoPokemon[0].types.length; j++) {
      if (pokeBWeakness[i].name === twoPokemon[0].types[j].type.name) {
        bPower = bPower / strengthBonus
        result.innerHTML = twoPokemon[1].name + " is weak against " + twoPokemon[0].types[j].type.name
      }
    }
  }
  console.log(aPower + " vs " + bPower)
  if (aPower > bPower) {
    result.innerHTML = capilalizedNameOne + " is stronger than " + capilalizedNameTwo + "."
    poke2.src = explosionGif
    setTimeout(
      function(){ 
        poke2.src = skullImg;
      }, 1200);
  } else if (aPower < bPower) {
    result.innerHTML = capilalizedNameTwo + " is stronger than " + capilalizedNameOne + "."
    poke1.src = explosionGif
    setTimeout(
      function(){ 
        poke1.src = skullImg;
      }, 1200);
  } else {
    result.innerHTML = capilalizedNameOne + " is just as strong as " + capilalizedNameTwo + "."
  }
  totalElementOne.innerHTML = "Total = " + aBasePower + " => " + Math.trunc(aPower)
  totalElementTwo.innerHTML = "Total = " + bBasePower + " => " + Math.trunc(bPower)
}
