export default async function getCharacter(name) {
  try {
    const res = await fetch(`https://rickandmortyapi.com/api/character?name=${name}`);
    const data = await res.json();
    return data.results ? data.results[0] : null;
  } catch (error) {
    console.error('Error fetching character:', error);
    return null;
  }
};