<template>
    <div>
        <BreadCrumb/>

        <section class="content">
            <div class="container-fluid">

                <div class="row">
                    <div class="col-12">
                        <div class="card">
                            <div class="card-header">
                                <h3 class="card-title">User List</h3>
                                <div class="card-tools">
                                    <div class="input-group input-group-sm" style="width: 150px;">
                                        <button type="button" class="btn btn-default" @click="redirectToNewUser">
                                            <i class="fas fa-plus"></i>
                                            New User
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <!-- /.card-header -->
                            <div class="card-body">

                                <div class="row justify-content-end mb-3">
                                    <div class="col-sm-6">
                                        <div class="input-group input-group-sm">
                                            <input type="text" name="table_search" @keyup="filterUsers" v-model="search" class="form-control float-right" placeholder="Search by username or email">
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
                                            <th>First Name</th>
                                            <th>Last Name</th>
                                            <th>Username</th>
                                            <th>Email</th>
                                            <th>Date</th>
                                            <th>Action</th>
                                        </tr>
                                        </thead>
                                        <tbody >
                                        <tr v-for="(user,index) in users.data" :key="index">
                                            <td style="width: 50px;">{{index+1}}</td>
                                            <td>{{user.first_name}}</td>
                                            <td>{{user.last_name}}</td>
                                            <td>{{user.username}}</td>
                                            <td>{{user.email}}</td>
                                            <td>{{format_date(user.created_at)}}</td>
                                            <td style="width: 50px;">
                                                <button class="btn btn-sm btn-info" @click="editUser(user.id)"><i class="fas fa-edit"></i></button>
                                                <button class="btn btn-sm btn-danger" @click="deleteUser(user.id)"><i class="fas fa-trash"></i></button>
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>

                            </div>
                            <!-- /.card-body -->
                            <div class="card-footer clearfix">
                                <pagination :data="users" @pagination-change-page="getUsers"></pagination>
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
        name: "Countries",
        components: {
            BreadCrumb
        },
        data(){
            return{
                users: {},
                search: '',
            }
        },
        created() {
            this.getUsers();
        },
        methods:{
            getUsers(page = 1){
                this.$http.get('http://localhost:8000/auth/users?page='+ page).then(response => {

                    // get response body data
                    this.users = response.body.users;

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
            filterUsers(){
                this.$http.get('http://localhost:8000/auth/users/filter?search='+ this.search).then(response => {
                    // get response body data
                    this.users = response.body.users;

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
            editUser(id){

                this.$router.push({ path: '/users/edit-user' ,query:{edit:id}});

            },
            deleteUser(id){
                this.$http.delete('http://localhost:8000/auth/users/'+ id).then(response => {

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
            redirectToNewUser(){
                this.$router.push({ path: '/users/new-user' });
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