<template>
    <section class="content-header">
        <div class="container-fluid">
            <div class="row mb-2">
                <div class="col-sm-6">
                    <h1>{{ getTitle }}</h1>
                </div>
                <div class="col-sm-6">

                </div>
            </div>
        </div>
    </section>
</template>

<script>
    export default {
        name: "BreadCrumb",
        props: {
            title: {
                type: String
            }
        },
        computed: {
            getTitle() {
                if (typeof(this.title) === "undefined") {
                    return '';
                }
                return '';
            }
        }
    }
</script>

<style scoped>

</style>