function renderSection(page,section){
  if(!page){
    page=1;
  }
  if(!section){
    section="character"
  }
  url=`https://rickandmortyapi.com/api/${section}?page=${page}`
  
  fetch(url)
  .then(response => response.json())
  .then(data => {
    borrarMain();
    
    
      switch(section){
      case "character":
          data.results.forEach((dato) =>{
            crearCardPersonaje(dato);
          });
          break;
      case "location":
          data.results.forEach((dato) =>{
            crearCardLocation(dato);
          });          
          break;
      case "episode":
      data.results.forEach((dato) =>{
        crearCardEpisode(dato);
      });          
      break;
      }
      cargarPaginacion(page,data.info.pages,section);
  })
}
function mostrarHabitantes(id,section){
  url=`https://rickandmortyapi.com/api/${section}/${id}`;

  fetch(url)
  .then(response => response.json())
  .then(data => {
    switch(section){
      case "location":
          data.residents.forEach((habitante) =>{
            cargarHabitantes(habitante,id,section);
          });
            
          break;
      case "episode":
        console.log(data);
        data.characters.forEach((characters) =>{
          cargarHabitantes(characters,id,section);
        });       
      break;
      }
 
  })

}
function ocultarHabitantes(idPlaneta,section){
  var idElemento='contenedorHabitantes'+idPlaneta
  var elemento=document.getElementById(idElemento)
  elemento.innerHTML="";
  var clasNam='verHabitantes'+idPlaneta
  var boton =document.getElementById(clasNam);
  console.log(boton);
  boton.onclick=()=>mostrarHabitantes(idPlaneta,section);
}
function cargarPaginacion(paginaActual,paginasTotales,section){
  var pager=document.getElementById('pager');
  
  if(!paginaActual){
    paginaActual=1;
  }
  if((paginaActual-2<0 || paginaActual+2>paginasTotales) && paginaActual!=1){
    return 0;
  }
  pager.innerHTML="";
  for(var i = paginaActual-2 ; i<=paginaActual+2;i++){
    
    var linkPagina = document.createElement('li');
    linkPagina.className="page-item"

    linkPagina.innerHTML=`
          <button class="page-link" onClick="renderSection(${i},'${section}')" id="pageButton${i}">${i}</button>
        `;
      pager.appendChild(linkPagina);
  }
  var linkActive=document.getElementById(`pageButton${paginaActual}`).parentElement;

  linkActive.className="page-item active"
  
}
function cargarHabitantes(habitante,id,section){

  fetch(habitante)
  .then(response => response.json())
  .then(data => {

      var habitantes = document.createElement('div');
      var contenedor = "contenedorHabitantes"+id 
      habitantes.className="habitantes"
      habitantes.innerHTML=`     
      <img class="rounded-circle shadow-4-strong width="60rem" height="60rem" title="${data.name}" src="${data.image}" />
      `;
      document.getElementById(contenedor).appendChild(habitantes);
      var clasNam='verHabitantes'+id
      var boton =document.getElementById(clasNam);
      boton.onclick=()=>ocultarHabitantes(id,section);
  });    
}
renderSection('1','episode');




