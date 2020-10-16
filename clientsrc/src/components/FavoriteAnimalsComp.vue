<template>
  <div class="container-fluid">
    <div class="row">
      <div
        class="fav-pets text-center justify-content-center col-12 card shadow-lg p-2"
      >
        <router-link
          class="text-primary"
          :to="{
            name: 'PetDetails',
            params: { id: favAnimalProp.animalId.id },
          }"
        >
          <p>
            {{ favAnimalProp.animalId.name }}
          </p>
          <img :src="favAnimalProp.animalId.photos[0].full" alt="pet" />
        </router-link>
        <br />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "favorite-animals-component",
  props: ["favAnimalProp"],
  data() {
    return {};
  },
  methods: {
    profile() {
      return this.$store.state.profile;
    },
  },
};
</script>

<style>
.fav-pets img {
  max-width: 35vh;
  max-height: 30vh;
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.61) 5px 5px 15px;
}
.fav-pets {
  margin: 5px;
  border-radius: 25px;
  background: #ffffffb0;
  box-shadow: 20px 20px 60px #9c9c9c, -20px -20px 60px #ffffff;
}
</style>
