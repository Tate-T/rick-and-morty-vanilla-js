import { default as renderEpisodes } from "./episodes/render-Episodes";
import { default as getEpisodes } from "./api/episodes-api";

let page = 1
let allEpisode = []


getEpisodes(page).then((data) => {
    document.querySelector(".filter__list").innerHTML = renderEpisodes(data.results);
    console.log(data.results)
    allEpisode = [...allEpisode, ...data.results]

    document.querySelector(".filter__list").addEventListener("click", (e) => {
        if (e.target.closest(".episode__button")) {
            document.querySelector(".backdrop").classList.remove("hidden");
            const episode = e.target.closest(".episode");
            const episodeId = Number(episode.dataset.id) - 1;
            const episodeData = allEpisode[episodeId];
            document.querySelector(".modal__title").textContent = episodeData.name
            console.log()
            document.querySelector(".modal__airDate-text").textContent = episodeData.air_date;
            console.log(episodeData.air_date)
            document.querySelector(".modal__id-text").textContent = episodeData.id;


            for (let i = 0; i < 4; i++) {
                fetch(episodeData.characters[i])
                    .then(res => res.json())
                    .then(characterData => {
                        document.querySelector(`#character${i + 1}`).textContent = characterData.name;
                        document.querySelector(`#image${i + 1}`).src = characterData.image;
                    });
            }
        }
    });

    document.querySelector('#button-search-episodes').addEventListener('click', () => {
            const searchName = document.querySelector('#input-search-episodes').value.toLowerCase();
            const cards = document.querySelectorAll('.episode');
            let found = false;
            document.querySelector('.not-found').style.display = 'none';

            cards.forEach(card => {
                const characterName = card.querySelector('.episode__name').textContent.toLowerCase();

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
    document.querySelector('#input-search-episodes').value = ''
        });

    document.querySelector(".filter__select").addEventListener("change", (e) => {
        const searchSeason = e.target.value.charAt(0);
        const searchAllSeasons = e.target.value
        document.querySelector(".filter__input").value = ""
        console.log(searchSeason)
        allEpisode.forEach((card, index) => {
            if(card.episode.charAt(2) === searchSeason) {
                document.querySelectorAll(".episode")[index].style.display = "block";
            } else {
                document.querySelectorAll(".episode")[index].style.display = "none";
            }

            if (searchAllSeasons === 'All seasons') {
                document.querySelectorAll('.episode').forEach((episode) => {
                    episode.style.display = 'block'
                })
            }
        })
    })

    const closeButton = document.querySelector(".modal__close");
    if (closeButton) {
        closeButton.addEventListener("click", () => {
            document.querySelector(".backdrop").classList.add("hidden");
        });
    }
});

document.querySelector(".filter__input").addEventListener("input", (e) => {
    const searchEpisode = e.target.value.toLowerCase();
    document.querySelectorAll('.episode').forEach(card => {
    const episodeName = card.querySelector('.episode__name').textContent.toLowerCase();
    if (episodeName.includes(searchEpisode)) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });
});

document.querySelector(".filter__load").addEventListener("click", () => {
    page++
    getEpisodes(page).then((data) => {
        document.querySelector('.not-found').style.display = 'none' 
        allEpisode = [...allEpisode, ...data.results]
        document.querySelector(".filter__list").insertAdjacentHTML("beforeend", renderEpisodes(data.results));
    });
})
