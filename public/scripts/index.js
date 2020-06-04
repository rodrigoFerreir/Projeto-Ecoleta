
const buttonSeach = document.querySelector("#page-home main #search");
const modal = document.querySelector("#modal");
const buttonClose = document.querySelector("#modal .header a");

buttonSeach.addEventListener("click", ()=>{
    modal.classList.remove("hide")
})

buttonClose.addEventListener("click", ()=> {
    modal.classList.add("hide")
})