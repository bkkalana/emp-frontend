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
                                <h3 class="card-title">Update City</h3>
                            </div>
                            <!-- /.card-header -->
                            <!-- form start -->
                            <form @submit.prevent="submitUpdateCityFrom">
                                <div class="card-body">
                                    <div class="form-group">
                                        <label for="country_id">Select Country</label>
                                        <select class="custom-select form-control-border" id="country_id" name="country_id" v-model="city.country_id" @change="getStates($event)" >
                                            <option v-for="country in countries" v-bind:value="country.id" >{{country.name}}</option>
                                        </select>
                                    </div>
                                    <div class="form-group">
                                        <label for="country_id">Select State</label>
                                        <select class="custom-select form-control-border" id="State_id" name="State_id" v-model="city.state_id">
                                            <option v-for="state in states" v-bind:value="state.id" >{{state.name}}</option>
                                        </select>
                                    </div>
                                    <div class="form-group">
                                        <label for="name">City Name</label>
                                        <input type="text" required class="form-control" id="name" name="name" v-model="city.name"  placeholder="Enter City Name">
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
        name: "New-City",
        components: {
            BreadCrumb
        },
        data(){
            return {
                countries:{},
                states:{},
                city: {
                    country_id:0,
                    state_id: 0,
                    name:''
                }
            }
        },
        created() {
            this.getCountries();
            this.getCityDetails(this.$router.history.current.query.edit);
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
            getStates(event){
                this.$http.get('http://localhost:8000/states/'+event.target.value+'/all').then(response => {

                    // get response body data
                    this.states = response.body.states;
                    console.log(response.body.states);
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
            getStatesByCountry(id){
                this.$http.get('http://localhost:8000/states/'+id+'/all').then(response => {

                    // get response body data
                    this.states = response.body.states;
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
            getCityDetails(id){
                this.$http.get('http://localhost:8000/cities/'+ id+'/edit').then(response => {

                    // get response body data
                    this.city = response.body.city;
                    this.getStatesByCountry(this.city.country_id);
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
            submitUpdateCityFrom(){

                // POST /countries/create
                this.$http.put('http://localhost:8000/cities/'+this.city.id, this.city).then(response => {

                    this.$alert(
                        response.body.message,
                        'Success',
                        "success"
                    ).then(() => this.$router.push({ path: '/cities'}));

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