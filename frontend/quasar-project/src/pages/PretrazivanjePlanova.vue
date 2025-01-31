<template>
  <q-page padding class="responsive-container">
    <q-card>
      <q-card-section>
        <div class="text-h4 title">Pretraži planove prehrane</div>
      </q-card-section>

      <q-card-section>
        <!-- Input polje za pretragu -->
        <q-input
          v-model="searchQuery"
          label="Unesite pojam za pretragu"
          outlined
          clearable
          class="full-width"
        />

        <!-- Checkbox za odabir pretrage po kategoriji ili nazivu -->
        <div class="q-mt-md checkbox-container">
          <q-checkbox v-model="searchByCategory" label="Pretraži po opisu plana" />
          <q-checkbox v-model="searchByName" label="Pretraži po nazivu plana" />
        </div>

        <!-- Gumb za pretragu -->
        <q-btn
          label="Traži"
          color="green"
          class="q-mt-md full-width"
          @click="searchPlans"
        />
      </q-card-section>

      <!-- Tabela za prikaz rezultata pretrage -->
      <q-card-section v-if="filteredPlans.length > 0">
        <q-table
          :rows="filteredPlans"
          :columns="columns"
          row-key="sifraPlana"
          class="responsive-table"
        />
      </q-card-section>

      <!-- Poruka kada nema rezultata pretrage -->
      <q-card-section v-else-if="searchQuery && filteredPlans.length === 0">
        <div class="text-subtitle1 text-center q-mt-md">
          Nema rezultata pretrage.
        </div>
      </q-card-section>

      <!-- Poruka kada nije uneseno ništa u pretragu -->
      <q-card-section v-if="!searchQuery">
        <div class="text-subtitle1 text-center q-mt-md">
          Unesite pojam za pretragu ili prilagodite kriterije.
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import axios from "axios";
import { ref, onMounted } from "vue";

export default {
  setup() {
    const searchQuery = ref("");
    const searchByCategory = ref(false);
    const searchByName = ref(false);
    const allPlans = ref([]);
    const filteredPlans = ref([]);
    const loading = ref(false);

    const columns = [
      { name: "sifraPlana", label: "Šifra plana", align: "left", field: "sifraPlana" },
      { name: "nazivPlana", label: "Naziv plana", align: "left", field: "nazivPlana" },
      { name: "opisPlana", label: "Opis plana", align: "left", field: "opisPlana" },
      { name: "cijena", label: "Cijena", align: "center", field: "cijena" },
    ];

    async function fetchPlans() {
      loading.value = true;
      try {
        const response = await axios.get("http://localhost:3000/api/planovi");
        allPlans.value = response.data;
        filteredPlans.value = allPlans.value;
      } catch (error) {
        console.error("Greška prilikom dohvaćanja planova:", error);
      } finally {
        loading.value = false;
      }
    }

    async function searchPlans() {
      try {
        const response = await axios.get("http://localhost:3000/api/planovi", {
          params: {
            searchQuery: searchQuery.value,
            searchByCategory: searchByCategory.value,
            searchByName: searchByName.value,
          },
        });
        filteredPlans.value = response.data;
      } catch (error) {
        console.error("Greška prilikom pretrage planova:", error);
      }
    }

    onMounted(() => {
      fetchPlans();
    });

    return {
      searchQuery,
      searchByCategory,
      searchByName,
      allPlans,
      filteredPlans,
      columns,
      loading,
      searchPlans,
    };
  },
};
</script>

<style scoped>
.responsive-container {
  max-width: 600px;
  margin: auto;
}

.title {
  font-size: 1.5rem;
  text-align: center;
}

.full-width {
  width: 100%;
}

.checkbox-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
}

.responsive-table {
  overflow-x: auto;
}

@media (max-width: 600px) {
  .title {
    font-size: 1.2rem;
  }

  .checkbox-container {
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly;
  }
}
</style>
