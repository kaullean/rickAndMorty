function crearCardEpisode(episode){

    var card = document.createElement('div');
    card.className="card cardEpisode m-3"
    card.style="width: 18rem"
    card.innerHTML=`     
        <div class=" d-flex flex-column text-light p-0 ">
            <img src="https://i.ytimg.com/vi/8zSv96ofxgw/maxresdefault.jpg" class="card-img-top" alt="..." />
            <div class="card-body p-2 d-flex flex-column text-center">
                <h5 class="card-title">${episode.name}</h5>
                <p class="date">${episode.air_date}</p>
                <p class="card-text">${episode.episode}</p>
                <p class="card-text">Personajes: ${episode.characters.length}</p>
                <button onClick=renderHabitantes(${episode.id},'episode') type="button" class="btn btn-warning verHabitantes" id="verHabitantes${episode.id}">Ver Participantes</button>
            </div>
            <div id="contenedorHabitantes${episode.id}" class="d-flex flex-wrap scroll"></div>
        </div>`;
    document.getElementById('main').appendChild(card);
}