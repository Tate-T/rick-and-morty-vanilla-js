import { default as renderCharacters } from "./characters/render"
import { default as getCharacters } from "./api/characters-api"

getCharacters().then(
    (data) =>{
        document.querySelector(".filter__list").innerHTML = renderCharacters(data.results);
        console.log(data.results)
    }
  );