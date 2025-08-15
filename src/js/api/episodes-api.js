export default async function getCharacters (page) {
  try {
    return await fetch(`https://rickandmortyapi.com/api/episode?page=${page}`)
    .then((res) => res.json())
  } catch (error) {
    console.log(error)
  }
};