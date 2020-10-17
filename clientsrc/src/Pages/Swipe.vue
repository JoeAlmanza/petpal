<template>
  <div class="swipe container-fluid" v-if="profile.id">
    <div class="row">
      <div
        class="col-12 d-flex justify-content-around align-items-center mt-4 mb-2"
      >
        <div class="text-left p-0">
          <img
            id="v-step-0"
            src="../assets/brokenheart.png"
            class="heartButton"
            @click="nextPet"
            alt=""
          />
        </div>

        <div class="text-left p-0">
          <img src="../assets/arrow.png" class="swipeArrow" alt="" />
        </div>

        <div class="text-left p-0">
          <img
            src="../assets/heart.png"
            class="heartButton"
            @click="likePet"
            alt=""
          />
        </div>
      </div>
      <div class="col-12">
        <div class="row align-items-center justify-content-center cardRow">
          <div v-if="this.activeAnimal">
            <Vue2InteractDraggable
              v-hammer:swipe.left.right="onSwipe"
              v-if="isVisible"
              :interact-out-of-sight-x-coordinate="330"
              :interact-max-rotation="15"
              :interact-lock-swipe-down="interactLockSwipeDown"
              :interact-lock-swipe-up="interactLockSwipeUp"
              @draggedRight="right"
              @draggedLeft="left"
            >
              <div class="col-10">
                <div
                  class="card m-2 d-flex"
                  v-bind:style="{
                    backgroundColor: '#0b4c55',
                    backgroundImage:
                      'url(' + this.activeAnimal.photos[0].full + ')',
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
                      textShadow: '2px 2px black',
                    }"
                  >
                    {{ this.activeAnimal.name }}
                    <br />
                    {{ this.activeAnimal.age }}, {{ this.activeAnimal.gender }}
                  </div>
                </div>
              </div>
            </Vue2InteractDraggable>
          </div>
          <div v-else>
            <div class="card bg-dark p-2 text-light">
              <div class="card-body">
                <h2>You've seen all the animals in your area!</h2>

                <h4>Click below for more information on your favorites!</h4>
                <router-link
                  class="text-light d-flex justify-content-center"
                  :to="{ name: 'Profile' }"
                >
                  <button class="btn btn-danger">
                    Profile
                    <i class="fa fa-paw fa-lg" aria-hidden="true"></i>
                  </button>
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <section v-else class="container-fluid swipe">
    <article class="row">
      <div
        class="col-12 d-flex justify-content-center flex-wrap align-content-center swipe"
      >
        <i class="paw-loading fa fa-paw fa-spin" aria-hidden="true"></i>
      </div>
    </article>
    <v-tour name="myTour" :steps="steps"></v-tour>
  </section>
</template>

<script>
// import SwipeCardComp from "../components/SwipeCardComp.vue";
import { Vue2InteractDraggable } from "vue2-interact";
import { onAuth } from "@bcwdev/auth0-vue";
import VueTour from "vue-tour";
import router from "../router";
export default {
  name: "Swipe",
  data() {
    return {
      isVisible: true,
      interactLockSwipeUp: true,
      interactLockSwipeDown: true,
      favAnimal: {},
      steps: [
        {
          target: "#v-step-0", // We're using document.querySelector() under the hood
          header: {
            title: "Get Started",
          },
          content: `Discover <strong>Vue Tour</strong>!`,
        },
        {
          target: ".v-step-1",
          content: "An awesome plugin made with Vue.js!",
        },
        {
          target: '[data-v-step="2"]',
          content:
            "Try it, you'll love it!<br>You can put HTML in the steps and completely customize the DOM to suit your needs.",
          params: {
            placement: "top", // Any valid Popper.js placement. See https://popper.js.org/popper-documentation.html#Popper.placements
          },
        },
      ],
    };
  },
  mounted() {
    this.$tours["myTour"].start();
    this.$store.dispatch("getProfile", {
      getPath: "profile",
      path: "profile/",
      resource: "profile",
    });
    console.log(profile);
    if (!this.$store.state.profile.completedQuiz) {
      router.push({ name: "Home" });
    }
    this.$store.dispatch("getResource", {
      path:
        "animals?contact.address.state=" +
        this.$store.state.profile.search.state +
        "&species=" +
        this.$store.state.profile.search.cat +
        "&speciees=" +
        this.$store.state.profile.search.dog,
      resource: "animals",
    });
    this.$store.dispatch(
      "getFavorites",
      this.$route.params.profile + "/favorites"
    );
  },

  computed: {
    activeAnimal() {
      return this.$store.state.activeAnimal;
    },
    animals() {
      return this.$store.state.animals;
    },
    profile() {
      return this.$store.state.profile;
    },
    favorites() {
      return this.$store.state.favorites;
    },
  },
  watch: {
    profile: function (userProfile) {
      if (userProfile.search.state) {
        this.$store.dispatch("getResource", {
          path: "animals?contact.address.state=" + userProfile.search.state,
          // +
          // "&species=" +
          // userProfile.search.cat +
          // "&species=" +
          // userProfile.search.dog,

          resource: "animals",
        });
      } else {
        router.push({ name: "Home" });
      }
    },
    animals: function (animals) {
      let newAnimals = this.animals;
      for (let a = 0; a < animals.length; a++) {
        for (let f = 0; f < this.favorites.length; f++) {
          let favorite = this.favorites[f];
          if (favorite.animalId.id == newAnimals[a].id) {
            newAnimals.splice(a, 1);
          }
        }
      }
      if (newAnimals[0].name) {
        this.$store.dispatch("setActive", newAnimals[0]);
      } else {
        console.error("this aint working");
      }
    },
  },
  methods: {
    nextPet() {
      let animals = this.$store.state.animals;
      let activeAnimal = this.$store.state.activeAnimal;
      if (activeAnimal == undefined) {
        activeAnimal = animals[0];
      }
      animals.shift();
      this.$store.dispatch("setActive", animals[0]);
    },

    likePet() {
      let activeAnimal = this.$store.state.activeAnimal;
      this.favAnimal.animalId = activeAnimal.id;
      this.$store.dispatch("addFavorite", {
        path: "profile/favorites",
        data: this.favAnimal,
        resource: "profile",
      });
      console.log("i like this pet");
      this.nextPet();
    },
    onSwipe(event) {
      console.log(event.type);
      if (event.type == "swipeleft") {
        this.nextPet();
      } else {
        this.likePet();
      }
    },
    right() {
      setTimeout(() => (this.isVisible = false), 100);
      setTimeout(() => {
        this.index++;
        this.isVisible = true;
      }, 200);
    },
    left() {
      setTimeout(() => (this.isVisible = false), 100);
      setTimeout(() => {
        this.index++;
        this.isVisible = true;
      }, 200);
    },
  },
  components: {
    // SwipeCardComp,
    Vue2InteractDraggable,
  },
};
</script>
<style scoped>
.card {
  width: 37vh;
}
.cardRow {
  height: 65vh;
}
.fixed {
  position: fixed;
}
.swipe {
  height: 80vh;
  overflow-y: scroll;
}
.paw-loading {
  font-size: 4rem;
}
.swipeArrow {
  max-width: 49vw;
}
.heartButton {
  max-height: 5vh;
}
.heartButton:active {
  transform: translateY(2px);
}
</style>
