
// recherche de l'id dans l'URL
let params = new URLSearchParams(document.location.search);
let idProduit = params.get("id");
console.log(idProduit);



//mise en forme des données
fetch("http://localhost:3000/api/teddies/" + idProduit)
.then(function(res) {
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
      
          document.querySelector(".container1").innerHTML += 
                                                        `<article>
                                                                    <a href="#"><img src="${article.imageUrl}" alt="ourson" class="ourson"></a>
                                                                    
                                                                        <span class="section2--infobear__p2">
                                                                              <h4 class="section2--infobear__nom__p2">${article.name}</h4>
                                                                              <p class="section2--description">${article.description}</p>
                                                                            <p class="section2--infobear__prix__p2">${article.price/100 + "€"}</p>                                                                       
                                                                            </br>${select}</br>
                                                                                <button id="btnProduct" class="add-to-prod" '><span> Commander </span></button></br>                                                                                             
                                                                            
                                                                            
                                                                        
                                                                        </span>           
                                                        </article>`;  
                                                       
//enregistrement dans le LocalStorage des données du panier, compilation des données id color price

document.querySelector('#btnProduct').addEventListener( "click", (e) => {
  e.preventDefault();
  console.log("bonjour")
  let couleur = document.getElementById('#couleur option:selected');
  const teddy = {
    //données du panier
    id: article._id,
    name: article.name,
    color: couleur,
    price: article.price 
  }
  //stockage de la commande avec un message d'alerte
  
  let panier = JSON.parse(localStorage.getItem('panier')) ?? [];
  panier.push(teddy);
  window.localStorage.setItem('panier', JSON.stringify(panier));
  alert("L'article a bien été ajouté à votre panier")
})



request.send();

  })
  .catch(function (err) {});
  



  






 
             
