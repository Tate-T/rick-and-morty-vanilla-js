import { default as renderCharacters } from "./characters/render"
import { default as getCharacters } from "./api/characters-api"
import { default as getCharacter } from "./api/getOneCharacter";
import notFoundPC from '../img/component-images/desktop/not-found-PC.webp';
import notFoundPC2x from '../img/component-images/desktop/not-found-PC-2x.webp';

console.log(notFoundPC)
console.log(notFoundPC2x)

let page = 1

let allCharacters = []



getCharacters(page).then(
    (data) =>{
        let characterData;
        let characterEpisode;
        let maxEpisodesToShow;
        let episodesToShow;
        document.querySelector(".filter__list").innerHTML = renderCharacters(data.results);
        console.log(data.results)
        console.log(data)
        allCharacters = [...allCharacters, ...data.results]


        document.querySelector('.filter__list').addEventListener('click', (e) => {
            if (e.target.closest('.character__button')) {
                document.querySelector('.backdrop').classList.remove('hidden');;
                const character = e.target.closest('.character')
                const characterId = Number(character.dataset.id) - 1;
                characterData = allCharacters[characterId];
                document.querySelector('.modal__img').src = characterData.image
                document.querySelector('#status').innerHTML = characterData.status
                document.querySelector('#species').innerHTML = characterData.species
                document.querySelector('#gender').innerHTML = characterData.gender
                document.querySelector('#origin').innerHTML = characterData.origin.name
                document.querySelector('#location').innerHTML = characterData.location.name
                document.querySelector('#episodes').innerHTML = characterData.episode.length

                maxEpisodesToShow = 5;
                if (window.innerWidth < 768) {
                    episodesToShow = 1;
                } else if (window.innerWidth > 768) { 
                    episodesToShow = Math.min(characterData.episode.length, maxEpisodesToShow)
                } 
                
                
                console.log(episodesToShow)
                if (episodesToShow === 1){
                    document.querySelector(`#item2`).style.display = 'none'
                    document.querySelector(`#item3`).style.display = 'none'
                    document.querySelector(`#item4`).style.display = 'none'
                    document.querySelector(`#item5`).style.display = 'none'
                } else if (episodesToShow === 2) {
                    document.querySelector(`#item3`).style.display = 'none'
                    document.querySelector(`#item4`).style.display = 'none'
                    document.querySelector(`#item5`).style.display = 'none'
                } else if (episodesToShow === 3) {
                    document.querySelector(`#item4`).style.display = 'none'
                    document.querySelector(`#item5`).style.display = 'none'
                } else if (episodesToShow === 4) {
                    document.querySelector(`#item5`).style.display = 'none'
                }
                for (let i = 0; i < episodesToShow; i++) {
                    document.querySelector(`#item${i + 1}`).style.display = 'flex';
                    fetch(characterData.episode[i])
                    .then(res => res.json())
                    .then(episodeData => {
                    characterEpisode = 0

                    document.querySelector(`#title${i + 1}`).textContent = episodeData.name;
                    document.querySelector(`#season${i + 1}`).textContent = episodeData.episode;
                    document.querySelector(`#airdate${i + 1}`).textContent = episodeData.air_date;
            });
        }}
        });

        document.querySelector('#button-search-characters').addEventListener('click', () => {
            const searchName = document.querySelector('#input-search-characters').value.toLowerCase();
            const cards = document.querySelectorAll('.character');
            let found = false;

            document.querySelector('.not-found').style.display = 'none'

            cards.forEach(card => {
                const characterName = card.querySelector('.character__name').textContent.toLowerCase();

                if (characterName.includes(searchName)) {
                    card.style.display = 'block';
                    found = true;
                } else {
                    card.style.display = 'none';
                }
            });

            


            if (!found) {
                document.querySelector('.not-found').style.display = 'flex'
             }
        document.querySelector('#input-search-characters').value = ''
        });



        document.querySelector('#next-episode').addEventListener('click', () => {
            console.log(characterData)
            console.log(characterEpisode)
            characterEpisode = (characterEpisode + 1) % characterData.episode.length;

            fetch(characterData.episode[characterEpisode])
                .then(res => res.json())
                .then(episodeData => {
                document.querySelector('#title1').textContent = episodeData.name;
                document.querySelector('#season1').textContent = episodeData.episode;
                document.querySelector('#airdate1').textContent = episodeData.air_date;
        });
            

        })

        document.querySelector('.filter__select1').addEventListener('change', (e) => {
            const searchStatus = e.target.value.toLowerCase();
            document.querySelector('.filter__select2').value = 'All'
            document.querySelector('.filter__select2').value = 'All'
            document.querySelector('.filter__select4').value = 'All'
            document.querySelector('.filter__input').value = ''
            allCharacters.forEach((card, index) => {
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
            allCharacters.forEach((card, index) => {
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
            allCharacters.forEach((card, index) => {
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
            allCharacters.forEach((card, index) => {
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
                    document.querySelector('.not-found').style.display = 'none'
                    allCharacters = [...allCharacters, ...data.results]
                    document.querySelector(".filter__list").insertAdjacentHTML('beforeend', renderCharacters(data.results));
                });
            })




