<template>
    <div>
        <p>{{getSafeName()}}</p>
    </div>
</template>

<script>
export default {
    props:[
        "name",
        "maxChar"
    ],
    methods:{
        getSafeName(){
            return this.name.slice(0,this.maxChar);
        }
    }
}
</script>