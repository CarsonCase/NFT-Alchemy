<template>
  <div>
    <v-toolbar
    dark
    prominent
    >
    <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
    
      <v-toolbar-title>NFT Alchemy</v-toolbar-title>

    </v-toolbar>
    <router-view>
    </router-view>
     <v-navigation-drawer
      v-model="drawer"
      absolute
      bottom
      temporary
    >
      <v-list
        nav
        dense
      >
        <v-list-item-group
          active-class="deep-purple--text text--accent-4"
        >
          <v-list-item to="/home">
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item>

          <v-list-item to="/create">
            <v-list-item-title>Create</v-list-item-title>
          </v-list-item>

          <v-list-item to="/my-lab">
            <v-list-item-title>My Lab</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-title v-if="!isConnected" @click="connectBlockchain">Connect Wallet</v-list-item-title>
            <v-list-item-title v-if="isConnected" @click="disconnectWallet">Disconnect Wallet</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
import Elements from "../../smartContracts/build/contracts/Elements.json";
import Web3 from 'web3';
export default {
  name: 'App',

  components: {
  },

  data: () => ({
      address: "",
      contractInstance: {},
      isConnected: false,
      drawer: false

  }),
  methods:{
    disconnectWallet(){
      this.address = "";
      this.isConnected = false;
    },
    async connectBlockchain(){
      if(this.isConnected){
        alert('Already connected');
      }else{
        await this.loadWeb3();
        await this.loadBlockchainData();
        this.isConnected = true;
        alert('Now Connected');
      }
    },
    async loadBlockchainData(){
      const web3 = window.web3;
      const accounts = await web3.eth.getAccounts();
      this.address = accounts[0];
      const netId = await web3.eth.net.getId();
          //Load Elements Contract
          const elementsData = Elements.networks[netId]
          if(elementsData){
            const elementsContract = new web3.eth.Contract(Elements.abi,elementsData.address);
            this.contractInstance = elementsContract;
          }else{
            window.alert("Contract not yet deployed to blockchain :(");
          }   
    },
    async loadWeb3(){
      if(window.ethereum){
        window.web3 = new Web3(window.ethereum);
        await window.ethereum.enable();
      }
      else if (window.web3){
        window.web3 = new Web3(window.web3.currentProvider);
      }
      else{
        window.alert("Non-Ethereum browser detected. You should consider using MetaMask!");
      }
    }
  }
  
};
</script>
