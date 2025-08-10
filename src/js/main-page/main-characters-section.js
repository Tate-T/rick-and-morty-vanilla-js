export function initMainCharacters() {
  const img = document.getElementById('character-img');
  const characters = document.querySelectorAll('.main-characters__character');

  function loadCharacterImage(name) {
    fetch(`https://rickandmortyapi.com/api/character/?name=${name}`)
      .then(res => res.json())
      .then(data => {
        if (data.results && data.results[0]) {
          img.src = data.results[0].image;
          img.alt = name;
        }
      })
      .catch(err => console.error('Error loading character image:', err));
  }

  loadCharacterImage('Rick Sanchez');

  characters.forEach(char => {
    char.addEventListener('click', () => {
      const name = char.getAttribute('data-name');
      loadCharacterImage(name);
    });
  });
}
