var personajes=[];
function compararPersonajesSeleccionados(){
    var aux=[];
    for(var i=0;i<personajes.length;i++){
        for(var j=0;j<personajes.length;j++){
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
    var pager = document.getElementById("pager");
    pager.innerHTML=""
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
                            <img width="20vw" height="20vh" src="${getIconStatusUrl(personajes[i].status)}"/>
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

            var compContainer = document.createElement('div');
            compContainer.className="d-flex flex-column mt-2"

            personajes[i].comparaciones.forEach(comparacion => {
                var span = document.createElement('span');
                span.innerHTML=comparacion;
                compContainer.appendChild(span);
            });
            card.childNodes[3].childNodes[5].appendChild(compContainer);//accede al nodo donde se muestran las comparaciones
            document.getElementById('main').appendChild(card);               
        }
}
function actualizarCompareGadget(){
    var compareGadget = document.getElementById('compareGadget');
    compareGadget.innerHTML=""
    for(var i=0;i<personajes.length;i++){
        var img = document.createElement("div");
        img.className = "habitantes";
        img.innerHTML = `     
            <img class="rounded-circle shadow-4-strong width="60rem" height="60rem" title="${personajes[i].name}" src="${personajes[i].image}" />
            `;
        compareGadget.appendChild(img)
    }
    compareGadget.onclick = () => crearCardCompare();
}
