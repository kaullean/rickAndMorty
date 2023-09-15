var sec;
const pedirDataAsync = async (url) =>{
  var response = await fetch(url);
  var dataJson = await response.json();
  return dataJson;
}
const logData = async ()=>{
  let data = await pedirDataAsync('https://rickandmortyapi.com/api/character');
} 
function darFormatoUrl(page,id,section,querys){
  if(id){
    return `https://rickandmortyapi.com/api/${section}/${id} `
  }
}

function renderSection(page, section,query,ids) {
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
          console.log(data);
          data.characters.forEach((characters) => {
            crearImgHabitante(characters, id, section);
          });
          break;
      }
    });
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
  if(input == "alive"){
    query=query+"status="+input
    renderSection(1,sec,query);
  }
  if(input == "dead"){
    query=query+"status="+input
    renderSection(1,sec,query);
  }
  if(input == "unknown"){
    query=query+"status="+input
    renderSection(1,sec,query);
  }
  if(input == "male"){
    query=query+"gender="+input
    renderSection(1,sec,query);
  }
  if(input == "female"){
    query=query+"gender="+input
    renderSection(1,sec,query);
  }
  if(input == "genderless"){
    query=query+"gender="+input
    renderSection(1,sec,query);
  }
  query=query+"name="+input;
  renderSection(1,sec,query);
}
renderSection(1,'character');
