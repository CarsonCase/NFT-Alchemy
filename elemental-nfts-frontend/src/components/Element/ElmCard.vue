<template>
<div
color="blue">
    <v-card>
        <v-container>
        <v-row>
            <v-col>
                <h1><Name
                class="d-none d-md-flex"
                :name="element.name"
                :maxChar="14"
                ></Name>
                </h1>
            </v-col>
            <v-col>
                <Overlay
                class="d-flex flex-row-reverse"
                :hash = "element._id"
                :name = "element.name"
                :parent1 = "element.parent1"
                :parent2 = "element.parent2"
                >
                {{element._id.slice(0,32)+"..."}}
                </Overlay>
            </v-col>
        </v-row>
        
        <p>Nonce: {{element.nonce}}</p>
        <p>Discovered By: {{element.discoveredBy}}</p>
        </v-container>
    </v-card>
</div>

</template>

<script>
import { server } from "../../helper";
import axios from "axios";
import Overlay from "./Overlay";
import Name from "./Name";
export default {
    components:{
        Overlay,
        Name
    },
    props: [
        "element"
    ],
    async created() {
        this.parent1Name = await this.getParentName(this.element.parent1);
        this.parent2Name = await this.getParentName(this.element.parent2);

    },
    data() {
        return{
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