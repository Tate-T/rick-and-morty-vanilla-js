export default async function getCharacterById(id) {
  try {
    return await fetch(`https://rickandmortyapi.com/api/character?id=${id}`)
    .then((res) => res.json());
  } catch (error) {
    console.error('Error fetching character:', error);
  }
};

