<template>
  <header class="sticky top-0 bg-weather-primary shadow-lg">
    <nav
      class="container flex flex-col sm:flex-row items-center gap-4 text-white py-6"
    >
      <RouterLink :to="{ name: 'home' }">
        <div class="flex items-center gap-3">
          <i class="fas fa-cloud-sun-rain text-4xl"></i>
          <p class="text-2xl">The Local Weather</p>
        </div>
      </RouterLink>

      <div class="flex gap-3 flex-1 justify-end items-center">
        <i
          @click="toggleModal"
          class="fa-solid fa-circle-info text-xl hover:text-weather-secondary duration-150 cursor-pointer"
        ></i>
        <i
          class="fa-solid fa-plus hover:text-weather-secondary duration-150 cursor-pointer"
          @click="addCity"
        ></i>

        <BaseModal :modalActive="modalActive" @close-modal="toggleModal">
          <div class="text-black">
            <h1 class="text-2xl mb-1">About</h1>

            <p class="mb-4">
              This is a simple weather app that uses the OpenWeatherMap API to
              display the current weather for a given location.
            </p>

            <h2 class="text-2xl">How it works:</h2>
            <ol class="list-decimal list-inside mb-4">
              <li>Enter a location in the search bar</li>
              <li>Click the search button</li>
              <li>Click the location in the list</li>
            </ol>

            <h2 class="text-2xl">Removing a City:</h2>
            <p class="mb-4">
              If you no longer wish to track a city, simply select the city
              within the home page, and click the "Remove" button.
            </p>
          </div>
        </BaseModal>
      </div>
    </nav>
  </header>
</template>

<script setup>
import { ref } from "vue";
import { uid } from "uid";
import { RouterLink, useRoute, useRouter } from "vue-router";
import BaseModal from "./BaseModal.vue";

const savedCities = ref([]);
const route = useRoute();
const router = useRouter();

const addCity = () => {
  if (localStorage.getItem("savedCities")) {
    savedCities.value = JSON.parse(localStorage.getItem("savedCities"));
  }

  const locationObj = {
    id: uid(),
    state: route.params.state,
    city: route.params.city,
    coords: {
      lat: route.query.lat,
      lon: route.query.lon,
    },
  };

  savedCities.value.push(locationObj);
  localStorage.setItem("savedCities", JSON.stringify(savedCities.value));

  let query = Object.assign({}, route.query);
  delete query.preview;
  query.id = locationObj.id;
  router.replace({ query });
};

const modalActive = ref(null);
const toggleModal = () => {
  modalActive.value = !modalActive.value;
};
</script>
