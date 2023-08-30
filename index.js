function mostrarPersonajes(pagina){
  if(!pagina){
    url='https://rickandmortyapi.com/api/character?page=1'
  }
  else{
    url='https://rickandmortyapi.com/api/character?page='+pagina
  }
  fetch(url)
  .then(response => response.json())
  .then(data => {
    console.log(data);
    data.results.forEach((character) =>{
        crearCardPersonaje(character);
      });
  });
}
function mostrarLocations(pagina){
  if(!pagina){
    url='https://rickandmortyapi.com/api/location?page=1'
  }
  else{
    url='https://rickandmortyapi.com/api/location?page='+pagina
  }
  fetch(url)
  .then(response => response.json())
  .then(data => {
    data.results.forEach((location) =>{
          crearCardLocation(location);
      });
  })
  
}
function mostrarHabitantes(idPlaneta){
  url='https://rickandmortyapi.com/api/location/'+idPlaneta;
  
  fetch(url)
  .then(response => response.json())
  .then(data => {
    data.residents.forEach((habitante) =>{
      cargarHabitantes(habitante,idPlaneta);
      });
  });
}

mostrarLocations(1);




