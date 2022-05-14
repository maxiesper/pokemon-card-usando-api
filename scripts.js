document.addEventListener('DOMContentLoaded', () =>{
  const random =  getRandomInt(1, 151)
    fetchData(random)
})

const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};


//funcion async que espere cuando nos traiga la informacion y nosotros la pintamos
//comunicacion entre nuestro pryecto y el servidor web
const fetchData = async (id) => {
  try { //peticiones en fetch
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const data = await res.json();
    const pokemon = {
        img: data.sprites.other.dream_world.front_default,
        nombre: data.name,
        hp : data.stats[0].base_stat,
        experiencia: data.base_experience,
        ataque:data.stats[1].base_stat,
        defensa:data.stats[2].base_stat,
        especial:data.stats[3].base_stat
    }
    
    pintarCard(pokemon)
  } catch (error) {
    console.log(error);
  }
};

const pintarCard = (pokemon) => {
console.log(pokemon)
//a continuacion elementos principáles para manipular la plantilla
const flex= document.querySelector('.flex')

//capturamos el template
const template = document.querySelector('#template-card').content //content es fundamental

//clon para evitar errores a la hora de usar el fragment
const clone= template.cloneNode(true)

//algo invisible que se genera solo js, manipulamos el DOM lo que se genera dinamicamente. es super efectivo porque evita el reflow. es una buena practica
const fragment = document.createDocumentFragment()

clone.querySelector('.card-body-img').setAttribute('src', pokemon.img)
clone.querySelector('.card-body-title').innerHTML = `${pokemon.nombre}
<span>${pokemon.hp}</span>`
clone.querySelector('.card-body-text').textContent = pokemon.experiencia + ' Exp'
clone.querySelectorAll('.card-footer-social h3')[0].textContent = pokemon.ataque
clone.querySelectorAll('.card-footer-social h3')[1].textContent = pokemon.defensa 
clone.querySelectorAll('.card-footer-social h3')[2].textContent = pokemon.especial 


fragment.appendChild(clone)
flex.appendChild(fragment)

}

