
fetch("http://localhost:3000/api/teddies/")
.then(function(res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then((jsonListArticle) => {
    for (let jsonArticle of jsonListArticle) {
      let article = new Article(jsonArticle);
      document.querySelector(".container").innerHTML += `<article class="section2--card">
                                                            <a href="produit.html?id=${article._id}">
                                                                <img src="${article.imageUrl}" alt="ourson" class="ourson" >
                                                            </a>
                                                            <span class="section2--infobear">
                                                                <h4 class="section2--infobear__nom">${article.name}</h4> &ensp;
                                                                &ensp;<p class="section2--infobear__prix__p2">${article.price/100 + "€"}</p>                                                                       
                                                                
                                                            </span>
                                                            
                                                        </article>`;
    }
  })
  .catch(function (err) {});
  
