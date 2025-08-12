export default async function getCharacters () {
  try {
    return await fetch("https://rickandmortyapi.com/api/character")
    .then((res) => res.json())
  } catch (error) {
    console.log(error)
  }
};