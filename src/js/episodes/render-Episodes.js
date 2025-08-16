export default function renderCharacters(episodes) {
    const objectChange = episodes
        .map((obj) => {
            const newObject = `
    <li class="episode" data-id='${obj.id}'>
    <div class="episode__div">
        <h2 class="episode__name">${obj.name}</h2>
        <div class="episode__dive">
           <p class="episode__text1">Season: <br> <span class="episode__season">${obj.episode}</span></p>
           <p class="episode__text2">Air date: <br> <span class="episode__airDate">${obj.air_date}</span></p>
        </div>
        <button type="button" class="episode__button"></button>
    </div>
    </li>
    `;
            return newObject;
        })

        .join("");
    return objectChange;
}