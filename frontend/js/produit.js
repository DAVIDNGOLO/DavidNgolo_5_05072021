// Recherche de l'id dans l'URL
let params = new URLSearchParams(document.location.search);
let idProduit = params.get("id");

//Mise en forme des données
fetch("http://localhost:3000/api/teddies/" + idProduit)
  .then(function (res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then((jsonArticle) => {
    let article = new Article(jsonArticle);

    // Mise en forme html du sélecteur de couleurs
    let select = "<select id='couleur'>";
    article.colors.forEach((item, i) => {
      select += "<option>" + item + "</option>";
    });
    select += "</select>";
    document.querySelector(".container1").innerHTML += `<article>
                                                                    <a href="#"><img src="${article.imageUrl}" alt="ourson" class="ourson"></a>
                                                                    
                                                                        <span class="section2--infobear__p2">
                                                                              <h4 class="section2--infobear__nom__p2">${article.name}</h4>
                                                                              <p class="section2--description">${article.description}</p>
                                                                            <p class="section2--infobear__prix__p2">${article.price / 100 + "€"}</p>                                                                       
                                                                            </br>${select}</br>
                                                                            <label for="quantite_produit">choisir la quantité</label>
                                                                                <select name="quantite_produit" id="quantite_produit"></select>
                                                                                <br>
                                                                                <br>
                                                                                <button id="btnProduct" class="add-to-prod" '><span> Commander </span></button></br>                                                                                             
                                                                            
                                                                              
                                                                        
                                                                        </span>           
                                                        </article>`;

    //Choisir la quantité de produit possible
    const structureQuantité = `
                              <option value= "1">1</option>
                              <option value= "2">2</option>
                              <option value= "3">3</option>
                              <option value= "4">4</option>
                              <option value= "5">5</option>
                              `;

    //Afficher les quantités dans le formulaire
    const positionElementQuantite = document.getElementById("quantite_produit");

    positionElementQuantite.innerHTML = structureQuantité;

    //Enregistrement dans le LocalStorage des données du panier, compilation des données ID color price
    document.querySelector("#btnProduct").addEventListener("click", (e) => {
      e.preventDefault();
      const choixQuantite = positionElementQuantite.value;

      let couleur = document.getElementById("couleur").value;

      const product = {
        //Données du panier
        id: article._id,
        name: article.name,
        color: couleur,
        price: article.price * choixQuantite,

        quantites: choixQuantite,
      };

      //Stockage de la commande

      let panier = JSON.parse(localStorage.getItem("panier")) ?? [];

      //?? = diminutif d'un if/else : si il n'y a pas de produit enregistré, creation d'un array

      //JSONPARSE pour convertir les donnés  qui sont au format JSON dans le localstorage en objet javascript.

      let condition = true;
      for (produit of panier) {
        if (product.name === produit.name && product.color === produit.color) {
          produit.quantites = parseInt(produit.quantites) + parseInt(choixQuantite);

          condition = false;
        }
      }

      if (condition) {
        panier.push(product);
      }

      //Stringify : transformer format javascript en format JSON
      window.localStorage.setItem("panier", JSON.stringify(panier));

      alert("L'article a bien été ajouté à votre panier");

      //Redirige vers le panier
      window.location = "panier.html";
    });

    request.send();
  })
  .catch(function (err) {});
