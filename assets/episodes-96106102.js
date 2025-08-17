import"./modulepreload-polyfill-3cfb730f.js";function a(o){return o.map(e=>`
    <li class="episode" data-id='${e.id}'>
    <div class="episode__div">
        <h2 class="episode__name">${e.name}</h2>
        <div class="episode__dive">
           <p class="episode__text1">Season: <br> <span class="episode__season">${e.episode}</span></p>
           <p class="episode__text2">Air date: <br> <span class="episode__airDate">${e.air_date}</span></p>
        </div>
        <button type="button" class="episode__button"></button>
    </div>
    </li>
    `).join("")}async function u(o){try{return await fetch(`https://rickandmortyapi.com/api/episode?page=${o}`).then(s=>s.json())}catch(s){console.log(s)}}let d=1,i=[];u(d).then(o=>{document.querySelector(".filter__list").innerHTML=a(o.results),console.log(o.results),i=[...i,...o.results],document.querySelector(".filter__list").addEventListener("click",e=>{if(e.target.closest(".episode__button")){document.querySelector(".backdrop").classList.remove("hidden");const l=e.target.closest(".episode"),r=Number(l.dataset.id)-1,n=i[r];document.querySelector(".modal__title").textContent=n.name,console.log(),document.querySelector(".modal__airDate-text").textContent=n.air_date,console.log(n.air_date),document.querySelector(".modal__id-text").textContent=n.id;for(let c=0;c<4;c++)fetch(n.characters[c]).then(t=>t.json()).then(t=>{document.querySelector(`#character${c+1}`).textContent=t.name,document.querySelector(`#image${c+1}`).src=t.image})}}),document.querySelector("#button-search-episodes").addEventListener("click",()=>{const e=document.querySelector("#input-search-episodes").value.toLowerCase(),l=document.querySelectorAll(".episode");let r=!1;const n=document.querySelector(".filter__list"),c=n.querySelector(".not-found");if(c&&c.remove(),n.querySelectorAll(".not-found").forEach(t=>t.remove()),l.forEach(t=>{t.querySelector(".episode__name").textContent.toLowerCase().includes(e)?(t.style.display="block",r=!0):t.style.display="none"}),!r){const t=document.createElement("div");t.classList.add("not-found"),t.innerHTML=`
                <picture class="not-found__img">
                <source
                    srcset="./img/component-images/desktop/not-found-PC.webp 1x,
                            ./img/component-images/desktop/not-found-PC-2x.webp 2x"
                    media="(min-width: 1360px)" />
                <source
                    srcset="./img/component-images/tablet/not-found-Tablet.webp 1x,
                            ./img/component-images/tablet/not-found-Tablet-2x.webp 2x"
                    media="(min-width: 768px)" />
                <source
                    srcset="./img/component-images/mobile/not-found-Mobile.webp 1x,
                            ./img/component-images/mobile/not-found-Mobile-2x.webp 2x"
                    media="(min-width: 320px)" />
                <img class="hero__image" src="./img/component-images/desktop/not-found-PC.webp" alt="not found image" />
            </picture>
            <p class='not-found__text'>Oops! Try looking for something else...</p>
        `,n.appendChild(t)}}),document.querySelector(".filter__select").addEventListener("change",e=>{const l=e.target.value.charAt(0),r=e.target.value;document.querySelector(".filter__input").value="",console.log(l),i.forEach((n,c)=>{n.episode.charAt(2)===l?document.querySelectorAll(".episode")[c].style.display="block":document.querySelectorAll(".episode")[c].style.display="none",r==="All seasons"&&document.querySelectorAll(".episode").forEach(t=>{t.style.display="block"})})});const s=document.querySelector(".modal__close");s&&s.addEventListener("click",()=>{document.querySelector(".backdrop").classList.add("hidden")})});document.querySelector(".filter__input").addEventListener("input",o=>{const s=o.target.value.toLowerCase();document.querySelectorAll(".episode").forEach(e=>{e.querySelector(".episode__name").textContent.toLowerCase().includes(s)?e.style.display="block":e.style.display="none"})});document.querySelector(".filter__load").addEventListener("click",()=>{d++,u(d).then(o=>{const s=document.querySelector(".filter__list .not-found");s&&s.remove(),i=[...i,...o.results],document.querySelector(".filter__list").insertAdjacentHTML("beforeend",a(o.results))})});
