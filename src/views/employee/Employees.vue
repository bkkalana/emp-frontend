<template>
    <div>
        <BreadCrumb/>

        <section class="content">
            <div class="container-fluid">

                <div class="row">
                    <div class="col-12 mt-5">
                        <div class="card">
                            <div class="card-header">
                                <h3 class="card-title">Employee List</h3>
                                <div class="card-tools">
                                    <div class="input-group input-group-sm" style="width: 180px;">
                                        <button type="button" class="btn btn-default" @click="redirectToNewEmployee">
                                            <i class="fas fa-plus"></i>
                                            New Employee
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <!-- /.card-header -->
                            <div class="card-body">

                                <div class="row justify-content-end mb-3">
                                    <div class="col-sm-4">
                                        <div class="form-group">
                                            <select required class="custom-select form-control-border select2" id="department_id" name="department_id" @change="filterEmployeeByDepartment($event)">
                                                <option value="">Select Department</option>
                                                <option v-for="department in departments" v-bind:value="department.id" >{{department.name}}</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="col-sm-6">
                                        <div class="input-group">

                                            <input type="text" name="table_search" @keyup="filterEmployeeByName" v-model="search" class="form-control float-right" placeholder="Search by Employee  name">
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
                                            <th>Address</th>
                                            <th>Department Name</th>
                                            <th>Date</th>
                                            <th>Action</th>
                                        </tr>
                                        </thead>
                                        <tbody >
                                        <tr v-for="(employee,index) in employees.data" :key="index">
                                            <td style="width: 50px;">{{index+1}}</td>
                                            <td>{{employee.first_name}}</td>
                                            <td>{{employee.last_name}}</td>
                                            <td>{{employee.address}}</td>
                                            <td>{{employee.department_name}}</td>
                                            <td style="width: 60px;">{{format_date(employee.created_at)}}</td>
                                            <td style="width: 50px;">
                                                <button class="btn btn-sm btn-info" @click="editEmployee(employee.id)"><i class="fas fa-edit"></i></button>
                                                <button class="btn btn-sm btn-danger" @click="deleteEmployee(employee.id)"><i class="fas fa-trash"></i></button>
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>

                            </div>
                            <!-- /.card-body -->
                            <div class="card-footer clearfix">
                                <pagination :data="employees" @pagination-change-page="getEmployees"></pagination>
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
        name: "Employees",
        components: {
            BreadCrumb
        },
        data(){
            return{
                departments:{},
                employees: {},
                search: '',
            }
        },
        created() {
            this.getDepartments();
            this.getEmployees();
        },
        methods:{
            getDepartments(){
                this.$http.get('http://localhost:8000/departments/all').then(response => {

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
            getEmployees(page = 1){
                this.$http.get('http://localhost:8000/employees?page='+ page).then(response => {

                    // get response body data
                    this.employees = response.body.employees;

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
            filterEmployeeByName(){
                this.$http.get('http://localhost:8000/employees/filter?search='+ this.search).then(response => {
                    // get response body data
                    this.employees = response.body.employees;

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
            filterEmployeeByDepartment(event){
                this.$http.get('http://localhost:8000/employees/filter?search='+ this.search+'&&department='+ event.target.value+'').then(response => {
                    // get response body data
                    this.employees = response.body.employees;

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
            editEmployee(id){

                this.$router.push({ path: '/employees/edit-employee' ,query:{edit:id}});

            },
            deleteEmployee(id){
                this.$http.delete('http://localhost:8000/employees/'+ id).then(response => {

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
            redirectToNewEmployee(){
                this.$router.push({ path: '/employees/new-employee' });
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