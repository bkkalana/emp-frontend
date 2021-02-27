<template>
    <div>
        <BreadCrumb/>

        <section class="content">
            <div class="container-fluid">

                <div class="row">
                    <div class="col-12">
                        <div class="card">
                            <div class="card-header">
                                <h3 class="card-title">Department List</h3>
                                <div class="card-tools">
                                    <div class="input-group input-group-sm" style="width: 180px;">
                                        <button type="button" class="btn btn-default" @click="redirectToNewDepartment">
                                            <i class="fas fa-plus"></i>
                                            New Department
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <!-- /.card-header -->
                            <div class="card-body">

                                <div class="row justify-content-end mb-3">
                                    <div class="col-sm-6">
                                        <div class="input-group input-group-sm">
                                            <input type="text" name="table_search" @keyup="filterDepartments" v-model="search" class="form-control float-right" placeholder="Search by Department  name">
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
                                            <th>Department Name</th>
                                            <th>Date</th>
                                            <th>Action</th>
                                        </tr>
                                        </thead>
                                        <tbody >
                                        <tr v-for="(department,index) in departments.data" :key="index">
                                            <td style="width: 50px;">{{index+1}}</td>
                                            <td>{{department.name}}</td>
                                            <td style="width: 60px;">{{format_date(department.created_at)}}</td>
                                            <td style="width: 50px;">
                                                <button class="btn btn-sm btn-info" @click="editDepartment(department.id)"><i class="fas fa-edit"></i></button>
                                                <button class="btn btn-sm btn-danger" @click="deleteDepartment(department.id)"><i class="fas fa-trash"></i></button>
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>

                            </div>
                            <!-- /.card-body -->
                            <div class="card-footer clearfix">
                                <pagination :data="departments" @pagination-change-page="getDepartments"></pagination>
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
                departments: {},
                search: '',
            }
        },
        created() {
            this.getDepartments();
        },
        methods:{
            getDepartments(page = 1){
                this.$http.get('http://localhost:8000/departments?page='+ page).then(response => {

                    // get response body data
                    this.departments = response.body.departments;

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
            filterDepartments(){
                this.$http.get('http://localhost:8000/departments/filter?search='+ this.search).then(response => {
                    // get response body data
                    this.departments = response.body.departments;

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
            editDepartment(id){

                this.$router.push({ path: '/departments/edit-department' ,query:{edit:id}});

            },
            deleteDepartment(id){
                this.$http.delete('http://localhost:8000/departments/'+ id).then(response => {

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
            redirectToNewDepartment(){
                this.$router.push({ path: '/departments/new-department' });
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