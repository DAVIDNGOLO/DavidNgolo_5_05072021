// recherche de l'id dans l'URL
let params = new URLSearchParams(document.location.search);
let idProduit = params.get("id");
console.log(idProduit);

//mise en forme des données
fetch("http://localhost:3000/api/teddies/" + idProduit)
  .then(function (res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then((jsonArticle) => {
    let article = new Article(jsonArticle);
    console.log(article.price);
    // mise en forme html du sélecteur de couleurs
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

    //afficher les quantités dans le formulaire
    const positionElementQuantite = document.getElementById("quantite_produit");
    console.log(positionElementQuantite);
    positionElementQuantite.innerHTML = structureQuantité;

    //enregistrement dans le LocalStorage des données du panier, compilation des données id color price
    document.querySelector("#btnProduct").addEventListener("click", (e) => {
      e.preventDefault();
      const choixQuantite = positionElementQuantite.value;
      console.log("choixQuantite");
      console.log(choixQuantite);
      let couleur = document.getElementById("couleur").value;
      console.log(couleur);
      const product = {
        //données du panier
        id: article._id,
        name: article.name,
        color: couleur,
        price: article.price * choixQuantite,

        quantites: choixQuantite,
      };
      console.log(product);

      //stockage de la commande avec un message d'alerte

      let panier = JSON.parse(localStorage.getItem("panier")) ?? [];

      //?? = diminutif d'un if/else : si il n'y a pas de produit enregistré, creation d'un array

      //JSONPARSE pour convertir les donnés  qui sont au format JSON dans le localstorage en objet javascript.
      console.log(product);
      let condition = true;
      for (produit of panier) {
        //console.log(product.name + product.color) ;
        //console.log(produit.name + produit.color);
        if (product.name === produit.name && product.color === produit.color) {
          console.log("true");
          produit.quantites = parseInt(produit.quantites) + parseInt(choixQuantite);
          console.log(produit.quantites);
          console.log(product);
          condition = false;
        }
      }
      console.log(product);
      if (condition) {
        panier.push(product);
      }

      //stringify : transformer format javascript en format JSON
      window.localStorage.setItem("panier", JSON.stringify(panier));

      alert("L'article a bien été ajouté à votre panier");

      //redirige vers le panier
      //window.location = "panier.html";
    });

    request.send();
  })
  .catch(function (err) {});
