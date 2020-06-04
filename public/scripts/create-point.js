
function brasilUFs() {
    const ufSelect = document.querySelector("select[name=uf]");

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados").then((res)=>{
        return res.json()
    }).then( states => {

        for( const state of states){
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`;
        }
    })
}

brasilUFs();

function getCites(event){
    const citySelect = document.querySelector("[name=city]");
    const stateInput = document.querySelector("[name=state]");

    const idUf = event.target.value;

    const indexOfSelectedState = event.target.selectedIndex;
    stateInput.value = event.target.options[indexOfSelectedState].text;

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${idUf}/municipios`;
    
    citySelect.innerHTML = "<option value>Selecione a Cidade</option>";
    citySelect.disabled = true;

    fetch(url).then((res)=>{
        return res.json()
    }).then( cities => {
        for( const city of cities){
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`;
        }
        citySelect.disabled = false;
    })
    

}

document.querySelector("select[name=uf]").addEventListener("change", getCites);

    //itens de coleta
const itensToCollect = document.querySelectorAll(".itens-grid li");

const colectedItens = document.querySelector("input[name=itens]");

let selectedItens = [];

function handleSelectedItem(event){
    const itemLi = event.target;

    itemLi.classList.toggle("selected"); //adicionando ou removendo uma classe com javascript
    const itemId = itemLi.dataset.id;

    const alreadySelected = selectedItens.findIndex((item) => {
        const itemFound = item === itemId
        return itemFound
    })

    if(alreadySelected != -1){ //verificando se o array esta vazio
        const filteredItens = selectedItens.filter((item)=>{
            const itemIsDifferent = item != itemId;
            return itemIsDifferent;
        })

        selectedItens = filteredItens;

    }else{
        selectedItens.push(itemId);//adiciona um item se ele nao estiver no array
    }
    colectedItens.value = selectedItens; //adiciona os itens ao input
}

for(const item of itensToCollect){
    item.addEventListener("click", handleSelectedItem)
}
