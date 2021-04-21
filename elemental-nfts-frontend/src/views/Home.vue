<template>
    <div class="container-fluid">
      <div class="text-center">
       <div v-if="elements.length === 0">
            <h2> No Elements found at the moment </h2>
        </div>
      </div>

      <v-sheet
      color="grey lighten-3"
      >
        <v-container v-if="elements.length != 0">
          <h1 class="text-center py-4">Latest Elements</h1>
          <v-row>
            <v-col v-for="element in reversedElements" :key="element._id"
            cols="6"
            >
              <ElmCard
                :element = "element"
                >
              </ElmCard>
            </v-col>
          </v-row>
        </v-container>

      </v-sheet>

    </div>

</template>
<script>
import { server } from "../helper";
import axios from "axios";
import ElmCard from "../components/Element/ElmCard"

export default {
  components:{
    ElmCard
  },
  created() {
    this.fetchElements();
  },
  data() {
    return {
      elements: [],
      overlay: false
    };
  },
  methods: {
    fetchElements() {
      axios
        .get(`${server.baseURL}/element/elements`)
        .then(data => this.elements = data.data);
    }
  },
  computed:{
    reversedElements(){
      let elements = this.elements;
      return elements.reverse();
    }
  }
};
</script>