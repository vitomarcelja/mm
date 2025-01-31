<template>
  <div>
    <!-- Div za Leaflet kartu -->
    <div id="map"></div>

    <!-- Quasar stranica -->
    <q-page padding>
      <!-- Naslov -->
      <div class="text-h5 text-weight-bolder text-center">
        Pronađite nas na adresi
      </div>
      <!-- Kartica s opisom -->
      <q-card>
        <q-card-section class="text-h2 text-justify">
          {{ o_nama }}
        </q-card-section>
      </q-card>
    </q-page>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import * as L from 'leaflet';
import "leaflet/dist/leaflet.css";

export default {
  setup() {
    // Varijabla za kartu
    const initialMap = ref(null);
    // Varijabla za tekst
    const o_nama = ref('Masarykova 4, 10000, Zagreb');

    // Inicijalizacija Leaflet karte
    onMounted(() => {
      initialMap.value = L.map('map').setView([45.8150, 15.9780], 13); // Zagreb koordinate

      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy;<a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      }).addTo(initialMap.value);

      // Dodavanje markera za lokaciju naše poslovnice
      L.marker([45.811153346408794, 15.974028359413328]).addTo(initialMap.value)
        .bindPopup("<b>MindMeal poslovnica</b><br>Dođite i posjetite nas!")
        .openPopup();
    });

    return {
      initialMap,
      o_nama
    };
  }
};
</script>

<style scoped>
#map {
  width: 100%;
  height: 400px;
  position: relative;
  border-radius: 10px;
  margin-bottom: 20px;
}

@media (max-width: 768px) {
  #map {
    height: 300px;
  }
  .text-h5 {
    font-size: 1.5rem;
  }
  .text-h2 {
    font-size: 1.2rem;
  }
}
</style>


