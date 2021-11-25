// Recuperer donnée localstorage

let panier = JSON.parse(localStorage.getItem("panier"));

//Selection de la classe où je vais injecter le code html

const elementsPanier = document.querySelector("#container-panier");

////Si vide : panier vide

if (panier === null || panier == 0) {
  const panierVide = `
                      <div class="container-panier-vide">
                        <div> le panier est vide</div>
                      </div> 
                      `;
  elementsPanier.innerHTML = panierVide;
} else {
  let structureProduitPanier = [];

  for (produit of panier) {
    const price = currencyPrice(produit.price);

    elementsPanier.innerHTML += `
                                <div class="container-recapitulatif">
                                
                                  <div> Produits : ${produit.name} | Couleur : ${produit.color} | Prix  : ${price} |  Quantité : ${produit.quantites} 
                                </div>  
                                `;
  }
  //***************** */
}
let products = [];
let prixTotalCalcul = [];
for (produit of panier) {
  let prixProduitPanier = produit.price;
  

  //Mettre les prix du panier dans la variable prixTotal
  products.push(produit.id);

  prixTotalCalcul.push(prixProduitPanier);

 
}

//Additionner les prix dans le tableau de la variable prixTotalCalcul methode reducer

const reducer = (accumulator, currentValue) => accumulator + currentValue;

console.log(prixTotalCalcul.reduce(reducer));

document.getElementById("prixtotal").innerHTML = `<div> MONTANT TOTAL = ${prixTotalCalcul.reduce(reducer) / 100 + "€"} </div>  
`;

//Formulaire commande/////////
const afficherFormulaire = () => {
  //Selection element dom pour le positionnement du formulaire
  const positionFormulaire = document.querySelector("#section2");
  const structureFormulaire = `
                              <!-- Formulaire-->
                            <div id="section2--formulaireCommande">
                                <div>
                                    <h2 class="section2--titre">
                                        Remplissez le formulaire pour valider votre commande
                                    </h2>
                                </div>
                                <form>
                                    <label for="prenom"> Prénom : </label>
                                    <input type="text" id="prenom" name="prenom" required>
                                    

                                    <label for="nom"> Nom : </label>
                                    <input type="text" id="nom" name="prenom" required>
                                    
                                    <label for="adresse"> Adresse : </label>
                                    <textarea  name="adresse" id="adresse" required></textarea>
                                    
                                    <label for="ville"> Ville : </label>
                                    <input type="text" id="ville" name="ville" required>
                                    
                                    <label for="email"> E-mail : </label>
                                    <input type="text" id="email" name="email" required>
                                    <button id="section2--envoyerFormulaire" type="submit" name="envoyerFormulaire">
                                        Confirmation de la commande
                                    </button>

                                </form>
                                

                            </div>`;
  //Injection HTML
  positionFormulaire.insertAdjacentHTML("afterend", structureFormulaire);
};

//Affichage du formulaire
afficherFormulaire();

//Selection du bouton envoyer formulaire

const btnEnvoyerFormulaire = document.querySelector("#section2--envoyerFormulaire");

btnEnvoyerFormulaire.addEventListener("click", (e) => {
  //Stoper action definit par defaut
  e.preventDefault();

  //Recuperer des valeurs du formulaire
  const contact = {
    firstName: document.querySelector("#prenom").value,
    lastName: document.querySelector("#nom").value,
    address: document.querySelector("#adresse").value,
    city: document.querySelector("#ville").value,
    email: document.querySelector("#email").value,
  };

  /****************** GESTION VALIDATION FORMULAIRE */
  const textAlert = (value) => {
    return `${value}: Chiffre et symbole ne sont pas autorisés \n Ne pas dépasser 20 caractères, minimum 3 caractères`;
  };

  const regExPrenomNomVille = (value) => {
    return /^[A-Za-z]{3,20}$/.test(value);
  };
  const regExEmail = (value) => {
    return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value);
  };

  const regExAdresse = (value) => {
    return /^[A-Za-z0-9\s]{5,50}$/.test(value);
  };

  function prenomControle() {
    //Controle de la validité du prénom
    const lePrenom = contact.firstName;

    if (regExPrenomNomVille(lePrenom)) {
      return true;
    } else {
      alert(textAlert("Prenom"));
      return false;
    }
  }

  function nomControle() {
    //Controle de la validité du nom
    const leNom = contact.lastName;

    if (regExPrenomNomVille(leNom)) {
      return true;
    } else {
      alert(textAlert("Nom"));
      return false;
    }
  }
  function villeControle() {
    //Controle de la validité de la ville
    const laVille = contact.city;

    if (regExPrenomNomVille(laVille)) {
      return true;
    } else {
      alert(textAlert("Ville"));
      return false;
    }
  }

  function emailControle() {
    //Controle de la validité du mail
    const leMail = contact.email;

    if (regExEmail(leMail)) {
      return true;
    } else {
      alert("l'email n'est pas valide");
      return false;
    }
  }

  function adresseControle() {
    //Controle de la validité de l'adresse
    const leAdresse = contact.address;
    if (regExAdresse(leAdresse)) {
      return true;
    } else {
      alert("l'adresse ne doit contenir que des lettres sans ponctuations et des chiffres");
      return false;
    }
  }

  //Controle validité formulaire avant l'envoie dans le localstorage
  if (prenomControle() && nomControle() && emailControle() && adresseControle() && villeControle()) {
    //Mettre l'objet contact dans le local storage

    localStorage.setItem("contact", JSON.stringify(contact));
    //Enregistrer prix total localstorage
    //LocalStorage.setItem("prixTotal",JSON.stringify(prixTotalCalcul));
  } else {
    alert("Veuillez bien remplir le formulaire");
  }

  //Mettre les values du formulaire et les produits selectionnés dans un objet à envoyer vers le serveur

  const aEnvoyer = {
    contact,
    products,
    prixTotalCalcul,
  };
  

  //Envoie de l'objet à envoyer dans le serveur

  fetch("http://localhost:3000/api/teddies/order", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(aEnvoyer),
  })
    .then((response) => {
      response.json().then((data) => {
        console.log(data.orderId);
        localStorage.setItem("orderId", data.orderId);
        localStorage.setItem("prixTotalCalcul", prixTotalCalcul);

        window.location.href = "confirmation.html";
      });
      console.log(response);
      console.log(response.orderId);
      //Mettre id dans le local storage
    })

    .catch((error) => {
      alert(error);
    });
  //Clear le local storage

  //Recuperer les infos dans la page de confirmation
  //Ensuite le clear du local storage
  //Window.location.href = "confirmation.html"
});
