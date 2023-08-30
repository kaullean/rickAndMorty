function getIconStatusUrl(status){
    var iconStatus;
    if(status == "Alive"){
        iconStatus="https://img.icons8.com/emoji/48/green-circle-emoji.png"
    }
    if(status == "Dead"){
        iconStatus="https://img.icons8.com/emoji/48/red-circle-emoji.png"
    }
    if(status == "unknown"){
        iconStatus="https://img.icons8.com/fluency-systems-filled/96/FFFFFF/question-mark.png"
    }
    return iconStatus
}
function getIconGenderUrl(gender){
    var iconGenero;
    if(gender == "Male"){
        iconGenero= "https://img.icons8.com/fluency-systems-filled/96/FFFFFF/male.png"
    }
    if(gender == "Female"){
        iconGenero="https://img.icons8.com/fluency-systems-filled/96/FFFFFF/female.png"
    }
    if(gender == "Genderless"){
        iconGenero="https://img.icons8.com/fluency-systems-filled/96/FFFFFF/neuter.png" 
    }
    if(gender == "unknown"){
        iconGenero="https://img.icons8.com/fluency-systems-filled/96/FFFFFF/question-mark.png" 
    }  
    return iconGenero;
}
function crearCardPersonaje(character){
    var card = document.createElement('div');
    card.className="card cardPersonaje m-3"
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
    document.getElementById('main').appendChild(card);
}
function crearCardLocation(location){
    var card = document.createElement('div');
    card.className="card cardLocation m-3"
    card.style="width: 18rem"
    card.innerHTML=`     
      <div class="card-body d-flex flex-column text-light" id=${location.id}>
        <div class="cardInfo_Status p-2 d-flex flex-column text-center">
          <span >
            Nombre : ${location.name}
          </span>
          <span>
            Tipo : ${location.type}
          </span>
          <span>
            Dimension : ${location.dimension}
          </span>
        </div>
        <div class="d-flex flex-column mt-2">
          <span>Habitantes:  ${location.residents.length} </span>
          <button onClick=mostrarHabitantes(${location.id}) type="button" class="btn btn-warning verHabitantes">Ver habitantes</button>
        </div>
        <div id="contenedorHabitantes${location.id}" class="d-flex flex-wrap"></div>
      </div>`;
    document.getElementById('main').appendChild(card);
}
function borrarMain(){
    document.getElementById('main').innerHTML="";
}
function cargarHome(){
    borrarMain();
    mostrarPersonajes();
}
function cargarLocation(){
    borrarMain();
    mostrarLocations();
}

function cargarHabitantes(habitante,idPlaneta){

    fetch(habitante)
    .then(response => response.json())
    .then(data => {
        var habitantes = document.createElement('div');
        var contenedor = "contenedorHabitantes"+idPlaneta 
        habitantes.className="habitantes"
        habitantes.innerHTML=`     
        <img class="rounded-circle shadow-4-strong width="60rem" height="60rem" title="${data.name}" src="${data.image}" />
        `;
        document.getElementById(contenedor).appendChild(habitantes);
    });    
}