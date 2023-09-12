const gallery = document.querySelector('.gallery');
let works;
let apiURL = "http://localhost:5678/api/";


//***Récupération des travaux depuis le backend***//
async function getTheWorks() {
  const getWorks = await fetch(`http://localhost:5678/api/works`);
  works = await getWorks.json();
  createWorks();//***appel de la fonction pour afficher les travaux***//
}
getTheWorks();

function createWorks() { //***affichage des travaux sur la page d'accueil***//
  for (let i = 0; i < works.length; i++) {
    const newWork = document.createElement('figure');
    newWork.dataset.id = works[i].id;
    const newWorkImg = document.createElement('img');
    newWorkImg.src = works[i].imageUrl;
    const newWorkText = document.createElement('figcaption');
    newWorkText.innerHTML = works[i].title;


//***Réalisation du filtre des travaux***//
    newWork.setAttribute('categoryId', works[i].categoryId); //***attribution d'un categoryId aux balises newWork pour pouvoir les filtrer***//

    gallery.appendChild(newWork);//***rattachement aux div parents pour afficher les éléments sur la page***//
    newWork.appendChild(newWorkImg);
    newWork.appendChild(newWorkText);
  }

  const worksElements = document.querySelectorAll(".gallery figure"); //***création d'une constante pour stocker les éléments créer à partir du tableau works***//

  const tousBtn = document.querySelector("#tous");//***Récupération des boutons de filtres***//
  const objetsBtn = document.querySelector("#objets");
  const appartementsBtn = document.querySelector("#appartements");
  const hotelsRestaurantsBtn = document.querySelector("#hotelsRestaurants");

  tousBtn.addEventListener("click", function() { //***Ajout d'écouteurs d'événements pour chaque bouton de filtre***//
    for (let i = 0; i < worksElements.length; i++) { //***on parcourt les éléments du tableau worksElements (elements du tableau works)***//
      worksElements[i].style.display = "block";
    }
  });

  objetsBtn.addEventListener("click", function() {
    const objets = works.filter(work => work.categoryId === 1); //***creation d'une constante pour filtrer les travaux de type "objet"***//
    for (let i = 0; i < worksElements.length; i++) { //***on parcourt le tableau worksElements***//
      if (objets.includes(works[i])) { //***condition "si l'élément parcouru dans le tableau works est un élément présent dans la constante objets"***//
        worksElements[i].style.display = "block"; //***si true, on affiche le worksElements parcouru***//
      } else {
        worksElements[i].style.display = "none"; //***sinon, on le cache***//
      }
    }
  });

  appartementsBtn.addEventListener("click", function() { //***de même pour les autres boutons***//
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

//***Athentification et redirection de l'utilisateur***//
const userToken = localStorage.getItem('token'); // récupération du token dans le local Storage

if (userToken) { // changement du login en logout
  const loginButton = document.querySelector("#loginButton");
  loginButton.innerHTML = "<a href='javascript:void(0)'>logout</a>";

  const h1Header = document.querySelector("header h1"); // décalage des éléments de navigation pour afficher la barre de modification
  h1Header.style.marginTop = "38px";
  const nav = document.querySelector("nav");
  nav.style.marginTop ="38px"

  const modeEditionBandeau = document.querySelector(".mode-edition"); //affichage de la barre de modification
  modeEditionBandeau.style.display = "flex";

  loginButton.addEventListener('click', function() { // écouteur d'évènement pour retirer le token du localStorage au logout
    localStorage.removeItem('token');
    window.location.href = 'index.html';
  });

  document.querySelector("#introduction i").style.display = "block"; // ajout des boutons modifier et positionnement "Mes Projets"
  document.querySelector("#portfolio i").style.display = "block";
  document.querySelector(".portfolio-title").style.marginLeft = "115px";


//***Ajout de la fenêtre modale***//
  const modal = document.getElementById("myModal");
  const modalContent = document.querySelector(".modalContent");
  const openModalButton = document.getElementById("openModalButton"); //apparition
  const closeModalButton = document.querySelectorAll(".closeModalButton"); //disparition
  const mediaListing = document.getElementById("mediaListing")
  const addPhoto = document.getElementById("addPhoto")
  const modalGallery = document.querySelector(".modalGallery");

  openModalButton.addEventListener('click', function() { //écouteur d'évènement pour ouvrir la modale
    openModal();
    modalContent.setAttribute("tabindex", 3);
  })
  
  let imagesImported = false; // déclaration d'une varaible pour savoir si les images sont importées ou non dans la modale

  function createModalGallery () { // création de la gallery dans la modale 
    for (let i = 0; i < works.length; i++) {
    const newWork = document.createElement('figure');
    newWork.setAttribute('data-id', works[i].id);
    const newWorkImg = document.createElement('img');
    newWorkImg.src = works[i].imageUrl;
    const newWorkText = document.createElement('figcaption');
    newWorkText.innerHTML = "editer";
    const newDustBin = document.createElement('div')
    newDustBin.classList = "dustbin"
    newDustBin.innerHTML = "<i class='fa-solid fa-trash-can'></i>"
    newWork.setAttribute("tabindex", 3)
    const modalGalleryBar = document.querySelector(".modalGalleryBar")
    modalGalleryBar.setAttribute("tabindex", 3)
    const boutonAjoutPhoto = document.getElementById("ajoutPhoto")
    boutonAjoutPhoto.setAttribute("tabindex", 3)
    const boutonSupprModal = document.getElementById("boutonSupprModal")
    boutonSupprModal.setAttribute("tabindex", 3)

    modalGallery.appendChild(newWork);
    newWork.appendChild(newWorkImg);
    newWork.appendChild(newWorkText);
    newWork.appendChild(newDustBin)
    
    imagesImported = true;

    newDustBin.addEventListener('click', function() { // écouteur d'évènement sur les icones poubelles pour supprimer une image
      const workId = newWork.getAttribute('data-id');
      deleteWork(workId, newWork);
    })
    }
  }

  const openModal = async function () { // fonction pour afficher la modale
    modal.style.display = "flex"
    if (!imagesImported) {
     
      createModalGallery()
      
      document.getElementById("ajoutPhoto").addEventListener('click', function() { // écouteur d'évènement pour changer le contenu de la modale au clique sur le bouton ajout Photo (page 2 de la modale)
        mediaListing.style.display = "none"
        addPhoto.style.display = "flex"
      })
    }
  }

  const closeModal = function () { // fonction pour fermer la modale
    modal.style.display = "none"
    mediaListing.style.display = "flex"
    addPhoto.style.display = "none"
  }
  
  Array.from(closeModalButton).forEach(element => { //écouteur d'évènement pour fermer la modale au click sur la croix
    element.addEventListener('click', function(e) {
        closeModal();
    })
  });

  modal.addEventListener('click', function(e) { //écouteur d'évènement pour fermer la modale au clique en dehors de celle-ci
    if (e.target !== modal) {
      return
    } else if (e.target !== modalContent) {
      closeModal();
    }
  })


//***Suppression de travaux existants***//
  async function deleteWork(workId, worksElements) {
      const response = await fetch(`${apiURL}works/${workId}`, {
         headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token'),
          'Content-Type': 'application/json',
          'Accept': 'application/json'} ,
          method: 'DELETE'  
        } );
      if (response.ok) {  // Supprimer l'élément du DOM
        worksElements.remove(); // Retire l'élément du DOM lié à l'entrée de travail
        document.querySelector(`figure[data-id="${workId}"]`).remove(); // Retire l'élément du DOM correspondant dans la galerie
      } 
    }

  document.getElementById("returnToMediaListing").addEventListener("click", function () { // écouteur d'évènement pour retourner sur la gallery dans la modale (page 1 de la modale)
    mediaListing.style.display = "flex"
    addPhoto.style.display = "none"
    document.getElementById("postNewPhotoForm").reset();
    retirerPrevisualisation()
  })

  function afficherImage() { // fonction pour afficher la prévisualisation de l'image dans le formulaire
    let file = document.getElementById("plusAjoutPhoto").files
    let imgToShow = document.getElementById("imgToShow")
    const image = document.getElementById("plusAjoutPhoto")
    const iconeLandscape = document.getElementById("iconeLandscape")
    const legendAjoutPhoto = document.getElementById("legendAjoutPhoto")
    const tailleFichier = document.getElementById("tailleFichier")
    if (file.length >0 ) {
      let fileReader = new FileReader();
        fileReader.onload = function(event) {
          imgToShow.setAttribute("src", event.target.result)
          imgToShow.style.width = "129px"
          imgToShow.style.height = "169px"
          image.style.display = "none"
          iconeLandscape.style.display = "none"
          legendAjoutPhoto.style.display = "none"
          tailleFichier.style.display = "none"
        }
        fileReader.readAsDataURL(file[0])
    }
  }

  document.getElementById("plusAjoutPhoto").addEventListener('change', function() {
    afficherImage()
  })
  
  let image = document.getElementById("plusAjoutPhoto")
  let titre = document.getElementById("titreAjoutPhoto")
  let categorie = document.getElementById("categorieAjoutPhoto")
  const validAjoutPhoto = document.getElementById("validAjoutPhoto")
  
  function checkFormInputs() { // fonction qui passe le bouton Valider en vert si tous les champs sont remplis
    image = document.getElementById("plusAjoutPhoto")
    titre = document.getElementById("titreAjoutPhoto")
    categorie = document.getElementById("categorieAjoutPhoto")
      if (image.value.length > 0 && titre.value.length > 0 && categorie.value.length > 0) {
        validAjoutPhoto.style.backgroundColor = "#1D6154"
      } else {
        validAjoutPhoto.style.backgroundColor = "#A7A7A7"
      }
    } 

  Array.from(document.querySelector(".inputForm")).forEach (function (element){ // écouteur d'évènement pour checker les inputs de mon formulaire
    element.addEventListener("change", function (){
      checkFormInputs()
    })
  })
  
//***Envoi d'un nouveau projet au backend via le formulaire de la modale***//
  async function sendNewPhoto() {
    const formData = new FormData(document.getElementById("postNewPhotoForm"));
    const newPhotoPosted = await fetch (`${apiURL}works`, {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
        },
        body: formData,
        method: 'POST'  
      } );
      const result = await newPhotoPosted.json();
        
    if (result) { // creation du nouveau travail et affichage dynamique

      const newWork = document.createElement('figure'); // dans la Gallery
      newWork.dataset.id = result.id;
      const newWorkImg = document.createElement('img');
      newWorkImg.src = result.imageUrl;
      const newWorkText = document.createElement('figcaption');
      newWorkText.innerHTML = result.title;
      newWork.setAttribute('categoryId', result.categoryId);
    
      gallery.appendChild(newWork);
      newWork.appendChild(newWorkImg);
      newWork.appendChild(newWorkText);

      const newWorkModal = document.createElement('figure'); // dans la modale
      newWorkModal.setAttribute('data-id', result.id);
      const newWorkImgModal = document.createElement('img');
      newWorkImgModal.src = result.imageUrl;
      const newWorkTextModal = document.createElement('figcaption');
      newWorkTextModal.innerHTML = "editer";
      const newDustBin = document.createElement('div')
      newDustBin.classList = "dustbin"
      newDustBin.innerHTML = "<i class='fa-solid fa-trash-can'></i>"
      newWorkModal.setAttribute("tabindex", 3)
        
      modalGallery.appendChild(newWorkModal);
      newWorkModal.appendChild(newWorkImgModal);
      newWorkModal.appendChild(newWorkTextModal);
      newWorkModal.appendChild(newDustBin)

      newDustBin.addEventListener('click', function() {
      const workId = newWork.getAttribute('data-id');
      deleteWork(workId, newWork);
      })
    }
  }
    
  document.getElementById("postNewPhotoForm").addEventListener("submit", function(event) { // ecouteur d'évènement à l'envoie du formulaire
    event.preventDefault();
 
    if (!image.value || !titre.value || !categorie.value) { // si les champs ne sont pas remplis, envoyer un message d'alerte

      alert("Veuillez remplir tous les champs requis")

    } else {

      const image = document.getElementById("plusAjoutPhoto").value // envoyer les données remplies dans le formulaire
      const titre = document.getElementById("titreAjoutPhoto").value
      const categorie = document.getElementById("categorieAjoutPhoto").value
        
      sendNewPhoto(image, titre, categorie); // appel de la fonction pour envoyer le nouveau travail
      retirerPrevisualisation()
      document.getElementById("postNewPhotoForm").reset();
    }
  })

  function retirerPrevisualisation() { // fonction qui réinitialise la prévisualisation de l'image dans le formulaire
    imgToShow.removeAttribute("src");
    imgToShow.style.width = "0";
    imgToShow.style.height = "0";
    image.style.display = "flex";
    iconeLandscape.style.display = "flex";
    legendAjoutPhoto.style.display = "flex";
    tailleFichier.style.display = "flex";
  }
}
