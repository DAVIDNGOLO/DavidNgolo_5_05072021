// recuperer donnée localstorage

let panier = JSON.parse(localStorage.getItem("panier"));
console.log(panier);
//selection de la classe où je vais injecter le code html

const elementsPanier = document.querySelector("#container-panier");
console.log(elementsPanier);
////si vide : panier vide

if (panier === null) {
  const panierVide = `
  <div class="container-panier-vide">
    <div> le panier est vide</div>
  </div> 
  `; 
  elementsPanier.innerHTML = panierVide;
} else {
  let structureProduitPanier = [];
  for (k = 0; k < panier.length; k++) {
    structureProduitPanier =
      structureProduitPanier +
      `
    <div class="container-recapitulatif">
      <div> Produits : ${panier[k].name} | Couleur : ${panier[k].couleur} | Prix : ${panier[k].price}  - <button class="btn-supprimer"> supprimer article </button> 
    </div>     
    `;
  }
  if (k == panier.length) {
    //injection html panier
    elementsPanier.innerHTML = structureProduitPanier;
  }
}

//sélection des références de tous les boutons btn-supprimer

let btn_supprimer = document.querySelectorAll(".btn-supprimer");



for (let l = 0; 1 < btn_supprimer.length; l++){
  console.log("salut");
  btn_supprimer[l].addEventListener("click" , (event) =>{
    event.preventDefault();
    
    //sélection de l'id du produit qui va etre supprimé en cliquant sur le bouton
    let id_selectionner_suppression = panier[l].id;
    console.log(id_selectionner_suppression);

    //avec la methode filter je selectionne les elements a garder et supprimer l'element ou le btn supprimer a ete clique
    panier = panier.filter( el => el._id !== id_selectionner_suppression);
      console.log(panier);
    
  })

}

