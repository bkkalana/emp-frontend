<template>
    <router-link to="/" class="brand-link">
        <img :src="imgPath" alt="Brand Logo"
             class="brand-image img-circle elevation-3" style="opacity: .8">
        <span class="brand-text font-weight-light">{{ name }}</span>
    </router-link>
</template>

<script>
    export default {
        name: "BrandLogo",
        props: {
            imgPath: {
                type: String,
                default: "https://icon-library.com/images/icon-administrator/icon-administrator-2.jpg"
            },
            name: {
                type: String,
                required: true
            }
        }
    }
</script>

<style scoped>

</style>