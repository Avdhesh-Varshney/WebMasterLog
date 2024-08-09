<template>
  <div
    class="container"
    :style="{ borderColor: selectedImg.color, border: '3px solid' }"
  >
    <div class="col-md-6 card-item" :style="{ color: selectedImg.color }">
      <img
        class="card-item"
        :src="selectedImg.img"
        :alt="product.title"
        :img-alt="product.title"
      />
      <div class="d-flex align-items-center justify-content-center mb-2">
        <div
          class="radio-img mr-4"
          v-for="(item, index) in product.images"
          :key="index"
        >
          <input
            v-model="selectedImg"
            type="radio"
            :id="'image-' + product.id + '-' + index"
            :name="product.id + '-image'"
            :value="item"
          />
          <label
            class="d-flex align-items-center justify-content-center"
            :for="'image-' + product.id + '-' + index"
          >
            <img class="thumbnail" :src="item.img" alt="Shoes Image" />
          </label>
        </div>
      </div>
      <div class="d-flex font-weight-bold card-item justify-content-center">
        Choose Your Size
      </div>
      <b-row>
        <b-col col-8>
          <b-form-group
            v-slot="{ ariaDescribedby }"
            class="d-flex align-items-center justify-content-center"
          >
            <b-form-radio
              ref="sizeRadios"
              button
              button-variant="none"
              class="radio-button"
              v-for="(size, index) in product.sizes"
              :key="index"
              v-model="selectedSize"
              :aria-describedby="ariaDescribedby"
              name="size-radios"
              :value="size"
              :style="{ borderColor: selectedImg.color }"
            >
              <span class="size-radio">
                {{ size.value }}
              </span>
            </b-form-radio>
          </b-form-group>
        </b-col>
      </b-row>

      <!-- <div class="mt-3">
        Selected: <strong>{{ selectedSize.value }}</strong>
      </div> -->
    </div>
    <div class="desc col-6">
      <h4 class="card-item">
        {{ product.category1 }}'s {{ product.category2 }} Shoes
      </h4>
      <h3 class="card-item">{{ product.title }}</h3>
      <h3 class="card-item">${{ calcShoePrice }}</h3>
      <h4 class="card-item">In Stock</h4>
      <div>
        <div class="rating card-item">
          <span
            v-for="(item, i) in product.rating"
            class="fa fa-star checked"
            :key="i"
          />
          <span
            v-for="(item, i) in 5 - product.rating"
            class="fa fa-star"
            :key="'star' - i"
          />
        </div>

        <div class="cta card-item d-flex">
          <select
            class="rounded justify-content-center"
            v-model="itemQty"
            name="item-number"
            id="item-number"
          >
            <option v-for="(i, index) in 10" :value="i" :key="index">{{
              i
            }}</option>
          </select>
          <button
            :class="[{ disabledButton: !stockCount }, 'cta-btn']"
            @click="addToCart(product)"
            :disabled="!stockCount"
          >
            <b-badge :class="[{ disabledButton: !stockCount }]" variant="light"
              >Add To Cart</b-badge
            >
          </button>
        </div>
        <h6 class="card-item">{{ product.summary }}</h6>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProductCard",
  props: ["product"],
  data() {
    return {
      selectedSize: { text: "6", value: "6" },
      selectedImg: {
        color: this.product.images[0].color,
        img: this.product.images[0].img,
      },
      itemQty: 1,
      stockCount: 10,
    };
  },
  methods: {
    addToCart() {
      this.$emit("addToCart", {
        id: this.product.id,
        image: this.selectedImg.img,
        size: this.selectedSize.value,
        price: this.calcShoePrice,
        color: this.selectedImg.color,
        count: this.itemQty,
        stockCount: this.stockCount,
      });
    },
  },
  computed: {
    calcShoePrice() {
      return (
        (this.product.price * (this.selectedSize.value - 2)) / 15 +
        75
      ).toFixed(0);
    },
  },
};
</script>

<style scoped>
* {
  background: #f6f6f6;
}

.disabledButton {
  background-color: gray !important;
  text-decoration-line: line-through;
}

h1 {
  margin: 5px;
}

img {
  width: 316.99px;
  height: 316.99px;
  overflow: hidden;
}

.container {
  border: 2px solid black;
  border-radius: 1rem;
  box-shadow: 0px 0px 8px 8px #686565;
  height: 34rem;
  display: flex;
  margin: 0 3rem 6rem 3rem;
  max-width: 1000px;
}

.size-select {
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  overflow: visible;
}
.shoe-size {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  border: 0.15rem solid;
  color: #2c3e50;
  font-weight: 800;
  font-size: 1.5rem;
}

.shoe-size:hover {
  cursor: pointer;
}

.cta-btn {
  width: 100%;
  height: 3em;
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
  border: 5px solid #2c3e50;
  border-radius: 1rem;
}
.desc {
  text-align: start;
  align-items: start;
  margin-left: 1rem;
  margin-top: 1rem;
  overflow: hidden;
}

.fa-star {
  color: #d8cccc;
}

.checked {
  color: #2c3e50;
}
.container {
  background: #f6f6f6;
  min-width: 685px;
}

.rating {
  font-size: 1.2rem;
}

.card-item {
  margin-bottom: 1rem;
}

.thumbnail {
  width: 5rem;
  height: 5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid;
  border-radius: 20%;
}

.sizes {
  width: 0.5rem;
  height: 0.5rem;
}
.radio-button {
  border: 1px solid #2c3e50;
  border-radius: 1rem;
  display: flex;
  align-items: center;
  outline: none;
}

input[type="radio"] {
  display: none;
  outline: none;
}
</style>
