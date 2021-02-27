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
                                <h3 class="card-title">New Department</h3>
                            </div>
                            <!-- /.card-header -->
                            <!-- form start -->
                            <form @submit.prevent="submitNewDepartmentFrom">
                                <div class="card-body">

                                    <div class="form-group">
                                        <label for="department_name">Department Name</label>
                                        <input type="text" required class="form-control" id="department_name" name="name" v-model="department.name" placeholder="Enter Department Name">
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

    export default {
        name: "New-Department",
        components: {
            BreadCrumb
        },
        data(){
            return {
                department:{
                    name:'',
                }
            }
        },
        methods:{
            submitNewDepartmentFrom(){

                // POST /countries/create
                this.$http.post('http://localhost:8000/departments/create', this.department).then(response => {

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