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
                                <h3 class="card-title">Update Country</h3>
                            </div>
                            <!-- /.card-header -->
                            <!-- form start -->
                            <form @submit.prevent="submitUpdateCountryFrom">
                                <div class="card-body">
                                    <div class="form-group">
                                        <label for="country_code">Country Code</label>
                                        <input type="text" required class="form-control" id="country_code" name="code" v-model="country.country_code" placeholder="Enter Country Code">
                                    </div>
                                    <div class="form-group">
                                        <label for="country_name">Country Name</label>
                                        <input type="text" required class="form-control" id="country_name" name="name" v-model="country.name" placeholder="Enter Country Name">
                                    </div>

                                </div>
                                <!-- /.card-body -->

                                <div class="card-footer">
                                    <button type="submit" class="btn btn-primary">Update</button>
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
        name: "EDIT-COUNTRY",
        components: {
            BreadCrumb
        },
        data(){
            return {
                country:{}
            }
        },
        created() {
            this.getCountryDetails(this.$router.history.current.query.edit);
         },
        methods:{
            getCountryDetails(id){
                this.$http.get('http://localhost:8000/countries/'+ id+'/edit').then(response => {

                    // get response body data
                    this.country = response.body.country;

                }, response => {
                    // error callback
                    console.log(response.body);
                });
            },
            submitUpdateCountryFrom(){
                // POST /someUrl
                this.$http.put('http://localhost:8000/countries/'+this.country.id, this.country).then(response => {

                    this.$alert(
                        response.body.message,
                        'Success',
                        "success"
                    ).then(() => this.$router.push({ path: '/countries'}));

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