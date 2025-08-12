export default function renderCharacters(characters) {
    const objectChange = characters
    .map((object) => {
    const newObject = `
    <li class="character">
        <img class="character__image" src="${object.image}" alt="photo of character"/>
        <h2 class="character__name">${object.name}</h2>
        <p class="character__text1">Origin: <span class="character__origin">${object.origin}</span></p>
        <p class="character__text2">Location: <span class="character__location">${object.location}</span></p>
    </li>
    `;
    return newObject;
    })

    .join("");
    return objectChange;
}