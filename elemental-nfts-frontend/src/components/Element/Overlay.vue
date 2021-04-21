<template>
<div>
    <v-btn
        @click ="overlay = !overlay"
        >
        <div class="d-none d-md-flex">
        <slot></slot>
        </div>
        <div class="d-md-none">
            <Name 
            :name="name"
            :maxChar="8"
            ></Name>
        </div>
    </v-btn>
    <v-overlay :value="overlay">
        <v-card
        class="d-none d-md-block p-5"
        >
            <h1>
                <Name 
                :name="name" 
                :maxChar=32>
                </Name>
            </h1>
            <p>{{hash}}</p>
            <h2>Made with:</h2>
            <h4>{{parent1Name}}</h4>
            <p>{{parent1}}</p>
            <h4>{{parent2Name}}</h4>
            <p>{{parent2}}</p>
            <v-btn
            @click ="overlay = !overlay"
            >Exit
            </v-btn>
        </v-card>
        <v-sheet
        class = "d-md-none p-2"
        width="300">
            <h1>
                <Name 
                :name="name" 
                :maxChar=32>
                </Name>
            </h1>
            <p>{{hash}}</p>
            <h2>Made with:</h2>
            <h4>{{parent1Name}}</h4>
            <p>{{parent1}}</p>
            <h4>{{parent2Name}}</h4>
            <p>{{parent2}}</p>
            <v-btn
            @click ="overlay = !overlay"
            >Exit
            </v-btn>
            
        </v-sheet>
    </v-overlay>
</div>

</template>

<script>
import { server } from "../../helper";
import axios from "axios";
import Name from './Name.vue';
export default {
    components:{
        Name
    },
    props: [
        "hash",
        "name",
        "parent1",
        "parent2",
    ],
    async created() {
        this.parent1Name = await this.getParentName(this.parent1);
        this.parent2Name = await this.getParentName(this.parent2);

    },
    data() {
        return{
            overlay: false,
            parent1Name:"loading...",
            parent2Name:"loading..."
        }
    },
    methods: {
        async getParentName(parent){
            try {
                const data = await axios.get(`${server.baseURL}/element/elements/${parent}`);
                return data.data.element.name;  
            } catch (error) {
                return "NA";
            }

        }
    }       
}

</script>