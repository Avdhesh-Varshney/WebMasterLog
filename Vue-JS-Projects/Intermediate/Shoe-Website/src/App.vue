<template>
  <div id="app">
    <nav class="d-flex box mb-5 sticky-top">
      <b-nav pills class="d-flex justify-content-center align-items-center">
        <b-nav-item
          @click="
            categoryMen = true;
            categoryWomen = true;
          "
          >All Products</b-nav-item
        >
        <b-nav-item
          @click="
            categoryMen = false;
            categoryWomen = true;
          "
          class="pink"
          >Women</b-nav-item
        >
        <b-nav-item
          @click="
            categoryMen = true;
            categoryWomen = false;
          "
          class="blue"
          >Men</b-nav-item
        >
      </b-nav>
      <b-dropdown id="dropdown-dropright" dropright>
        <template #button-content>
          <span class="m-2 fas fa-shopping-bag"></span>
          <b-badge class="d-flex align-items-center justify-content-center">{{
            cartTotal
          }}</b-badge>
        </template>
        <div class="totalPrice" v-show="cart.length > 0">
          Total Price : ${{ totalPrice }}
        </div>
        <b-dropdown-item
          v-for="(item, index) in cart"
          :key="index"
          class="d-flex"
        >
          <div v-if="item.count > 0">
            <div class="d-flex mb-2 border">
              <span>
                <img
                  style="{height:10rem; width:10rem;}"
                  :src="item.image"
                  alt=""
                />
              </span>
              <div>
                <p>Size: {{ item.size }}</p>
                <p>Qty:{{ item.count }}</p>
                <p>Total Price: ${{ item.price * item.count }}</p>

                <b-button
                  class="mr-2"
                  v-if="item.count > 1"
                  @click.stop.prevent="item.count--"
                  variant="dark"
                  >-</b-button
                >
                <b-button
                  class="mr-2"
                  v-else-if="(item.count = 1)"
                  @click.stop.prevent="deleteItem(index)"
                  variant="dark"
                  >-</b-button
                >
                <b-button
                  class="mr-2"
                  @click.stop.prevent="item.count++"
                  variant="dark"
                  >+</b-button
                >
                <b-button
                  @click.stop.prevent="deleteItem(index)"
                  variant="danger"
                  >x</b-button
                >
              </div>
            </div>
          </div>
        </b-dropdown-item>

        <b-dropdown-item v-show="cart.length === 0">
          Oh No! Your Cart Is Empty :(
        </b-dropdown-item>
      </b-dropdown>
    </nav>
    <div>
      <b-alert
        class="alert-fixed"
        :show="dismissCountDown"
        dismissible
        fade
        variant="dark"
        @dismiss-count-down="countDownChanged"
      >
        Product Add
      </b-alert>
    </div>
    <div class="contain">
      <b-row
        class="d-flex align-items-center justify-content-center"
        id="shoe-box"
      >
        <ProductCard
          :product="product"
          v-for="product in filteredByCategory()"
          :key="product.title"
          class="col"
          @addToCart="addToCart"
        />
      </b-row>
    </div>
  </div>
</template>

<script>
import ProductCard from "./components/ProductCard.vue";

export default {
  name: "App",
  components: {
    ProductCard,
  },
  data() {
    return {
      productList: [
        {
          id: "1",
          title: "Zoom Freak 3",
          color: ["salmon", "black", "green"],
          summary:
            "Giannis is an athlete of freakish power and incredible range. His ability to play any position make him difficult to guard and nearly impossible to stop. The Zoom Freak 3 helps Giannis misdirecting Euro-step.",
          price: 140,
          images: [
            { img: require("@/assets/img/1.png"), color: "Darksalmon" },
            { img: require("@/assets/img/2.png"), color: "Black" },
            { img: require("@/assets/img/3.png"), color: "MediumTurquoise" },
          ],
          sizes: [
            { text: "6", value: "6" },
            { text: "7", value: "7" },
            { text: "8", value: "8" },
            { text: "9", value: "9" },
            { text: "10", value: "10" },
            { text: "11", value: "11" },
          ],
          selectedSize: { text: "6", value: "6" },
          category1: "Men",
          category2: "Basketball",
          rating: 4,
        },
        {
          id: "2",
          title: "Nike Air Force 1 Fontanka",
          color: ["pink", "yellow", "greenyellow"],
          summary:
            "The Born out of the ideas and art of post-Soviet Union Russia, the Nike Air Force 1 Fontanka lets a new wave of comfort and style take hold. Upping the ante with its lifted midsole and layered upper that features soft leather and intricate stitching.",
          price: 150,
          images: [
            { img: require("@/assets/img/4.png"), color: "pink" },
            { img: require("@/assets/img/5.png"), color: "gold" },
            { img: require("@/assets/img/6.png"), color: "#8d9458" },
          ],
          sizes: [
            { text: "6", value: "6" },
            { text: "7", value: "7" },
            { text: "8", value: "8" },
            { text: "9", value: "9" },
            { text: "10", value: "10" },
            { text: "11", value: "11" },
          ],
          selectedSize: { text: "6", value: "6" },
          category1: "Women",
          category2: "",
          rating: 5,
        },
        {
          id: "3",
          title: "Jordan Air Mae",
          color: "Blue",
          summary:
            "Future, fashion and flight intersect with the Jordan Air Mae, a shoe inspired by pioneering women. It's built on a thick-lugged outsole with plush foam and visible Nike Air cushioning.",
          price: 155,
          images: [
            { img: require("@/assets/img/11.png"), color: "indianred" },
            { img: require("@/assets/img/10.png"), color: "seagreen" },
            { img: require("@/assets/img/12.png"), color: "#827567" },
          ],
          sizes: [
            { text: "6", value: "6" },
            { text: "7", value: "7" },
            { text: "8", value: "8" },
            { text: "9", value: "9" },
            { text: "10", value: "10" },
            { text: "11", value: "11" },
          ],
          selectedSize: { text: "6", value: "6" },
          category1: "Women",
          category2: "",
          rating: 5,
        },
        {
          id: "4",
          title: "Nike Air Vapormax 2021 FK",
          color: "Pink",
          summary:
            "Made from at least 40% recycled materials by weight, the Nike Air VaporMax 2021 FK is airy and easy to wear with superstretchy, recycled Flyknit fabric (plus a soft collar that sculpts your ankle).",
          price: 145,
          images: [
            { img: require("@/assets/img/7.png"), color: "black" },
            { img: require("@/assets/img/8.png"), color: "skyblue" },
            { img: require("@/assets/img/9.png"), color: "slateblue" },
          ],
          sizes: [
            { text: "6", value: "6" },
            { text: "7", value: "7" },
            { text: "8", value: "8" },
            { text: "9", value: "9" },
            { text: "10", value: "10" },
            { text: "11", value: "11" },
          ],
          selectedSize: { text: "6", value: "6" },
          category1: "Men",
          category2: "",
          rating: 4,
        },
      ],
      catClass: {
        MEN: "blue",
        WOMEN: "pink",
      },
      cart: [],

      count: 0,
      dismissSecs: 3,
      dismissCountDown: 0,
      showDismissibleAlert: false,
      categoryMen: true,
      categoryWomen: true,
    };
  },
  methods: {
    addToCart(e) {
      let addedBefore = null;
      addedBefore = this.cart.find(
        (item) =>
          item.id == e.id && item.color == e.color && item.size == e.size
      );
      if (!addedBefore) {
        this.cart.push(e);
      } else {
        addedBefore.count += e.count;
      }
      this.dismissCountDown = this.dismissSecs;
    },
    deleteItem(i) {
      this.cart.splice(i, 1);
    },
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown;
    },
    filteredByCategory() {
      if (!this.categoryWomen) {
        return this.productList.filter((el) => el.category1 === "Men");
      } else if (!this.categoryMen) {
        return this.productList.filter((el) => el.category1 === "Women");
      } else if (this.categoryMen && this.categoryWomen) {
        return this.productList;
      }
    },
  },
  computed: {
    cartTotal() {
      let count = 0;
      for (let i = 0; i < this.cart.length; i++) {
        count += this.cart[i].count;
      }
      return count;
    },
    totalPrice() {
      if (this.cart.length === 0) {
        return 0;
      } else {
        return this.cart
          .map((item) => item.count * item.price)
          .reduce((a, b) => a + b);
      }
    },
  },
};
</script>

<style>
#app {
  font-family: "Noto Sans Mono", monospace;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100vh;
}

.nav-pills .nav-link.active,
.nav-pills .show > .nav-link {
  background-color: transparent;
  color: #111;
}

li.nav-item {
  width: 200px;
}

.nav-item.pink:hover .child {
  color: red;
  border-bottom: 1px solid #111;
}

/* .nav-link:hover {
  color: pink;
  border-bottom: 1px solid #111;
} */

.box {
  border-bottom: 0.2rem solid #2c3e50;
  margin-bottom: 2.5rem;
  margin: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #2c3e50;
  font-size: 2rem;
  font-weight: bold;
}

.fa-shopping-bag.badge {
  background-color: #111;
  color: #f6f6f6;
  font-size: 2rem;
}

.pink {
  color: pink;
}

.blue {
  color: blue;
}

* {
  background: #f6f6f6;
}

.contain {
  max-width: 96rem;
  margin-left: auto;
  margin-right: auto;
}
.btn {
  font-size: 1rem;
}

.btn .fa-shopping-bag {
  font-size: 3rem;
}

.btn-secondary {
  background: #f6f6f6;
  color: #2c3e50;
  border: none;
}

.btn.dropdown-toggle.btn-secondary:after {
  content: none;
}

.dropdown-item {
  font-size: 1rem;
}

.nav-link {
  color: #2c3e50;
}

.nav-item.pink > :hover {
  color: pink;
}

.nav-item.blue > :hover {
  color: blue;
}

#dropdown-dropright__BV_toggle_:hover {
  color: #2c3e50;
}

#dropdown-dropright__BV_toggle_ {
  color: #2c3e50;
}

.totalPrice {
  text-align: center;
  font-size: 1.2rem;
  font-weight: bold;
}
.alert-fixed {
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  z-index: 9999;
  border-radius: 0px;
  opacity: 75%;
}
</style>
