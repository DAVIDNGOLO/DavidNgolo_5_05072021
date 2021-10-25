// recuperer donnée localstorage

let panier = JSON.parse(localStorage.getItem("panier"));
console.log(panier);
//selection de la classe où je vais injecter le code html

const elementsPanier = document.querySelector("#container-panier");
console.log(elementsPanier);
////si vide : panier vide

if (panier === null || panier == 0 ) {
  const panierVide = `
  <div class="container-panier-vide">
    <div> le panier est vide</div>
  </div> 
  `; 
  elementsPanier.innerHTML = panierVide;
} else {
  let structureProduitPanier = [];
  
    for (produit of panier){
    const price = currencyPrice(produit.price);
    
      elementsPanier.innerHTML +=
      `
    <div class="container-recapitulatif">
     
      <div> Produits : ${produit.name} | Couleur : ${produit.color} | Prix  : ${price} |  Quantité : ${produit.quantites} <button class="btn-supprimer"> supprimer article </button> 
    </div>  
    `;
  }
  //***************** */

}

let prixTotalCalcul = [];
for (produit of panier ){
  let prixProduitPanier = produit.price;
  console.log(prixProduitPanier);

  //mettre les prix du panier dans la variable prixTotal 

  prixTotalCalcul.push(prixProduitPanier)

  console.log(prixTotalCalcul);

}

//additionner les prix dans le tableau de la variable prixTotalCalcul methode reducer

const reducer = (accumulator, currentValue) => accumulator + currentValue;

console.log(prixTotalCalcul.reduce(reducer));

document.getElementById('prixtotal').innerHTML =  `<div> MONTANT TOTAL = ${prixTotalCalcul.reduce(reducer)/100 + "€"} </div>  
`  ;







