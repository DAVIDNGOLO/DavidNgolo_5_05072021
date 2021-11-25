//Recuperation de l'id de la commande

const orderId = localStorage.getItem('orderId');





//Recuperation total commande

const prixTotal = localStorage.getItem("prixTotalCalcul");



//Structure html de la page confirmation


//Selection element du dom pour le positionnement
const positionConfirmation = document.querySelector("#section2--listeproduits__p2");

const structureConfirmationCommande = `
                                        <h3>
                                                    Oribears vous remercie de votre commande !
                                                </h3>

                                                <article>
                                                    <br>
                                                    <br>
                                                    <br>

                                                    <p class="section2--confirmationcommande">
                                                        Nous avons le plaisir de vous informer<br> que votre commande a bien été enregistrée.

                                                    </p>
                                                    <p class="section2--confirmationcommande__ID">
                                                        Numero de commande : ${orderId}
                                                    </p>
                                                    <p class="section2--confirmationcommande__total">
                                                        Montant total : ${prixTotal/100 + "euros"} 
                                                        
                                                    </p>
                                                    
                                                </article>
                                        `;

//Injection HTML

positionConfirmation.insertAdjacentHTML("afterbegin" , structureConfirmationCommande);


//Effacer localstorage

function clearLocalStorage(key){
    localStorage.removeItem(key);
};

clearLocalStorage("OrderId");
clearLocalStorage("contact");
clearLocalStorage("panier");
clearLocalStorage("prixTotalCalcul");


