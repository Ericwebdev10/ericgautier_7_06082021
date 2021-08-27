<template>
  <div class="footer">
    <footer>
      <ul>
        <li><i class="fas fa-address-card"></i>&nbsp; A propos</li>
        <li><i class="fas fa-hands-helping"></i> Devenir partenaire</li>
        <li><i class="fas fa-balance-scale"></i> Mentions légales</li>
        <li>
          <i class="fas fa-envelope"></i
          ><a href="mailto:contact@groupomania.com">&nbsp; Contact</a>
        </li>
      </ul>
    </footer>
  </div>
</template>
<script>
export default {
  name: "Footer",
};
</script>
<style scoped>
.footer {
  margin-top: 75px;
  background: #000000;
  padding-top: 3rem;
  padding-bottom: 3rem;
}

ul {
  display: flex;
  justify-content: space-around;
  list-style: none;
  font-size: 1.3em;
}
li {
  margin: auto 10px auto 10px;
  color: white;
}
</style>
