<template>
  <div class="swipe-card-component col-10">
    <div
      class="card m-2 d-flex"
      v-bind:style="{
        backgroundColor: 'black',
        backgroundImage: 'url(' + this.activeAnimal.photos[0].full + ')',
        backgroundSize: 'contain',
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
        height: '56vh',
      }"
    >
      <div
        class="card-body d-flex align-items-end"
        v-bind:style="{
          color: 'Linen',
          fontSize: '18pt',
          textShadow: '1px 1px black',
        }"
      >
        {{ this.activeAnimal.name }}, {{ this.activeAnimal.age }}
        <br />
        {{ this.activeAnimal.gender }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "swipe-card-component",
  props: {
    animalProp: {},
  },
  mounted() {},
  data() {
    return {};
  },
  computed: {
    animals() {
      return this.$store.state.animals;
    },
    activeAnimal() {
      return this.$store.state.animals[0];
    },
  },
  methods: {},
  components: {},
};
</script>

<style scoped>
.fixed {
  position: fixed;
}
.card {
  width: 300px;
  height: 400px;
  color: white;
}
</style>
