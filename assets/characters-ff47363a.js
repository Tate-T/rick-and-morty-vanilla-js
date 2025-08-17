import"./modulepreload-polyfill-3cfb730f.js";function r(a){return a.map(c=>`
    <li class="character">
        <img class="character__image" src="${c.image}" alt="photo of character"/>
        <h2 class="character__name">${c.name}</h2>
        <p class="character__text1">Origin: <span class="character__origin">${c.origin.name}</span></p>
        <p class="character__text2">Location: <span class="character__location">${c.location.name}</span></p>
    </li>
    `).join("")}async function e(){try{return await fetch("https://rickandmortyapi.com/api/character").then(a=>a.json())}catch(a){console.log(a)}}e().then(a=>{document.querySelector(".filter__list").innerHTML=r(a.results),console.log(a.results)});
