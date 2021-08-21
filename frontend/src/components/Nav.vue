<template>
  <div class="groupomaniaNavBar">
       <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
            <div class="container">
                <a class="navbar-brand" href="index.html"><img src="assets/logo.jpg" height="50" alt="Logo panier" /></a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation"><span class="navbar-toggler-icon"></span></button>
                <div class="collapse navbar-collapse" id="navbarResponsive">
                    <ul class="navbar-nav ml-auto">
                        <li class="nav-item active"><a class="nav-link" href="index.html">Accueil</a></li>
                        <li class="nav-item" id="itemsQtyInCart">
                            <a class="nav-link" href="shoppingcart.html">
                                Panier
                                <span class="sr-only">(current)</span>
                                <img src="assets/cart.jpg" height="20" alt="Logo panier" />
                            </a>
                        </li>
                        <li class="nav-item"><a class="nav-link disabled" href="ordersummary.html">Commande</a></li>
                    </ul>
                </div>
            </div>
        </nav>
    
    
  </div>
</template>

<script>
export default {
  name: 'Nav',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h1 {
  margin-top: -20px;
  color: #42b983;
}

</style>
