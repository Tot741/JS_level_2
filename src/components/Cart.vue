<template>
<main>
    <h2>Корзина</h2>
    <div v-for="item in data">
        <CartItem :item = item />
    </div>
</main>
</template>

<script>
import CartItem from './CartItem.vue'
export default {
    data () {
        return {
            data: [{
                        "name": "Огурец",
                        "price": 300,
                        "quantity": 3
                    },
                    {
                        "name": "Помидор",
                        "price": 450,
                        "quantity": 2
                    },
                    {
                        "name": "Редис",
                        "price": 180,
                        "quantity": 5
                    }]
        }
    },
    components: {
        CartItem,
    }
}
</script>

<style>

</style>