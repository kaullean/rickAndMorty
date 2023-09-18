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
          <button onClick=renderHabitantes(${location.id},'location') type="button" class="btn btn-warning verHabitantes" id="verHabitantes${location.id}">Ver habitantes</button>
        </div>
        <div id="contenedorHabitantes${location.id}" class="d-flex flex-wrap scroll"></div>
      </div>`;
    document.getElementById('main').appendChild(card);
}