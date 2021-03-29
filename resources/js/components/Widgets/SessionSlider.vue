<!-- Session Slider -->
<template>
  <div>
    <app-section-loader :status="loader"></app-section-loader>
    <slick :options="slickOptions" v-if="testimonials">
      <template v-for="testimonial in testimonials">
        <div class="session-slider" :key="testimonial.id">
          <div class="slider-content">
            <img
              :src="appLogo"
              class="img-responsive mb-3"
              width="200px"
              height="78"
            />
            <div class="slider-meta mb-3">
              <span class="d-block client-name fw-bold">
                <!-- <i>{{testimonial.name}}</i> -->
              </span>
              <!-- <span class="d-block client-digg">{{testimonial.designation}}</span> -->
            </div>
            <p class="px-4">{{testimonials.body}}</p>
          </div>
        </div>
      </template>
    </slick>
  </div>
</template>
<script>
import Slick from "vue-slick";
import api from "Api";
import AppConfig from "Constants/AppConfig";
import Vue from 'vue'
import axios from 'axios'

export default {
  components: {
    Slick
  },
  mounted() {
    this.getTestimonials();
  },
  computed: {
    slickOptions() {
      return {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        arrows: false
      };
    }
  },
  data() {
    return {
      loader: true,
      testimonials: null,
      appLogo: AppConfig.appLogo3

    };
  },
  methods: {
    getTestimonials() {

        axios.get("reactify.theironnetwork.org/data/testimonials")
        .then(response => {
          this.loader = false;
          this.testimonials = (response);
          //console.log(this.testimonials)
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>
