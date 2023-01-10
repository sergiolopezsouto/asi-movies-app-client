import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import PostList from "../components/posts/PostList.vue";
import PostListSetup from "../components/posts/PostListSetup.vue";
import PostForm from "../components/posts/PostForm.vue";
import ErrorNotFoundView from "../views/ErrorNotFoundView.vue";
import PostDetail from "../components/posts/PostDetail.vue";
import LoginForm from "@/components/LoginForm.vue";
import RegisterForm from "@/components/RegisterForm.vue";
import EventListToday from "@/components/EventListToday.vue";
import EventListUpcoming from "@/components/EventListUpcoming.vue";
import EventCategories from "@/components/EventCategories.vue";
import EventForm from "@/components/EventForm.vue";
import EventProfile from "@/components/EventProfile.vue";

import auth from "@/common/auth";
import { getStore } from "@/common/store";

const routes = [
  {
    path: "/login",
    name: "Login",
    component: LoginForm,
    meta: { public: true, isLoginPage: true },
  },
  {
    path: "/register",
    name: "Register",
    component: RegisterForm,
    meta: { public: true, isLoginPage: true },
  },
  {
    path: "/createevent",
    name: "CreateEvent",
    component: EventForm,
    meta: { public: true, isLoginPage: false },
  },
  {
    path: "/profile",
    name: "Profile",
    component: EventProfile,
    meta: { public: true, isLoginPage: false },
  },
  {
    path: "/",
    name: "home",
    component: HomeView,
    meta: { public: true },
  },
  {
    path: "/today",
    name: "Today",
    component: EventListToday,
    meta: { public: true },
  },
  {
    path: "/upcoming",
    name: "Upcoming",
    component: EventListUpcoming,
    meta: { public: true },
  },
  {
    path: "/categories",
    name: "Categories",
    component: EventCategories,
    meta: { public: true },
  },
  {
    path: "/posts",
    name: "PostList",
    component: PostList,
    meta: { public: true },
  },
  {
    path: "/posts-setup",
    name: "PostListSetup",
    component: PostListSetup,
    meta: { public: true },
  },
  // /posts/new debe colocarse antes de /posts/:id porque si no vue-router
  // interpreta "new" como si fuera el id.
  //
  // Una forma de evitar este problema es usar una expresión regular para
  // limitar los valores que son interpretados. Por ejemplo, usando el path
  // /posts/:id(\\d+), vue-router espera que :id sea numérico.
  {
    name: "PostCreate",
    path: "/posts/new",
    component: PostForm,
  },
  {
    path: "/posts/:id",
    name: "PostDetail",
    component: PostDetail,
    meta: { public: true },
  },
  {
    path: "/:catchAll(.*)*",
    component: ErrorNotFoundView,
    meta: { public: true },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  // Lo primero que hacemos antes de cargar ninguna ruta es comprobar si
  // el usuario está autenticado (revisando el token)
  auth.isAuthenticationChecked.finally(() => {
    // por defecto, el usuario debe estar autenticado para acceder a las rutas
    const requiresAuth = !to.meta.public;

    const requiredAuthority = to.meta.authority;
    const userIsLogged = getStore().state.user.logged;
    const loggedUserAuthority = getStore().state.user.authority;

    if (requiresAuth) {
      // página privada
      if (userIsLogged) {
        if (requiredAuthority && requiredAuthority != loggedUserAuthority) {
          // usuario logueado pero sin permisos suficientes, le redirigimos a la página de login
          alert(
            "Acceso prohibido para el usuario actual; intenta autenticarte de nuevo"
          );
          auth.logout();
          next("/login");
        } else {
          // usuario logueado y con permisos adecuados
          next();
        }
      } else {
        // usuario no está logueado, no puede acceder a la página
        alert("Esta página requiere autenticación");
        next("/login");
      }
    } else {
      // página pública
      if (userIsLogged && to.meta.isLoginPage) {
        // si estamos logueados no hace falta volver a mostrar el login
        next({ name: "Home", replace: true });
      } else {
        next();
      }
    }
  });
});

export default router;
