<template>
  <q-page class="flex flex-center bg-dark-green">
    <div class="q-pa-md text-left" style="width: 100%; max-width: 400px;">
      <h1 class="text-white text-normal text-center">Login</h1>
      <div class="row q-mt-lg justify-center">
        <q-card class="bg-light-green text-dark" style="width: 100%">
          <q-card-section>
            <h3 class="text-dark text-center">Prijavite se:</h3>
            <q-input
              outlined
              filled
              v-model="ID_korisnika"
              label="ID"
              class="q-mt-md bg-input-green"
            />
            <q-input
              outlined
              filled
              v-model="Lozinka_korisnika"
              label="Lozinka"
              type="password"
              class="q-mt-md bg-input-green"
            />
            <q-btn
              color="primary"
              label="Prijava"
              class="q-mt-md full-width"
              @click="loginUser"
            />
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      ID_korisnika: '',
      Lozinka_korisnika: ''
    };
  },
  methods: {
    async loginUser() {
      if (this.ID_korisnika && this.Lozinka_korisnika) {
        try {
          const response = await axios.get('http://localhost:3000/api/login', {
            params: {
              ID_korisnika: this.ID_korisnika,
              Lozinka_korisnika: this.Lozinka_korisnika
            }
          });

          if (response.data.success) {
            alert(response.data.message);

            if (response.data.role === 'admin') {
              this.$router.push('/admin');
            } else {
              this.$router.push('/');
            }
          } else {
            alert('Neispravan ID ili lozinka.');
          }
        } catch (error) {
          console.error('Greška prilikom prijave:', error);
          alert(error.response ? error.response.data.error : 'Došlo je do greške pri prijavi.');
        }
      } else {
        alert('Molimo unesite ispravan ID i lozinku.');
      }
    }
  }
};
</script>

<style scoped>
.bg-dark-green {
  background-color: #2e8b57;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  padding: 20px;
}
.bg-light-green {
  background-color: #a9d18e;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
.bg-input-green {
  background-color: #eaf4dc;
}
.text-dark {
  color: #2e3d2f;
}
.text-white {
  color: white;
}
.text-normal {
  font-weight: normal;
}
@media (max-width: 768px) {
  .q-pa-md {
    width: 90%;
    max-width: 350px;
  }
  h1 {
    font-size: 2rem;
  }
  h3 {
    font-size: 1.5rem;
  }
}
</style>
