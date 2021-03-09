<template>
<main>
    <div v-for="item in data">
        <CatalogItem :item = item />
    </div>
</main>
</template>

<script>
import CatalogItem from './CatalogItem.vue'
export default {
    data () {
        return {
            data: [{
                        "name": "Огурец",
                        "price": 300,
                        "img": "./img/cocumb.jpg"
                    },
                    {
                        "name": "Помидор",
                        "price": 450,
                        "img": "./img/tomato.jpg"
                    },
                    {
                        "name": "Редис",
                        "price": 180,
                        "img": "./img/redis.jpg"
                    }]
        }
    },
    components: {
        CatalogItem,
    }
}
</script>

<style>

</style>