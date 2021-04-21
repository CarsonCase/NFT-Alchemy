<template>
<div>
        <v-container>
          <div
          class="py-4">
            <h1>My Lab</h1>
            <p>Here all the NFT elements you own will be listed. To own elements you must either mint them or purchase them from another person</p>
            <h3>{{this.$parent.address}}</h3>
          </div>
          <v-row>
            <v-col v-for="element in elements" :key="element._id"
            cols="6"
            >
              <ElmCard
                :element = "element"
                >
              </ElmCard>
            </v-col>
          </v-row>
        </v-container>


</div>

</template>

<script>
import { server } from "../../helper";
import axios from "axios";
import ElmCard from "./ElmCard"
export default {
    components:{
        ElmCard
    },
    data() {
        return{
            web3: window.web3,
            elements:[]
        }
    },
    created() {
      if(!this.$parent.isConnected){
        alert("Please connect you wallet to see your elements");
      }else{
        this.fetchElements();
      }
    },
    methods: {
        async fetchElements() {
            
            const balance = await this.$parent.contractInstance.methods.balanceOf(this.$parent.address).call();
            for (let i=0; i < balance; i++){
                const element_id = await this.$parent.contractInstance.methods.tokenOfOwnerByIndex(this.$parent.address, i).call();
                let hexString = this.web3.utils.toHex(element_id)
                let paddedHexString = this.web3.utils.padLeft(hexString,64);
                axios
                    .get(`${server.baseURL}/element/elements/${paddedHexString}`)
                    .then(data => this.elements.push(data.data.element));
            }
        }
        
    }
}

</script>