<template>
   <div>
        <div class="col-md-12 form-wrapper">
          <h2> Create Element </h2>
          <p>Current hash {{getHash()}}</p>
          <form id="create-post-form" @submit.prevent="createElement">
               <div class="form-group col-md-12">
                <label for="element1"> {{name1}} </label>
                <input type="text" id="elm1" v-model="element1" name="entry1" class="form-control" placeholder="Enter Element 1">
               </div>
             <div class="form-group col-md-12">
                <label for="element2"> {{name2}} </label>
                <input type="text" id="elm2" v-model="element2" name="entry2" class="form-control" placeholder="Enter Element 2">
            </div>
              <div class="form-group col-md-12">
                <label for="nonce"> Nonce </label>
                <input type="number" id="nonce" v-model="nonce" name="entry3" class="form-control" placeholder="Enter Nonce">
            </div>  
              <div class="form-group col-md-12">
                <label for="name"> Name </label>
              <input type="text" id="name" v-model="name" name="entry4" class="form-control" placeholder="Name for new Element">
            </div>  
            <div class="form-group col-md-4 pull-right">
                  <button class="btn btn-success" type="submit"> Combine! </button>
              </div>    
            </form>
        </div>

    </div>
</template>

<script>
import axios from "axios";
import { server } from "../../helper";
import router from "../../router";
import BN from "bn.js";
export default {
  data() {
    return {
      element1: "",
      element2: "",
      name1: "Element1",
      name2: "Element2",
      nonce: "",
      name: "",
      discoveredBy: "",
    };
  },
  methods: {
    async createElement() {
      console.log(this.getBNFromHex(this.element1));
      console.log(this.getBNFromHex(this.element2));
      console.log(new BN(this.nonce).toString());
      await this.$parent.contractInstance.methods.mintNew(this.getBNFromHex(this.element1),this.getBNFromHex(this.element2),new BN(this.nonce)).send({from:this.$parent.address});
      let elementData = {
        _id: this.getHash(),
        name: this.name.slice(0,32),
        nonce: this.nonce,
        discoveredBy: this.$parent.address,
        parent1: this.element1,
        parent2: this.element2
      };
      this.__submitToServer(elementData);
    },
    __submitToServer(data) {
      axios.post(`${server.baseURL}/element/create`, data).then(() => {
        router.push({ name: "home" });
      });
    },
    getHash(){
      let arr = [this.element1,this.element2,this.getHexForNonce()];
      arr.sort();
      return window.web3.utils.soliditySha3(arr[0],arr[1],arr[2]);
    },
    getHexForNonce(){
      let bytesNonce = window.web3.utils.numberToHex(this.nonce);
      return window.web3.utils.padLeft(bytesNonce,64);
    },
    getBNFromHex(val){
      val = val.slice(2,val.length);    //remove 0x prefix
      return new BN(val,16).toString();    //convert to bn as a hex
    },
    getElm(elm,func,err){
      axios.get(`${server.baseURL}/element/elements/${elm}`)
      .then(func)
      .catch(err);
    }
  },
  watch: {
    element1(newElm){
      this.getElm(newElm,
      (data)=>this.name1 = data.data.element.name, 
      () => this.name1 = "Element1");
    },
    element2(newElm){
      this.getElm(newElm,
      (data)=>this.name2 = data.data.element.name,
      () => this.name2 = "Element2");
    }
  }
};
</script>