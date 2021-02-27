<template>
    <nav class="main-header navbar navbar-expand navbar-white navbar-light">

        <ul class="navbar-nav">
            <li class="nav-item">
                <a class="nav-link" data-widget="pushmenu" href="#" role="button">
                    <em class="fas fa-bars"></em>
                </a>
            </li>
        </ul>




    </nav>
</template>

<script>
    import NavMessage from "./NavMessage";
    import NavMessageItem from "../partial/layout/NavMessageItem";
    import NavNotification from "./NavNotification";
    import NavNotificationItem from "../partial/layout/NavNotificationItem";

    export default {
        name: "Navbar",
        components: {
            NavMessage,
            NavMessageItem,
            NavNotification,
            NavNotificationItem
        }
    }
</script>

<style scoped>

</style>