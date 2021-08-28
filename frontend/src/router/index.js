import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Login.vue";

Vue.use(VueRouter);

const routes = [
	{
		path: "/",
		name: "Login",
		component: Login,
	},
	{
		path: "/Signup",
		name: "Signup",

		component: () => import("../views/Signup.vue"),
	},
	{
		path: "/user/:id",
		name: "user",
		component: () => import("../views/user.vue"),
	},
	{
		path: "/Home",
		name: "Home",
		component: () => import("../views/Home.vue"),
	},
	{
		path: "/post/:id",
		name: "OnePost",
		component: () => import("../views/OnePost.vue"),
	},
	{
		path: "/update/:id",
		name: "Update",
		component: () => import("../views/Update.vue"),
	},
];

const router = new VueRouter({
	routes,
});

export default router;
