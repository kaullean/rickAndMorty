var personajes=[];
function compararPersonajesSeleccionados(){
    var aux=[];
    for(var i=0;i<personajes.length;i++){
        for(var j=0;j<personajes.length;j++){
            console.log(`cuando i es: ${i} y j es: ${j} da: ${personajes[i].id!=personajes[j].id}`)
            if(personajes[i].id!=personajes[j].id){
                aux.push(`Comparte con ${personajes[j].name} : ${episodiosIguales(personajes[i].episode,personajes[j].episode)} episodios`);
            }     
        } 
        personajes[i].comparaciones=aux; 
        aux=[];         
    }

}
function episodiosIguales(episodesA,episodesB){    
    var count=0;
        for(var i=0;i<episodesA.length;i++){
            for(var j=0;j<episodesB.length;j++){
                if(episodesA[i]==episodesB[j]){
                    count++
                }
            }           
        }

    return count;
}
function crearCardCompare(){
    compararPersonajesSeleccionados();
    borrarMain();
        for(var i=0;i<personajes.length;i++){
            
            var card = document.createElement('div');
            card.className="card cardPersonaje  m-3"
            card.id="char"+personajes[i].id
            card.style="width: 18rem"
            card.innerHTML=`
                    <img src="${personajes[i].image}" class="card-img-top" alt="...">
                    <div class="card-body d-flex flex-column text-light justify-content-around">
                        <h2 class="text-center m-0">${personajes[i].name} </h2>
                        <div class="cardInfo_Status d-flex flex-column text-center">
                            <span style="padding-right: 1rem;">
                            <img width="20vw" height="20vh" src="${getIconStatusUrl(personajes.status)}"/>
                            ${personajes[i].status.toUpperCase()} - ${personajes[i].species.toUpperCase()} 
                            
                            </span>
                            <span>
                            <img width="20vw" height="20vh" src="${getIconGenderUrl(personajes[i].gender)}" alt="${personajes[i].gender}"/>
                            ${personajes[i].gender.toUpperCase()}
                            </span>
                        </div>
                        <div clase="d-flex flex-column mt-2">

                        </div>
                    </div>
                `;
                console.log(card.childNodes);

            var compContainer = document.createElement('div');
            compContainer.className="d-flex flex-column mt-2"

            personajes[i].comparaciones.forEach(comparacion => {
                var span = document.createElement('span');
                span.innerHTML=comparacion;
                compContainer.appendChild(span);
            });
            card.appendChild(compContainer);
            document.getElementById('main').appendChild(card);
                
        }
    
   // var AC=comprarEpisodes(personajes[0].episode,personajes[2].episode);   
}
function agregarCharacter(character){
    if(personajes.length<3){

        personajes.push(character)
        var card = document.getElementById(`char${character.id}`);
        card.onclick = () => eliminarCharacter(character);
        card.style= "box-shadow: 5px 5px 25px 5px red !important";
        actualizarCompareGadget(character)
    }else{
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
function actualizarCompareGadget(){
    var compareGadget = document.getElementById('compareGadget');
    var ids=[];
    compareGadget.innerHTML=""
    for(var i=0;i<personajes.length;i++){
        ids.push(personajes[i].id.toString());
        var img = document.createElement("div");
        img.className = "habitantes";
        img.innerHTML = `     
            <img class="rounded-circle shadow-4-strong width="60rem" height="60rem" title="${personajes[i].name}" src="${personajes[i].image}" />
            `;
        compareGadget.appendChild(img)
    }
    compareGadget.onclick = () => crearCardCompare();
}