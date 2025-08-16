import"./modulepreload-polyfill-3cfb730f.js";function i(e){return e.map(o=>`
    <li class="episode" data-id='${o.id}'>
    <div class="episode__div">
        <h2 class="episode__name">${o.name}</h2>
        <div class="episode__dive">
           <p class="episode__text1">Season: <br> <span class="episode__season">${o.episode}</span></p>
           <p class="episode__text2">Air date: <br> <span class="episode__airDate">${o.air_date}</span></p>
        </div>
        <button type="button" class="episode__button"></button>
    </div>
    </li>
    `).join("")}async function d(e){try{return await fetch(`https://rickandmortyapi.com/api/episode?page=${e}`).then(t=>t.json())}catch(t){console.log(t)}}let l=1;d(l).then(e=>{document.querySelector(".filter__list").innerHTML=i(e.results),console.log(e.results),document.querySelector(".filter__list").addEventListener("click",o=>{if(o.target.closest(".episode__button")){document.querySelector(".backdrop").classList.remove("hidden");const r=o.target.closest(".episode"),a=Number(r.dataset.id)-1,n=e.results[a];console.log(),document.querySelector(".modal__airDate-text").textContent=n.air_date,console.log(n.air_date),document.querySelector(".modal__id-text").textContent=n.id;for(let s=0;s<4;s++)fetch(n.characters[s]).then(c=>c.json()).then(c=>{document.querySelector(`#character${s+1}`).textContent=c.name,document.querySelector(`#image${s+1}`).src=c.image})}});const t=document.querySelector(".modal__close");t?t.addEventListener("click",()=>{document.querySelector(".backdrop").classList.add("hidden")}):console.error("Modal close button not found in DOM!")});
