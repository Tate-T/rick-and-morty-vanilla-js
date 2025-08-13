import { default as renderCharacters } from "./characters/render"
import { default as getCharacters } from "./api/characters-api"

let page = 1



getCharacters(page).then(
    (data) =>{
        document.querySelector(".filter__list").innerHTML = renderCharacters(data.results);
        console.log(data.results)
        console.log(data)

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


document.querySelector('.filter__list').addEventListener('click', (e) => {
  if (e.target.closest('.character__button')) {
    document.querySelector('.backdrop').classList.remove('hidden');;
  }
});


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



