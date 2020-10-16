<template>
  <div class="org-profile">
    <h3>Organization Name:{{ orgProfile.name }}</h3>
    <h5><b>Location</b></h5>
    <br />
    <p>State: {{ orgProfile.orglocation.state }}</p>
    <p>City: {{ orgProfile.orglocation.city }}</p>
    <p>Zipcode: {{ orgProfile.orglocation.zip }}</p>
    <p>Street: {{ orgProfile.orglocation.street }}</p>
    <h5><b>Contact Information</b></h5>
    <br />
    <p>Email: {{ orgProfile.contact.email }}</p>
    <p>Phone Number: {{ orgProfile.contact.phone }}</p>
    <h5><b>Description:</b></h5>
    <br />
    <p>{{ orgProfile.description }}</p>
  </div>
</template>

<script>
export default {
  name: "organization-component",
  props: [],
  data() {
    return {};
  },
  computed: {
    profile() {
      return this.$store.state.profile;
    },
    methods: {},
  },
};
</script>

<style>
/* .org-profile {
} */
</style>
