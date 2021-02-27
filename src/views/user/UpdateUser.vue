<template>

    <div class="row justify-content-center ">
        <div class="col-sm-6 mt-5">
            <div class="card card-primary ">

                <div class="card-header">
                    <h3 class="card-title">Register a new user</h3>
                </div>

                <div class="card-body register-card-body">

                    <form @submit.prevent="submitUpdateUserFrom">
                        <div class="input-group mb-3">
                            <input type="text" class="form-control" v-model="user.first_name" placeholder="First name" required minlength="2" maxlength="60">
                            <div class="input-group-append">
                                <div class="input-group-text">
                                    <span class="fas fa-user"></span>
                                </div>
                            </div>
                        </div>
                        <div class="input-group mb-3">
                            <input type="text" class="form-control" v-model="user.last_name" placeholder="Last name" required minlength="2" maxlength="60">
                            <div class="input-group-append">
                                <div class="input-group-text">
                                    <span class="fas fa-user"></span>
                                </div>
                            </div>
                        </div>
                        <div class="input-group mb-3">
                            <input type="text" class="form-control" v-model="user.username" placeholder="User name" required minlength="2" maxlength="20">
                            <div class="input-group-append">
                                <div class="input-group-text">
                                    <span class="fas fa-user"></span>
                                </div>
                            </div>
                        </div>
                        <div class="input-group mb-3">
                            <input type="email" class="form-control" v-model="user.email" placeholder="Email" required minlength="2" maxlength="60">
                            <div class="input-group-append">
                                <div class="input-group-text">
                                    <span class="fas fa-envelope"></span>
                                </div>
                            </div>
                        </div>

                        <div class="input-group mb-3">

                            <select class="custom-select form-control-border" v-model="user.role" id="role" name="role" >
                                <option>User role</option>
                                <option value="1">Admin</option>
                                <option value="2">User</option>
                            </select>
                            <div class="input-group-append">
                                <div class="input-group-text">
                                    <span class="fas fa-user-lock"></span>
                                </div>
                            </div>
                        </div>


                        <div class="row">
                            <div class="col-4">
                                <button type="submit" class="btn btn-primary btn-block">Update</button>
                            </div>
                            <!-- /.col -->
                        </div>
                    </form>

                </div>
                <!-- /.form-box -->
            </div><!-- /.card -->
        </div>

        <div class="col-sm-6 mt-5">
            <div class="card card-primary ">

                <div class="card-header">
                    <h3 class="card-title">Reset Password</h3>
                </div>

                <div class="card-body register-card-body">

                    <form @submit.prevent="submitUpdateUserPasswordFrom">

                        <div class="input-group mb-3">
                            <input type="password" class="form-control" v-model="user.password" id="password" name="password" placeholder="Password"  required minlength="6" maxlength="255">
                            <div class="input-group-append">
                                <div class="input-group-text">
                                    <span class="fas fa-lock"></span>
                                </div>
                            </div>
                        </div>
                        <div class="input-group mb-3">
                            <input type="password" class="form-control" v-model="user.password_confirmation" name="password_confirmation" id="password_confirmation" placeholder="Confirm password"  required minlength="6" maxlength="255">
                            <div class="input-group-append">
                                <div class="input-group-text">
                                    <span class="fas fa-lock"></span>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-4">
                                <button type="submit" class="btn btn-primary btn-block">Reset Password</button>
                            </div>
                            <!-- /.col -->
                        </div>
                    </form>

                </div>
                <!-- /.form-box -->
            </div><!-- /.card -->
        </div>

    </div>
</template>
<script>

    export default {
        name: "Update-User",
        components: {

        },
        data(){
            return {
                user: {}
            }
        },
        created() {
            this.getUserDetails(this.$router.history.current.query.edit);
        },
        methods:{
            getUserDetails(id){
                this.$http.get('http://localhost:8000/auth/users/'+id+'/edit').then(response => {

                    // get response body data
                    this.user = response.body.user;

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
            submitUpdateUserFrom(){

                // Put
                this.$http.put('http://localhost:8000/auth/users/'+this.user.id, this.user).then(response => {

                    this.$alert(
                        response.body.message,
                        'Success',
                        "success"
                    ).then(() => this.$router.push({ path: '/users'}));

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
            submitUpdateUserPasswordFrom(){
                // put
                this.$http.put('http://localhost:8000/auth/users/'+this.user.id+'/reset-password', this.user).then(response => {
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