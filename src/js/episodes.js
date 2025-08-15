import { default as renderEpisodes } from "./episodes/render-Episodes";
import { default as getEpisodes } from "./api/episodes-api";

let page = 1

getEpisodes(page).then((data) => {
    document.querySelector(".filter__list").innerHTML = renderEpisodes(data.results);

    document.querySelector(".filter__list").addEventListener("click", (e) => {
        if (e.target.closest(".episode__button")) {
            document.querySelector(".backdrop").classList.remove("hidden");
            const episode = e.target.closest(".episode");
            const episodeId = Number(episode.dataset.id) - 1;
            const episodeData = data.results[episodeId];
            document.querySelector(".modal__title").textContent = episodeData.name;
            document.querySelector(".modal__id-text").textContent = episodeData.id;
            document.querySelector(".modal__airDate-text").textContent = episodeData.air_date;
            document.querySelector(".modal__characters-img").src = episodeData.image;
            document.querySelector(".modal__name").textContent = episodeData.characters;
        }
    });

    const closeButton = document.querySelector(".modal__close");
    if (closeButton) {
        closeButton.addEventListener("click", () => {
            document.querySelector(".backdrop").classList.add("hidden");
        });
    } else {
        console.error("Modal close button not found in DOM!");
    }
});
