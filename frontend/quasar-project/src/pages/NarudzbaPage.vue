<template>
  <q-page padding class="responsive-page">
    <!-- Naslov narudžbe s ikonom -->
    <div class="q-mb-md flex items-center justify-center">
      <div class="text-h5 text-center">Vaš odabrani plan prehrane</div>
    </div>

    <!-- Tablica narudžbi -->
    <q-table
      :rows="narudzbe"
      :columns="columns"
      row-key="ID_Kosarice"
      dense
      class="responsive-table"
    />

    <!-- FAB gumb za opcije korisnika -->
    <div class="q-pa-md flex justify-end">
      <q-fab
        v-model="fab"
        label="Opcije"
        color="blue"
        icon="menu"
        direction="up"
        size="sm"
        class="fab-mobile"
      >
        <!-- Akcija za dodavanje narudžbe -->
        <q-fab-action
          color="primary"
          @click="otvoriDodavanjeNarudzbe"
          icon="add"
          label="Dodaj novi plan"
        />
      </q-fab>
    </div>

    <!-- Sekcija za dodavanje narudžbe -->
    <q-card v-if="prikaziDodajNarudzbu" class="responsive-card">
      <q-card-section>
        <div class="text-h6">Dodavanje plana prehrane</div>
      </q-card-section>
      <q-card-section>
        <q-input v-model="novaNarudzba.nazivPlana" label="Naziv plana" dense />
        <q-input v-model="novaNarudzba.ID_korisnika" label="ID korisnika" dense />
        <q-input v-model="novaNarudzba.sifraPlana" label="ID plana" dense />
      </q-card-section>
      <q-card-actions align="right">
        <q-btn
          flat
          label="Odustani"
          color="primary"
          @click="prikaziDodajNarudzbu = false"
        />
        <q-btn flat label="Dodaj" color="primary" @click="dodajNarudzbu" />
      </q-card-actions>
    </q-card>
  </q-page>
</template>

<script>
import { ref, onMounted } from "vue";
import axios from "axios";

export default {
  name: "UpravljanjeNarudžbama",
  setup() {
    const narudzbe = ref([]);
    const columns = [
      { name: "ID_Kosarice", align: "left", label: "ID", field: "ID_Kosarice" },
      { name: "nazivPlana", align: "left", label: "Naziv plana", field: "nazivPlana" },
      { name: "ID_korisnika", align: "left", label: "ID korisnika", field: "ID_korisnika" },
      { name: "sifraPlana", align: "left", label: "ID plana", field: "sifraPlana" },
      { name: "datumPrimanja", align: "left", label: "Datum dodavanja", field: "datumPrimanja" },
      { name: "total", align: "left", label: "Iznos", field: "total" },
    ];

    const fab = ref(false);
    const prikaziDodajNarudzbu = ref(false);
    const novaNarudzba = ref({
      nazivPlana: "",
      ID_korisnika: "",
      sifraPlana: "",
      total: 0,
    });

    const fetchNarudzbe = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/narudzbe");
        narudzbe.value = response.data;
      } catch (error) {
        console.error("Greška prilikom dohvaćanja narudžbi:", error);
      }
    };

    const dodajNarudzbu = async () => {
      try {
        const response = await axios.post("http://localhost:3000/api/dodavanjenarudzbe", {
          nazivPlana: novaNarudzba.value.nazivPlana,
          ID_korisnika: novaNarudzba.value.ID_korisnika,
          sifraPlana: novaNarudzba.value.sifraPlana,
          total: novaNarudzba.value.total,
        });

        narudzbe.value.push({
          ID_Kosarice: response.data.narudzbaId,
          nazivPlana: novaNarudzba.value.nazivPlana,
          ID_korisnika: novaNarudzba.value.ID_korisnika,
          sifraPlana: novaNarudzba.value.sifraPlana,
          datumPrimanja: new Date().toISOString(),
          total: novaNarudzba.value.total,
        });

        novaNarudzba.value = {
          nazivPlana: "",
          ID_korisnika: "",
          sifraPlana: "",
          total: 0,
        };
        prikaziDodajNarudzbu.value = false;

        alert("Plan prehrane uspješno dodan!");
      } catch (error) {
        console.error("Greška prilikom dodavanja plana:", error);
        alert("Došlo je do greške prilikom dodavanja plana.");
      }
    };

    const otvoriDodavanjeNarudzbe = () => {
      prikaziDodajNarudzbu.value = true;
    };

    onMounted(() => {
      fetchNarudzbe();
    });

    return {
      narudzbe,
      columns,
      fab,
      prikaziDodajNarudzbu,
      novaNarudzba,
      dodajNarudzbu,
      otvoriDodavanjeNarudzbe,
    };
  },
};
</script>

<style scoped>
.responsive-page {
  max-width: 100%;
  overflow-x: hidden;
}

.responsive-table {
  max-width: 100%;
  overflow-x: auto;
}

.fab-mobile {
  position: fixed;
  bottom: 16px;
  right: 16px;
}

.responsive-card {
  max-width: 90%;
  margin: auto;
}

@media (max-width: 600px) {
  .text-h5 {
    font-size: 1.2rem;
  }
  .responsive-card {
    max-width: 100%;
  }
}
</style>
