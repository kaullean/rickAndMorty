var sec;
function borrarMain(){
  document.getElementById('main').innerHTML="";
}
function seleccionadoNav(selected){
  var navHome = document.getElementById('home');
  var navLocation = document.getElementById('location');
  var navEpisodes = document.getElementById('episode');
  if(selected=='home' || selected=='character'){
    navHome.style=  "text-shadow: 0 0 50px #000, 0 0 10px #fff, 0 0 15px #b4dc2c, 0 0 20px #b4dc2c, 0 0 25px #b4dc2c, 0 0 60px #b4dc2c, 0 0 35px #b4dc2c;"
    navLocation.style="";
    navEpisodes.style="";
  }
  if(selected=='location'){
    navHome.style= ""
    navLocation.style= "text-shadow: 0 0 50px #000, 0 0 10px #fff, 0 0 15px #b4dc2c, 0 0 20px #b4dc2c, 0 0 25px #b4dc2c, 0 0 60px #b4dc2c, 0 0 35px #b4dc2c;"
    navEpisodes.style="";
  }
  if(selected=='episode'){
    navHome.style=""
    navLocation.style="";
    navEpisodes.style="text-shadow: 0 0 50px #000, 0 0 10px #fff, 0 0 15px #b4dc2c, 0 0 20px #b4dc2c, 0 0 25px #b4dc2c, 0 0 60px #b4dc2c, 0 0 35px #b4dc2c;"
  }
}
function reRenderSection(page, section,query,ids){
  var home = document.getElementById('contenedorHome')
  home.style="display:none";
  var nav= document.getElementById('navContainer')
  nav.style="display:flex";

  var main = document.getElementById('main')
  main.style="display:flex";
  renderSection(page, section,query,ids);

}
function renderSection(page, section,query,ids) {
  seleccionadoNav(section);
  sec=section;
  if (!section) {
    section = "character";
  }
  if(!query){
    query=""
  }
  if(!page){
     page=1; 
  }
  url = `https://rickandmortyapi.com/api/${section}?page=${page}${query}`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      borrarMain();
      
        if(!data.error){
          switch (section) {
            case "character":
              data.results.forEach((dato) => {
                crearCardPersonaje(dato);
              });
              cargarPaginacion(page, data.info.pages, section,query);
              break;
            case "location":
              data.results.forEach((dato) => {
                crearCardLocation(dato);
              });
              cargarPaginacion(page, data.info.pages, section,query);
              break;
            case "episode":
              data.results.forEach((dato) => {
                crearCardEpisode(dato);
              });
              cargarPaginacion(page, data.info.pages, section,query);
              break;
          }
        }   
        else{
          borrarMain();
          console.log("error");
        }   
    });
}
function renderHabitantes(id, section) {
  url = `https://rickandmortyapi.com/api/${section}/${id}`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      switch (section) {
        case "location":
          data.residents.forEach((habitante) => {
            crearImgHabitante(habitante, id, section);
          });

          break;
        case "episode":
          data.characters.forEach((characters) => {
            crearImgHabitante(characters, id, section);
          });
          break;
      }
    });
}
function crearImgHabitante(habitante, id, section) {

  fetch(habitante)
    .then((response) => response.json())
    .then((data) => {
      var habitantes = document.createElement("div");
      var contenedor = "contenedorHabitantes" + id;
      habitantes.className = "habitantes";
      habitantes.innerHTML = `     
      <img class="rounded-circle shadow-4-strong width="60rem" height="60rem" title="${data.name}" src="${data.image}" />
      `;
      document.getElementById(contenedor).appendChild(habitantes);
      var clasNam = "verHabitantes" + id;
      var boton = document.getElementById(clasNam);
      boton.onclick = () => ocultarImgHabitantes(id, section);
    });
}
function ocultarImgHabitantes(idPlaneta, section) {
  var idElemento = "contenedorHabitantes" + idPlaneta;
  var elemento = document.getElementById(idElemento);
  elemento.innerHTML = "";
  var clasNam = "verHabitantes" + idPlaneta;
  var boton = document.getElementById(clasNam);
  boton.onclick = () => renderHabitantes(idPlaneta, section);
}
function cargarPaginacion(paginaActual, paginasTotales, section,query) {
  var pager = document.getElementById("pager");
  var pagerLength=5; //cantidad de paginas que muestra el paginador
  const cargarBotonExtremo = (extremo)=>{
    if(extremo=="primerPag"){
      var linkPagina = document.createElement("li");
      linkPagina.className = "page-item";
  
      linkPagina.innerHTML = `
            <button class="page-link" onClick="renderSection(1,'${section}','${query}')" id="pageButton1"> << </button>
          `;
      pager.appendChild(linkPagina);

    }
    if(extremo=="ultimaPag"){

      var linkPagina = document.createElement("li");
      linkPagina.className = "page-item";
  
      linkPagina.innerHTML = `
            <button class="page-link" onClick="renderSection(${paginasTotales},'${section}','${query}')" id="pageButton${paginasTotales}"> >> </button>
          `;
      pager.appendChild(linkPagina);
    }
  }
  const cargarBoton = (numero,section)=>{
      var linkPagina = document.createElement("li");
      linkPagina.className = "page-item";

      linkPagina.innerHTML = `
            <button class="page-link" onClick="renderSection(${numero},'${section}','${query}')" id="pageButton${numero}">${numero}</button>
          `;
      pager.appendChild(linkPagina);
  }

  if (!paginaActual) {
    paginaActual = 1;
  }
  pager.innerHTML = "";
  if(paginasTotales<=pagerLength){ // si la cantidad de paginas es menor a la longitud del pager solo mostrara las paginas que existen
    for (var i = 1; i <= paginasTotales ; i++) {
      cargarBoton(i,section);
    }
  }
  else{// si la cantidad de paginas es mayor a la longitud del pager implementara la logica para navegar entre paginas
    if(paginaActual<=3){
      for (var i = 1; i <= pagerLength ; i++) {       
        cargarBoton(i,section);        
      }
      cargarBotonExtremo("ultimaPag")
    }
    if(paginaActual>=paginasTotales-2){
      cargarBotonExtremo("primerPag");
      for (var i = paginasTotales-4; i <= paginasTotales ; i++) {        
        cargarBoton(i,section);        
      }
    }
    if(paginaActual>3 && paginaActual<paginasTotales-2){
      cargarBotonExtremo("primerPag");
      for (var i = paginaActual-2; i <= paginaActual + 2; i++) {       
        cargarBoton(i,section);
      }
      cargarBotonExtremo("ultimaPag")
    }
  }
  
  var linkActive = document.getElementById(
    `pageButton${paginaActual}`
  ).parentElement;

  linkActive.className = "page-item active";
}

function searchCharacter(query){
  var input = document.getElementById('formularioBusqueda').value.toLowerCase()
  if(!query){
    var query="&";
  }
  else{
    query="&name="+query
  }
  query=query+"name="+input;
  if(input == "alive"){
    query="&status="+input
  }
  if(input == "dead"){
    query="&status="+input
  }
  if(input == "unknown"){
    query="&status="+input
  }
  if(input == "male"){
    query="&gender="+input
  }
  if(input == "female"){
    query="&gender="+input
  }
  if(input == "genderless"){
    query="&gender="+input
  }
  
  renderSection(1,sec,query);
}
renderSection(1,'character');
function mostrarToast() {
  var toast = document.getElementById("mitoast");
  toast.className = "mostrar";
  setTimeout(function(){ toast.className = toast.className.replace("mostrar", ""); }, 2500);
}
function cerrarToast() {
  var toast = document.getElementById("mitoast");
  toast.className = "cerrar";
  toast.className = toast.className.replace("cerrar", "");
}