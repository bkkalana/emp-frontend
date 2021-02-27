<template>
    <div>
        <BreadCrumb/>

        <section class="content">
            <div class="container-fluid">
                <div class="row justify-content-center">
                    <!-- left column -->
                    <div class="col-md-6 mt-5">
                        <!-- general form elements -->
                        <div class="card card-primary">
                            <div class="card-header">
                                <h3 class="card-title">New Employee</h3>
                            </div>
                            <!-- /.card-header -->
                            <!-- form start -->
                            <form @submit.prevent="submitNewEmployeeFrom">
                                <div class="card-body">
                                    <div class="form-group">
                                        <label for="first_name">First Name</label>
                                        <input type="text" required class="form-control" id="first_name" name="first_name" v-model="employee.first_name"  placeholder="Enter First Name">
                                    </div>
                                    <div class="form-group">
                                        <label for="last_name">Last Name</label>
                                        <input type="text" required class="form-control" id="last_name" name="last_name" v-model="employee.last_name"  placeholder="Enter Last Name">
                                    </div>
                                    <div class="form-group">
                                        <label for="middle_name">Middle Name</label>
                                        <input type="text"  class="form-control" id="middle_name" name="middle_name" v-model="employee.middle_name"  placeholder="Enter Middle Name">
                                    </div>
                                    <div class="form-group">
                                        <label for="department_id">Department</label>
                                        <select required class="custom-select form-control-border select2" id="department_id" name="department_id"  v-model="employee.department_id">
                                            <option disabled>Select Department</option>
                                            <option v-for="department in departments" v-bind:value="department.id" >{{department.name}}</option>
                                        </select>
                                    </div>
                                    <div class="form-group">
                                        <label for="address">Address</label>
                                        <textarea class="form-control" required rows="3" id="address" name="address" placeholder="Enter Address" v-model="employee.address">{{employee.address}}</textarea>
                                    </div>

                                    <div class="form-group">
                                        <label for="country_id">Country</label>
                                        <select required class="custom-select form-control-border select2" id="country_id" name="country_id" @change="getStates($event)" v-model="employee.country_id">
                                            <option disabled>Select Country</option>
                                            <option v-for="country in countries" v-bind:value="country.id" >{{country.name}}</option>
                                        </select>
                                    </div>
                                    <div class="form-group">
                                        <label for="State_id">State</label>
                                        <select required class="custom-select form-control-border" id="State_id" name="State_id" v-model="employee.state_id" @change="getCities($event)">
                                            <option disabled>Select State</option>
                                            <option v-for="state in states" v-bind:value="state.id" >{{state.name}}</option>
                                        </select>
                                    </div>
                                    <div class="form-group">
                                        <label required for="country_id">City</label>
                                        <select class="custom-select form-control-border" id="city_id" name="city_id" v-model="employee.city_id">
                                            <option disabled>Select City</option>
                                            <option v-for="city in cities" v-bind:value="city.id" >{{city.name}}</option>
                                        </select>
                                    </div>
                                    <div class="form-group">
                                        <label for="zip_code">Zip Code / Postal Code</label>
                                        <input type="tel" required inputmode="numeric" required class="form-control" id="zip_code" name="zip_code" v-model="employee.zip"  placeholder="Zip Code / Postal Code">
                                    </div>
                                    <div class="form-group">
                                        <label for="birthday">BirthDay</label><br>
                                        <date-picker id="birthday" name="birthday" v-model="employee.birthday" valueType="format" style="width: 100%"></date-picker>
                                    </div>
                                    <div class="form-group">
                                        <label for="date_hired">Date Hire</label><br>
                                        <date-picker id="date_hired" name="date_hired" v-model="employee.date_hired" valueType="format" style="width: 100%"></date-picker>
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

    import DatePicker from 'vue2-datepicker';
    import 'vue2-datepicker/index.css';
    import BreadCrumb from "../../components/ui/BreadCrumb";
    export default {
        name: "new-employee",
        components: {
            BreadCrumb,
            DatePicker
        },
        data(){
            return {
                countries:{},
                states:{},
                cities: {},
                departments:{},
                employee:{}
            }
        },
        created() {
            this.getDepartments();
            this.getCountries();
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
            getCities(event){
                this.$http.get('http://localhost:8000/cities/'+event.target.value+'/all').then(response => {

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
            submitNewEmployeeFrom(){

                // POST /countries/create
                this.$http.post('http://localhost:8000/employees/create', this.employee).then(response => {

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