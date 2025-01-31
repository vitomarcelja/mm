<template>
  <q-page>
    <h1 class="title">Popularno</h1>

    <p class="description">
      Ovo su najpopularniji planovi prehrane među našim korisnicima. Pokazali su najbolje rezultate i zadovoljstvo naših klijenata.
    </p>

    <div class="image-container">
      <div v-for="(plan, index) in mealPlans" :key="index" class="meal-card">
        <img :src="plan.image" :alt="plan.title" class="meal-image" />
        <h2 class="meal-title">{{ plan.title }}</h2>
      </div>
    </div>
  </q-page>
</template>

<script setup>
defineOptions({
  name: "IndexPage",
});

const mealPlans = [
  {
    title: "Keto Meal Plan",
    image:
      "https://www.ketodietyum.com/wp-content/uploads/2019/03/19-Day-Keto-Diet-Meal-Plan-2023-01.jpg",
  },
  {
    title: "Mediterranean Meal Plan",
    image:
      "https://yummywholefoodrecipes.com/wp-content/uploads/2023/06/7-Day-Mediterranean-Dieat-Meal-Plan.png",
  },
  {
    title: "Paleo Meal Plan",
    image:
      "https://nutriadmin.com/blog/wp-content/uploads/2024/05/paleo-food-list-683x1024.png",
  },
  {
    title: "Vegan Meal Plan",
    image:
      "https://i.pinimg.com/736x/0d/c4/c5/0dc4c5e830c9cb1247b95e2f525d7c95.jpg",
  },
];
</script>

<style scoped>
.title {
  margin-top: 20px;
  margin-left: 20px;
  font-size: 24px;
  font-weight: bold;
  font-family: "Century Gothic", Arial, sans-serif;
  user-select: none;
}

.description {
  margin: 20px;
  font-size: 20px;
  font-weight: bold;
  font-family: "Century Gothic", Arial, sans-serif;
  user-select: none;
}

.image-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 50px;
  margin-top: 10px;
  padding: 10px;
}

.meal-card {
  text-align: center;
  max-width: 250px;
}

.meal-image {
  width: 100%;
  max-width: 200px;
  height: auto;
  border: 5px solid #4caf50;
  border-radius: 10px;
  padding: 5px;
}

.meal-title {
  font-size: 16px;
  font-family: "Century Gothic", Arial, sans-serif;
  font-weight: bold;
  margin-top: 5px;
  user-select: none;
}

@media (max-width: 768px) {
  .title {
    font-size: 20px;
    text-align: center;
  }
  .description {
    font-size: 16px;
    text-align: center;
    margin: 10px;
  }
  .image-container {
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
  }

.meal-card {
  width: 40%;
}

  .meal-image {
    max-width: 100%;
  }
}
</style>
