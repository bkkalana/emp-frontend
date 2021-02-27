<template>
    <div>
        <BreadCrumb/>

        <section class="content">
            <div class="container-fluid">

                <div class="row">
                    <div class="col-12">
                        <div class="card">
                            <div class="card-header">
                                <h3 class="card-title">City List</h3>
                                <div class="card-tools">
                                    <div class="input-group input-group-sm" style="width: 150px;">
                                        <button type="button" class="btn btn-default" @click="redirectToNewCity">
                                            <i class="fas fa-plus"></i>
                                            New City
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <!-- /.card-header -->
                            <div class="card-body">

                                <div class="row justify-content-end mb-3">
                                    <div class="col-sm-6">
                                        <div class="input-group input-group-sm">
                                            <input type="text" name="table_search" @keyup="filterCities" v-model="search" class="form-control float-right" placeholder="Search by country  or state or city ">
                                            <div class="input-group-append">
                                                <button type="button" class="btn btn-default">
                                                    <i class="fas fa-search"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="table-responsive">
                                    <table class="table table-head-fixed text-nowrap">
                                        <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>City Name</th>
                                            <th>State Name</th>
                                            <th>Country Name</th>
                                            <th>Date</th>
                                            <th>Action</th>
                                        </tr>
                                        </thead>
                                        <tbody >
                                        <tr v-for="(city,index) in cities.data" :key="index">
                                            <td>{{index+1}}</td>
                                            <td>{{city.name}}</td>
                                            <td>{{city.state_name}}</td>
                                            <td>{{city.country_name}}</td>
                                            <td>{{format_date(city.created_at)}}</td>
                                            <td style="width: 80px;">
                                                <button class="btn btn-sm btn-info" @click="editCity(city.id)"><i class="fas fa-edit"></i></button>
                                                <button class="btn btn-sm btn-danger" @click="deleteCity(city.id)"><i class="fas fa-trash"></i></button>
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>

                            </div>
                            <!-- /.card-body -->
                            <div class="card-footer clearfix">
                                <pagination :data="cities" @pagination-change-page="getCities"></pagination>
                            </div>
                            <!-- /.card-footer -->
                        </div>
                        <!-- /.card -->
                    </div>
                </div>
                <!-- /.row -->
            </div><!-- /.container-fluid -->
        </section>
    </div>
</template>

<script>
    import BreadCrumb from "../../components/ui/BreadCrumb";
    import moment from 'moment';
    export default {
        name: "Cities",
        components: {
            BreadCrumb
        },
        data(){
            return{
                cities: {},
                search: '',
            }
        },
        created() {
            this.getCities();
        },
        methods:{
            getCities(page = 1){
                this.$http.get('http://localhost:8000/cities?page='+ page).then(response => {

                    // get response body data
                    this.cities = response.body.cities;

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
            filterCities(){
                this.$http.get('http://localhost:8000/cities/filter?search='+ this.search).then(response => {
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
            editCity(id){

                this.$router.push({ path: '/cities/edit-city' ,query:{edit:id}});

            },
            deleteCity(id){
                this.$http.delete('http://localhost:8000/cities/'+ id).then(response => {

                    // get response body data
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
            },
            redirectToNewCity(){
                this.$router.push({ path: '/cities/new-city' });
            },
            format_date(value){
                if (value) {
                    return moment(String(value)).format('YYYY-MM-DD')
                }
            },
        },

    }

</script>

<style scoped>

</style>