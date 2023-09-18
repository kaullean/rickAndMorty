function getIconStatusUrl(status){
    var iconStatus;
    switch(status){
        case "Alive":
            iconStatus="https://img.icons8.com/emoji/48/green-circle-emoji.png"
            break;
        case "Dead":
            iconStatus="https://img.icons8.com/emoji/48/red-circle-emoji.png"
            break;
        case "unknown":
            iconStatus="https://img.icons8.com/fluency-systems-filled/96/FFFFFF/question-mark.png"
            break;
    }
    return iconStatus
}
function getIconGenderUrl(gender){
    var iconGenero;
    switch(gender){
        case "Male":
            iconGenero= "https://img.icons8.com/fluency-systems-filled/96/FFFFFF/male.png"
            break;
        case "Female":
            iconGenero="https://img.icons8.com/fluency-systems-filled/96/FFFFFF/female.png"
            break;
        case "Genderless":
            iconGenero="https://img.icons8.com/fluency-systems-filled/96/FFFFFF/neuter.png"
            break;
        case "unknown":
            iconGenero="https://img.icons8.com/fluency-systems-filled/96/FFFFFF/question-mark.png"
            break;
    }
    return iconGenero;
}
function crearCardPersonaje(character){
    var personajeAgregado=false;
    var card = document.createElement('div');
    card.className="card cardPersonaje  m-3"
    card.id="char"+character.id
    
    card.style="width: 18rem"
    card.innerHTML=`
            <img src="${character.image}" class="card-img-top" alt="...">
            <div class="card-body d-flex flex-column text-light justify-content-around">
            <h2 class="text-center m-0">${character.name} </h2>
            <div class="cardInfo_Status d-flex flex-column text-center">
                <span style="padding-right: 1rem;">
                <img width="20vw" height="20vh" src="${getIconStatusUrl(character.status)}"/>
                ${character.status.toUpperCase()} - ${character.species.toUpperCase()} 
                
                </span>
                <span>
                <img width="20vw" height="20vh" src="${getIconGenderUrl(character.gender)}" alt="${character.gender}"/>
                ${character.gender.toUpperCase()}
                </span>
            </div>
            <div class="d-flex flex-column mt-2">
                <span>Lugar de Origen</span>
                <a class="cardLink" href="">${character.origin.name}</a>
                <span>Visto por ultima vez en</span>
                <a class="cardLink" href="">${character.location.name}</a>
                <span>Visto por primera vez en el capitulo</span>
                <a class="cardLink" href="">${character.episode[0]}</a>
            </div>
            </div>
        `;
    cargarOnClick(card,character);
    document.getElementById('main').appendChild(card);
}
function cargarOnClick(card,character){
    var personajeEncontrado=false;
    for(var i=0;i<personajes.length;i++){
        if(character.id==personajes[i].id){
            card.style= "box-shadow: 5px 5px 25px 5px red !important";
            card.onclick = () => eliminarCharacter(character);
            personajeEncontrado=true;
        }       
    }
    if(!personajeEncontrado){
        card.onclick = () => agregarCharacter(character);
    }
    
}
function agregarCharacter(character){
    if(personajes.length<3){

        personajes.push(character)
        var card = document.getElementById(`char${character.id}`);
        card.onclick = () => eliminarCharacter(character);
        card.style= "box-shadow: 5px 5px 25px 5px red !important";
        actualizarCompareGadget(character)
    }else{
        mostrarToast();
        console.log("No se puede agregar mas personajes");
    }

}
function eliminarCharacter(character){
    for(var i=0;i<personajes.length;i++){
        if(character.id==personajes[i].id){
            personajes.splice(i,1)
        }
    }
    var card = document.getElementById(`char${character.id}`);
    card.style= "";
    card.onclick = () => agregarCharacter(character);
    actualizarCompareGadget();

}