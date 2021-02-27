<template>
    <aside class="main-sidebar sidebar-dark-primary elevation-4">

        <BrandLogo name="EMP SYSTEM"/>

        <div class="sidebar">

            <div class="user-panel mt-3 pb-3 mb-3 d-flex">
                <div class="image">
                    <img src="https://lh3.googleusercontent.com/proxy/ZGwuXfKwVC23rKpZYzMFsA0LWd6vxiJSEbAfV1VF72LS-e4QBShMZIbZDdiFdFrulIqs6PssyEMks6fx2NbZxwKV4rqOvXw_ndIwRh3qfQ" class="img-circle elevation-2" alt="User Image">
                </div>
                <div class="info">
                    <router-link to="/" class="d-block">Admin</router-link>
                </div>
            </div>

            <nav class="mt-2">
                <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                    <SidebarItem path="/" title="Dashboard" icon-class="fas fa-tachometer-alt"/>

                    <SidebarItem path="/employees" title="Employee Management" icon-class="fas fa-th"/>

                    <SidebarDropdownItem label="System Management">
                        <SidebarItem path="/countries" title="Country"/>
                        <SidebarItem path="/states" title="State"/>
                        <SidebarItem path="/cities" title="City"/>
                        <SidebarItem path="/departments" title="Department"/>
                    </SidebarDropdownItem>

                    <SidebarDropdownItem label="User Management">
                        <SidebarItem path="/users" title="User"/>
                    </SidebarDropdownItem>
                </ul>
            </nav>
        </div>
    </aside>
</template>

<script>
    import BrandLogo from "../partial/layout/BrandLogo";
    import SidebarItem from "../partial/layout/SidebarItem";
    import SidebarDropdownItem from "../partial/layout/SidebarDropdownItem";
    export default {
        name: "Sidebar",
        components: {
            BrandLogo,
            SidebarItem,
            SidebarDropdownItem
        }
    }
</script>

<style scoped>

</style>