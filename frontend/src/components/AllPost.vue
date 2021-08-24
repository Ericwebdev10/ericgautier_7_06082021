<template>
  <div class="mx-auto">

    <div :id="art.id" v-for="(art,idx) in arts" :key="idx">

      <div class="card card-product mx-auto">

        <div class="card-body product-body">
          <h2 class="card-title name">{{ art.title }}</h2>
          <div class="dropdown-divider"></div>
          <p class="card-text price">{{ art.content}}</p>
          <div>
            <img class="card-img-top product-img" :alt="art.id" :src="art.image" v-if="art.image != 0" />
          </div>
          <div class="dropdown-divider"></div>
          <ul class="navbar-nav mt-2 mt-lg-0 flex-row">
            <li class="nav-item active userinfo">
              <p>Posted by <span> {{art.username}}</span> </p>
            </li>
            <li class="nav-item">
              <span class=""> {{ datePost(art.dateCreate)}} </span>
            </li>
          </ul>
          <router-link class="btn btn-danger name mt-5 text-center d-block " :to="`/post/${art.id}`">Comment</router-link>
        </div>
      </div>

      <div class="dropdown-divider"></div>
    </div>
  </div>

</template>
<script>

