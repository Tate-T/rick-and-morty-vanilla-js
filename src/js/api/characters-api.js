export default async function getCharacters (page) {
  try {
    return await fetch(`https://rickandmortyapi.com/api/character?page=${page}`)
    .then((res) => res.json())
  } catch (error) {
    console.log(error)
  }
};