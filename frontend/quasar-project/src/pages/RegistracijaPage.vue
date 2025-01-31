<template>
  <q-page>
    <h1>Registracija</h1>
    <q-input filled v-model="ime" label="Ime" />
    <q-input filled v-model="prezime" label="Prezime" />
    <q-input filled v-model="email" label="Email" />
    <q-input filled v-model="lozinka" label="Lozinka" type="password" />
    <q-input filled v-model="adresa" label="Adresa"/>
    <q-input filled v-model="telefon" label="Telefon" />
    <q-btn color="primary" label="Potvrdi" @click="registerUser" />
  </q-page>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      ime: '',
      prezime: '',
      email: '',
      lozinka: '',
      adresa: '',
      telefon: ''
    };
  },
  methods: {
    async registerUser() {
      if (this.ime && this.prezime && this.email && this.lozinka && this.adresa && this.telefon) {
        try {
          const response = await axios.post('http://localhost:3000/api/Korisnik', {
            Ime_korisnika: this.ime,
            Prezime_korisnika: this.prezime,
            Email_korisnika: this.email,
            Lozinka_korisnika: this.lozinka,
            Adresa_korisnika: this.adresa,
            Kontakt_korisnika: this.telefon
          });

          alert(response.data.message);
          // Optionally redirect user after success
        } catch (error) {
          alert(error.response.data.error || 'Došlo je do greške pri registraciji.');
        }
      } else {
        alert('Molimo ispunite sva polja.');
      }
    },
  },
};
</script>

<style scoped>
/* Osigurajte da stranica bude responzivna za mobilne uređaje */
.q-page {
  padding: 16px;
}

/* Prilagodba za mobilne uređaje */
@media (max-width: 600px) {
  /* Povećanje fonta za naslove na manjim ekranima */
  h1 {
    font-size: 1.5rem;
    text-align: center;
  }

  /* Smanjivanje fonta naslova 'Registracija' na mobilnim uređajima */
  h1 {
    font-size: 1.70rem; /* Manji font na mobilnim uređajima */
  }

  /* Smještaj inputa u manji razmak i veću širinu na mobilnim uređajima */
  .q-input {
    font-size: 1rem;
    margin-bottom: 12px;
  }

  /* Povećanje veličine dugmadi na mobilnim uređajima */
  .q-btn {
    font-size: 1rem;
    width: 100%; /* Dugme zauzima cijelu širinu na manjim ekranima */
  }
}

/* Osiguranje da inputi nisu previše komprimirani na manjim ekranima */
.q-input {
  width: 100%;
  margin-bottom: 16px;
}

/* Dodavanje margina za cijelu stranicu */
.q-page {
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* Osiguranje da dugme bude centrirano */
.q-btn {
  width: auto;
  margin-top: 16px;
}
</style>

