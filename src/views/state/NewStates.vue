<template>
    <div>
        <BreadCrumb/>

        <section class="content">
            <div class="container-fluid">
                <div class="row justify-content-center">
                    <!-- left column -->
                    <div class="col-md-6">
                        <!-- general form elements -->
                        <div class="card card-primary">
                            <div class="card-header">
                                <h3 class="card-title">New State</h3>
                            </div>
                            <!-- /.card-header -->
                            <!-- form start -->
                            <form @submit.prevent="submitNewStateFrom">
                                <div class="card-body">
                                    <div class="form-group">
                                        <label for="country_id">Select Country</label>
                                        <select class="custom-select form-control-border" id="country_id" name="country_id" v-model="state.country_id">
                                            <option v-for="country in countries" v-bind:value="country.id" >{{country.name}}</option>
                                        </select>
                                    </div>
                                    <div class="form-group">
                                        <label for="name">State Name</label>
                                        <input type="text" required class="form-control" id="name" name="name" v-model="state.name"  placeholder="Enter State Name">
                                    </div>

                                </div>
                                <!-- /.card-body -->

                                <div class="card-footer">
                                    <button type="submit" class="btn btn-primary">Submit</button>
                                </div>
                            </form>
                        </div>
                        <!-- /.card -->
                    </div>
                    <!--/.col (left) -->
                </div>
                <!-- /.row -->
            </div><!-- /.container-fluid -->
        </section>
    </div>
</template>

<script>
    import BreadCrumb from "../../components/ui/BreadCrumb";
    import 'vue-select/dist/vue-select.css';
    export default {
        name: "New-State",
        components: {
            BreadCrumb
        },
        data(){
            return {
                countries:{},
                state: {
                    country_id: 0,
                    name:''
                }
            }
        },
        created() {
            this.getCountries();
        },
        methods:{
            getCountries(){
                this.$http.get('http://localhost:8000/countries/all').then(response => {

                    // get response body data
                    this.countries = response.body.countries;

                }, response => {
                    // error callback
                    const errors = response.body.errors;

                    let html = '';

                    for (const i in errors){
                        html += errors[i];
                    }

                    this.$alert(
                        html,
                        response.body.message,
                        "error"
                    ).then(() => console.log("Closed"));
                });
            },
            submitNewStateFrom(){

                // POST /countries/create
                this.$http.post('http://localhost:8000/states/create', this.state).then(response => {

                    this.$alert(
                        response.body.message,
                        'Success',
                        "success"
                    ).then(() => this.$router.go(this.$router.currentRoute));

                }, response => {
                    // error callback
                    const errors = response.body.errors;

                    let html = '';

                    for (const i in errors){
                        html += errors[i];
                    }

                    this.$alert(
                        html,
                        response.body.message,
                        "error"
                    ).then(() => console.log("Closed"));
                });

            }
        }
    }
</script>

<style scoped>

</style>