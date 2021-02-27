<template>
    <div>
        <BreadCrumb/>

        <section class="content">
            <div class="container-fluid">

                <div class="row">
                    <div class="col-12">
                        <div class="card">
                            <div class="card-header">
                                <h3 class="card-title">States List</h3>
                                <div class="card-tools">
                                    <div class="input-group input-group-sm" style="width: 150px;">
                                        <button type="button" class="btn btn-default" @click="redirectToNewState">
                                            <i class="fas fa-plus"></i>
                                            New State
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <!-- /.card-header -->
                            <div class="card-body">

                                <div class="row justify-content-end mb-3">
                                    <div class="col-sm-6">
                                        <div class="input-group input-group-sm">
                                            <input type="text" name="table_search" @keyup="filterStates" v-model="search" class="form-control float-right" placeholder="Search by country  or State name">
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
                                            <th>State Name</th>
                                            <th>Country Name</th>
                                            <th>Date</th>
                                            <th>Action</th>
                                        </tr>
                                        </thead>
                                        <tbody >
                                        <tr v-for="(state,index) in states.data" :key="index">
                                            <td style="width: 50px;">{{index+1}}</td>
                                            <td>{{state.name}}</td>
                                            <td style="width: 200px;">{{state.country_name}}</td>
                                            <td style="width: 150px;">{{format_date(state.created_at)}}</td>
                                            <td style="width: 80px;">
                                                <button class="btn btn-sm btn-info" @click="editState(state.id)"><i class="fas fa-edit"></i></button>
                                                <button class="btn btn-sm btn-danger" @click="deleteState(state.id)"><i class="fas fa-trash"></i></button>
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>

                            </div>
                            <!-- /.card-body -->
                            <div class="card-footer clearfix">
                                <pagination :data="states" @pagination-change-page="getState"></pagination>
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
        name: "States",
        components: {
            BreadCrumb
        },
        data(){
            return{
                states: {},
                search: '',
            }
        },
        created() {
            this.getState();
        },
        methods:{
            getState(page = 1){
                this.$http.get('http://localhost:8000/states?page='+ page).then(response => {

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
            filterStates(){
                this.$http.get('http://localhost:8000/states/filter?search='+ this.search).then(response => {
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
            editState(id){

                this.$router.push({ path: '/states/edit-state' ,query:{edit:id}});

            },
            deleteState(id){
                this.$http.delete('http://localhost:8000/states/'+ id).then(response => {

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
            redirectToNewState(){
                this.$router.push({ path: '/states/new-state' });
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