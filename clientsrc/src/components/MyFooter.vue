<template>
  <footer class="container-fluid fixed-bottom bg-dark footer">
    <div class="row">
      <div
        class="profile col-6 d-flex justify-content-center profile-link align-items-center"
      >
        <router-link class="text-light" :to="{ name: 'Profile' }">
          <i class="fa fa-user text-light fa-3x" aria-hidden="true"></i>
        </router-link>
      </div>
      <div
        class="swipe col-6 d-flex justify-content-center home-link align-items-center"
      >
        <router-link class="text-light" :to="{ name: 'Swipe' }">
          <img class="cardImg" src="../assets/cards.png" alt="" />
          <!-- <i class="fa fa-home text-light fa-3x" aria-hidden="true"></i> -->
        </router-link>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "MyFooter",
};
</script>

<style scoped>
.footer {
  height: 10vh;
}
.profile {
  height: 10vh;
}
.swipe {
  height: 10vh;
}
.cardImg {
  max-height: 7vh;
  color: white;
}
</style>
