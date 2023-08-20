//***Récupération des projets depuis l'API***//
let works;
async function getTheWorks() {
    const getWorks = await fetch("http://localhost:5678/api/works");
    works = await getWorks.json();

/***Ajout des travaux à la galerie***/
    createWorks(); //***appel de la fonction createWorks pour afficher les travaux***//
}
getTheWorks();
const gallery = document.querySelector(".gallery");

function createWorks() {
    for (let i = 0; i < works.length; i++) {
      const newWork = document.createElement('figure');
      newWork.dataset.id = works[i].id;
      const newWorkImg = document.createElement('img');
      newWorkImg.src = works[i].imageUrl;
      const newWorkText = document.createElement('figcaption');
      newWorkText.innerHTML = works[i].title;
      
      newWork.setAttribute('categoryId', works[i].categoryId); //attribution d'un categoryId aux balises newWork pour pouvoir les filtrer
  
      gallery.appendChild(newWork); // rattachement aux div parents pour afficher les éléments sur la page
      newWork.appendChild(newWorkImg);
      newWork.appendChild(newWorkText);
    }
    
    const worksElements = document.querySelectorAll(".gallery figure"); //création d'une constante pour stocker les éléments créer à partir du tableau works
  
    const tousBtn = document.querySelector("#tous"); // Récupération des boutons de filtres
    const objetsBtn = document.querySelector("#objets");
    const appartementsBtn = document.querySelector("#appartements");
    const hotelsRestaurantsBtn = document.querySelector("#hotelsRestaurants");
  
    tousBtn.addEventListener("click", function() { // Ajout d'écouteurs d'événements pour chaque bouton de filtre
      for (let i = 0; i < worksElements.length; i++) { //on parcourt les éléments du tableau worksElements (elements du tableau works)
        worksElements[i].style.display = "block";
      }
    });
  
    objetsBtn.addEventListener("click", function() {

      const objets = works.filter(work => work.categoryId === 1); //creation d'une constante pour filtrer les travaux de type "objet"

      for (let i = 0; i < worksElements.length; i++) { // on parcourt le tableau worksElements

        if (objets.includes(works[i])) { //condition "si l'élément parcouru dans le tableau works est un élément présent dans la constante objets"

          worksElements[i].style.display = "block"; //si true, on affiche le worksElements parcouru
        } else {

          worksElements[i].style.display = "none"; //sinon, on le cache
        }
      }
    });
  
    appartementsBtn.addEventListener("click", function() { // même process pour les autres boutons
      const appartements = works.filter(work => work.categoryId === 2);
      for (let i = 0; i < worksElements.length; i++) {
        if (appartements.includes(works[i])) {
          worksElements[i].style.display = "block";
        } else {
          worksElements[i].style.display = "none";
        }
      }
    });
  
    hotelsRestaurantsBtn.addEventListener("click", function() {
      const hotelsRestaurants = works.filter(work => work.categoryId === 3);
      for (let i = 0; i < worksElements.length; i++) {
        if (hotelsRestaurants.includes(works[i])) {
          worksElements[i].style.display = "block";
        } else {
          worksElements[i].style.display = "none";
        }
      }
    });
  
  }