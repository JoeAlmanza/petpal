<template>
  <div class="profile container-fluid">
    <div class="col-12 text-center">
      <h3 class="m-2">
        <b> Welcome to PetPal {{ profile.name }}!</b>
      </h3>
    </div>
    <div class="col-12 profile-card card shadow-lg text-center">
      <h3>
        Profile Information
        <span data-toggle="modal" data-target="#editProfileModal"
          ><i class="fa fa-pencil text-warning" aria-hidden="true"></i
        ></span>
      </h3>
      <!-- NOTE Modal for editing profile info -->
      <div
        class="modal fade"
        id="editProfileModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content text-light">
            <div class="modal-header bg-primary">
              <h5 class="modal-title text-light" id="exampleModalLabel">
                Edit Profile Info
              </h5>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <form @submit.prevent="editProfile">
              <input
                class="form-control w-75 my-2 ml-5"
                type="text"
                placeholder="Your name... "
                v-model="profile.name"
                required
              />
              <input
                class="form-control w-75 my-2 ml-5"
                type="text"
                placeholder="City..."
                v-model="profile.search.city"
              />
              <input
                class="form-control w-75 my-2 ml-5"
                type="text"
                placeholder="State..."
                v-model="profile.search.state"
              />
              <input
                class="form-control w-75 my-2 ml-5"
                type="text"
                placeholder="Zipcode..."
                v-model="profile.search.zip"
              />
              <div class="form-row">
                <div class="col-4 d-flex justify-content-end">
                  <p class="text-dark">Show me...</p>
                </div>
                <div class="col-3">
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      v-model="profile.search.dog"
                      value="true"
                      id="dogCheck"
                    />
                    <label
                      class="form-check-label text-dark"
                      for="defaultCheck1"
                    >
                      Dogs
                    </label>
                  </div>
                </div>
                <div class="col-3">
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      v-model="profile.search.cat"
                      value=""
                      id="catCheck"
                    />
                    <label
                      class="form-check-label text-dark"
                      for="defaultCheck2"
                    >
                      Cats
                    </label>
                  </div>
                </div>
              </div>
              <div class="modal-footer justify-content-center">
                <button type="submit" class="btn btn-danger">Save</button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <!-- NOTE profile info card  -->
      <p>Name: {{ profile.name }}</p>
      <p>Email: {{ profile.email }}</p>
      <p v-if="profile.search.city">City: {{ profile.search.city }}</p>
      <p>State: {{ profile.search.state }}</p>
      <p v-if="profile.search.zipcode">Zip: {{ profile.search.zipcode }}</p>

      <p v-if="profile.search.cat == true">Looking For: Cat</p>
      <p v-if="profile.search.dog == true">Fooking For: Dog</p>
      <p v-if="profile.search.cat == false && profile.search.dog == false">
        No Animal Preference
      </p>
      <p v-if="profile.hasOrg == false">
        (Not affiliated with any organization)
      </p>
    </div>
    <br />
    <!-- NOTE Favorite animals card -->
    <div class="col-12 fav-pets-card text-center">
      <h3>Favorite Animals</h3>
      <br />
      <favorite-animals-comp
        v-for="favAnimal in favoriteAnimals"
        :key="favAnimal.animalId.id"
        :favAnimalProp="favAnimal"
      />
      <!-- NOTE injecting orgComp here // <OrganizationComp
      class="org-card text-center card"
      v-show="profile.hasOrg == true"-->
    </div>
  </div>
</template>

<script>
import OrganizationComp from "../components/OrganizationComp.vue";
import FavoriteAnimalsComp from "../components/FavoriteAnimalsComp.vue";
export default {
  name: "Profile",
  mounted() {
    this.$store.dispatch("getProfile", this.$route.params.profile);
    this.$store.dispatch(
      "getFavorites",
      this.$route.params.profile + "/favorites"
    );
  },
  data() {
    return {
      editToggle: true,
    };
  },
  computed: {
    profile() {
      return this.$store.state.profile;
    },
    favoriteAnimals() {
      return this.$store.state.favorites;
    },
  },
  methods: {
    editProfile() {
      if (this.profile.search.cat) {
        this.profile.search.cat = "Cat";
      }
      if (this.profile.search.dog) {
        this.profile.search.dog = "Dog";
      }
      this.$store.dispatch("edit", {
        getPath: "profile",
        path: "profile/" + this.profile.id,
        data: this.profile,
        resource: "profile",
      });
      $("#editProfileModal").hide();
      $(".modal-backdrop").hide();
    },
  },
  components: {
    OrganizationComp,
    FavoriteAnimalsComp,
  },
};
</script>

<style scoped>
.profile-card {
  margin-top: 3vh;
  width: 92vw;
  padding: 10px;
  border-radius: 25px;
  background: #ffffffee;
  box-shadow: 20px 20px 60px #9c9c9c, -20px -20px 60px #ffffff;
}
.fav-pets-card {
  margin-top: 3vh;
  width: 92vw;
  padding-top: 5px;
  border-radius: 25px;
}
.profile {
  height: 80vh;
  overflow-y: scroll;
  background-color: rgb(247, 244, 241);
}
</style>
