//recuperation de l'id de la commande

const orderId = localStorage.getItem('orderId');
console.log(orderId);




//recuperation total commande

const prixTotal = localStorage.getItem("prixTotalCalcul");
console.log(`prixTotalCalcul : ${prixTotal}`);


//structure html de la page confirmation


//selection element du dom pour le positionnement
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

//injection HTML

positionConfirmation.insertAdjacentHTML("afterbegin" , structureConfirmationCommande);


//effacer localstorage

function clearLocalStorage(key){
    localStorage.removeItem(key);
};

clearLocalStorage("OrderId");
clearLocalStorage("contact");
clearLocalStorage("panier");
clearLocalStorage("prixTotalCalcul");


