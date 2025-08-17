import"./modulepreload-polyfill-3cfb730f.js";function c(o){return o.map(t=>`
    <li class="episode" data-id='${t.id}'>
    <div class="episode__div">
        <h2 class="episode__name">${t.name}</h2>
        <div class="episode__dive">
           <p class="episode__text1">Season: <br> <span class="episode__season">${t.episode}</span></p>
           <p class="episode__text2">Air date: <br> <span class="episode__airDate">${t.air_date}</span></p>
        </div>
        <button type="button" class="episode__button"></button>
    </div>
    </li>
    `).join("")}async function r(o){try{return await fetch(`https://rickandmortyapi.com/api/episode?page=${o}`).then(e=>e.json())}catch(e){console.log(e)}}let d=1;r(d).then(o=>{document.querySelector(".filter__list").innerHTML=c(o.results),document.querySelector(".filter__list").addEventListener("click",t=>{if(t.target.closest(".episode__button")){document.querySelector(".backdrop").classList.remove("hidden");const n=t.target.closest(".episode"),a=Number(n.dataset.id)-1,s=o.results[a];document.querySelector(".modal__title").textContent=s.name,document.querySelector(".modal__id-text").textContent=s.id,document.querySelector(".modal__airDate-text").textContent=s.air_date,document.querySelector(".modal__characters-img").src=s.image,document.querySelector(".modal__name").textContent=s.characters}});const e=document.querySelector(".modal__close");e?e.addEventListener("click",()=>{document.querySelector(".backdrop").classList.add("hidden")}):console.error("Modal close button not found in DOM!")});
