import { default as renderCharacters } from "./characters/render"
import { default as getCharacters } from "./api/characters-api"

let page = 1




getCharacters(page).then(
    (data) =>{
        document.querySelector(".filter__list").innerHTML = renderCharacters(data.results);
        console.log(data.results)
        console.log(data)

        document.querySelector('.filter__list').addEventListener('click', (e) => {
            if (e.target.closest('.character__button')) {
                document.querySelector('.backdrop').classList.remove('hidden');;
                const character = e.target.closest('.character')
                const characterId = Number(character.dataset.id) - 1;
                const characterData = data.results[characterId];
                document.querySelector('.modal__img').src = characterData.image
                document.querySelector('#status').innerHTML = characterData.status
                document.querySelector('#species').innerHTML = characterData.species
                document.querySelector('#gender').innerHTML = characterData.gender
                document.querySelector('#origin').innerHTML = characterData.origin.name
                document.querySelector('#location').innerHTML = characterData.location.name
                document.querySelector('#episodes').innerHTML = characterData.episode.length

                for (let i = 0; i <= 4; i++){
                    if (i === 0){
                        fetch(`${characterData.episode[i]}`)
                        .then(res => res.json())
                        .then(character => {
                            document.querySelector('#title1').innerHTML = character.name;
                            document.querySelector('#season1').innerHTML = character.episode;
                            document.querySelector('#airdate1').innerHTML = character.air_date;
                        });
                    } else if (i === 1){
                        fetch(`${characterData.episode[i]}`)
                        .then(res => res.json())
                        .then(character => {
                            document.querySelector('#title2').innerHTML = character.name;
                            document.querySelector('#season2').innerHTML = character.episode;
                            document.querySelector('#airdate2').innerHTML = character.air_date;
                        });
                    } else if (i === 2){
                        fetch(`${characterData.episode[i]}`)
                        .then(res => res.json())
                        .then(character => {
                            document.querySelector('#title3').innerHTML = character.name;
                            document.querySelector('#season3').innerHTML = character.episode;
                            document.querySelector('#airdate3').innerHTML = character.air_date;
                        });
                    } else if (i === 3){
                        fetch(`${characterData.episode[i]}`)
                        .then(res => res.json())
                        .then(character => {
                            document.querySelector('#title4').innerHTML = character.name;
                            document.querySelector('#season4').innerHTML = character.episode;
                            document.querySelector('#airdate4').innerHTML = character.air_date;
                        });
                    } else if (i === 4){
                        fetch(`${characterData.episode[i]}`)
                        .then(res => res.json())
                        .then(character => {
                            document.querySelector('#title5').innerHTML = character.name;
                            document.querySelector('#season5').innerHTML = character.episode;
                            document.querySelector('#airdate5').innerHTML = character.air_date;
                        });
                    }
                }


            }
        });

        document.querySelector('.filter__select1').addEventListener('change', (e) => {
            const searchStatus = e.target.value.toLowerCase();
            document.querySelector('.filter__select2').value = 'All'
            document.querySelector('.filter__select2').value = 'All'
            document.querySelector('.filter__select4').value = 'All'
            document.querySelector('.filter__input').value = ''
            data.results.forEach((card, index) => {
            if (card.status.toLowerCase() === searchStatus) {
                document.querySelectorAll('.character')[index].style.display = 'block';
            } else {
                document.querySelectorAll('.character')[index].style.display = 'none';
            }

            if (searchStatus === 'all') {
                document.querySelectorAll('.character').forEach((character) => {
                    character.style.display = 'block'
                })
            }
            });
        });

        document.querySelector('.filter__select2').addEventListener('change', (e) => {
            const searchSpecies = e.target.value.toLowerCase();
            document.querySelector('.filter__select1').value = 'All'
            document.querySelector('.filter__select3').value = 'All'
            document.querySelector('.filter__select4').value = 'All'
            data.results.forEach((card, index) => {
            if (card.species.toLowerCase() === searchSpecies) {
                document.querySelectorAll('.character')[index].style.display = 'block';
            } else {
                document.querySelectorAll('.character')[index].style.display = 'none';
            }

            if (searchSpecies === 'all') {
                document.querySelectorAll('.character').forEach((character) => {
                    character.style.display = 'block'
                })
            }
            });
        });

        document.querySelector('.filter__select3').addEventListener('change', (e) => {
            const searchType = e.target.value.toLowerCase();
            document.querySelector('.filter__select1').value = 'All'
            document.querySelector('.filter__select2').value = 'All'
            document.querySelector('.filter__select4').value = 'All'
            document.querySelector('.filter__input').value = ''
            data.results.forEach((card, index) => {
            if (card.type.toLowerCase() === searchType) {
                document.querySelectorAll('.character')[index].style.display = 'block';
            } else {
                document.querySelectorAll('.character')[index].style.display = 'none';
            }

            if (searchType === 'all') {
                document.querySelectorAll('.character').forEach((character) => {
                    character.style.display = 'block'
                })
            }
            });
        });


        document.querySelector('.filter__select4').addEventListener('change', (e) => {
            const searchGender = e.target.value.toLowerCase();
            document.querySelector('.filter__select1').value = 'All'
            document.querySelector('.filter__select2').value = 'All'
            document.querySelector('.filter__select3').value = 'All'
            document.querySelector('.filter__input').value = ''
            data.results.forEach((card, index) => {
            if (card.gender.toLowerCase() === searchGender) {
                document.querySelectorAll('.character')[index].style.display = 'block';
            } else {
                document.querySelectorAll('.character')[index].style.display = 'none';
            }

            if (searchGender === 'all') {
                document.querySelectorAll('.character').forEach((character) => {
                    character.style.display = 'block'


                })
            }


            });
        });
    }
  );



document.querySelector('.modal__close').addEventListener('click', () => {
    document.querySelector('.backdrop').classList.add('hidden');
})


document.querySelector('.filter__input').addEventListener('input', (e) => {
    const searchName = e.target.value.toLowerCase();
    document.querySelector('.filter__select1').value = 'All'
    document.querySelector('.filter__select2').value = 'All'
    document.querySelector('.filter__select3').value = 'All'
    document.querySelector('.filter__select4').value = 'All'

    document.querySelectorAll('.character').forEach(card => {
    const characterName = card.querySelector('.character__name').textContent.toLowerCase();
    if (characterName.includes(searchName)) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });
});



document.querySelector('.filter__load-more').addEventListener('click', () => {
    page++
    getCharacters(page).then((data) => {
        document.querySelector(".filter__list").insertAdjacentHTML('beforeend', renderCharacters(data.results));
    });
})

// Wait for DOM and all resources to load

