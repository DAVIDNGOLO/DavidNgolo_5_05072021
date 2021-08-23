// création du panier sous forme de tableau
var panier = [];
$(function() {
  panier = JSON.parse(localStorage.getItem('panier')) ?? [];
  showCart();
});
