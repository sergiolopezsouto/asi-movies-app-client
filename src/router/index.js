import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import ErrorNotFoundView from "../views/ErrorNotFoundView.vue";
import LoginForm from "@/components/LoginForm.vue";
import RegisterForm from "@/components/RegisterForm.vue";
import EventListToday from "@/components/EventListToday.vue";
import EventListUpcoming from "@/components/EventListUpcoming.vue";
import EventCategories from "@/components/CategoryList.vue";
import EventForm from "@/components/CreateEventForm.vue";
import EventProfile from "@/components/ProfilePage.vue";
import UserPage from "@/components/UserPage.vue";
import UserList from "@/components/UserList.vue";
import EventDetail from "@/components/EventDetail.vue";
import EventListByCategory from "@/components/EventListByCategory.vue";
import SearchUsers from "@/components/SearchUsers.vue";

import auth from "@/common/auth";
import { getStore } from "@/common/store";

const routes = [
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
    path: "/eventsbycategory/:category",
    name: "EventsByCategory",
    component: EventListByCategory,
    meta: { public: true },
  },
  {
    path: "/events/:id",
    name: "EventDetail",
    component: EventDetail,
    meta: { requiresAuth: true }, // Ruta protegida, requiere autenticación
  },
  {
    path: "/categories",
    name: "Categories",
    component: EventCategories,
    meta: { public: true },
  },
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
    meta: { requiresAuth: true }, // Ruta protegida, requiere autenticación
  },
  {
    path: "/profile",
    name: "Profile",
    component: EventProfile,
    meta: { requiresAuth: true }, // Ruta protegida, requiere autenticación
  },
  {
    path: "/users",
    name: "Users",
    component: UserList,
    meta: { requiresAuth: true, authority: "ADMIN" }, // Ruta protegida y requiere rol de "admin"
  },
  {
    path: "/users/:id",
    name: "UserPage",
    component: UserPage,
    meta: { requiresAuth: true }, // Ruta protegida y requiere autenticación
  },
  {
    path: "/searchusers",
    name: "SearchUsers",
    component: SearchUsers,
    meta: { requiresAuth: true }, // Ruta protegida y requiere autenticación
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
        next("/");
        // next({ name: "Home", replace: true });
      } else {
        next();
      }
    }
  });
});

export default router;
