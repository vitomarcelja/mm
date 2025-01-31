<template>
  <q-page>
    <h1>Popis svih planova prehrane</h1>

    <!-- Tabela za prikaz planova prehrane -->
    <q-table
      :rows="planovi"
      :columns="columns"
      row-key="sifraPlana"
      flat
      card-class="responsive-table"
    />

    <!-- Spinner dok se učitavaju podaci -->
    <q-spinner v-if="loading" color="blue" />
  </q-page>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      loading: false, // Za spinner dok se podaci učitavaju
      planovi: [], // Podaci o planovima koji će biti dohvaćeni iz API-ja
      columns: [
        { name: 'sifraPlana', label: 'Šifra plana', align: 'left', field: row => row.sifraPlana },
        { name: 'nazivPlana', label: 'Naziv plana', align: 'left', field: row => row.nazivPlana },
        { name: 'opisPlana', label: 'Opis plana', align: 'left', field: row => row.opisPlana },
        { name: 'cijena', label: 'Cijena (€)', align: 'center', field: row => `${row.cijena} €` },
      ],
    };
  },
  methods: {
    // Funkcija za dohvaćanje planova prehrane iz API-ja
    async fetchPlanovi() {
      this.loading = true; // Prikaz spinnera dok se podaci učitavaju
      try {
        const response = await axios.get("http://localhost:3000/api/planovi"); // API endpoint za dohvaćanje planova
        this.planovi = response.data; // Postavljanje podataka iz odgovora API-ja
      } catch (error) {
        console.error("Greška prilikom dohvaćanja planova prehrane:", error);
      } finally {
        this.loading = false; // Skrivanje spinnera
      }
    },

    // Funkcija za prijelaz na sljedeću stranicu
    goToNextPage() {
      this.$router.push("/next-page"); // Promijeni "/next-page" u odgovarajući put tvoje aplikacije
    },
  },
  mounted() {
    this.fetchPlanovi(); // Automatski dohvaća planove kad se komponenta učita
  },
};
</script>

<style scoped>
@media (max-width: 600px) {
  h1 {
    font-size: 1.5rem;
    text-align: center;
  }
  .responsive-table {
    overflow-x: auto;
    display: block;
  }
  .navigate-button {
    display: flex;
    justify-content: center;
    margin-top: 15px;
  }
}
</style>
