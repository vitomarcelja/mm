<template>
  <q-page padding class="row justify-center">
    <q-card dark bordered class="bg-grey-9 my-card q-pa-md">
      <q-card-section class="text-center">
        <img alt="Logo" src="" class="logo">
        <div class="text-h5 text-weight-bolder q-mt-md">O nama</div>
      </q-card-section>
      <q-card-section class="text-body1 text-justify">
        {{ o_nama }}
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
export default {
  setup() {
    return {
      o_nama: 'MindMeal je aplikacija koja pomaže korisnicima pri prehrani. Korisnici mogu komunicirati sa stručnjacima i dobiti stručno mišljenje i pomoć.'
    };
  }
};
</script>

<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 500px

.logo
  width: 80%
  max-width: 200px
  height: auto
  display: block
  margin: 0 auto
</style>
