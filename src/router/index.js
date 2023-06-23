import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import ErrorNotFoundView from "../views/ErrorNotFoundView.vue";
import ErrorForbiddenView from "../views/ErrorForbiddenView.vue";
import LoginForm from "@/components/LoginForm.vue";
import RegisterForm from "@/components/RegisterForm.vue";
import CategoryList from "@/components/CategoryList.vue";
import DirectorList from "@/components/DirectorList.vue";
import MovieForm from "@/components/CreateMovieForm.vue";
import EventProfile from "@/components/ProfilePage.vue";
import DirectorDetail from "@/components/DirectorDetail.vue";
import UserList from "@/components/UserList.vue";
import UserPage from "@/components/UserPage.vue";
import MovieDetail from "@/components/MovieDetail.vue";
import MovieListByCategory from "@/components/MovieListByCategory.vue";
import MovieListByDirector from "@/components/MovieListByDirector.vue";
import MovieList from "@/components/MovieList.vue";
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
    path: "/movies",
    name: "Movies",
    component: MovieList,
    meta: { public: true },
  },
  // {
  //   path: "/today",
  //   name: "Today",
  //   component: EventListToday,
  //   meta: { public: true },
  // },
  // {
  //   path: "/upcoming",
  //   name: "Upcoming",
  //   component: EventListUpcoming,
  //   meta: { public: true },
  // },
  {
    path: "/moviesbycategory/:category",
    name: "MoviesByCategory",
    component: MovieListByCategory,
    meta: { public: true },
  },
  {
    path: "/moviesbydirector/:director",
    name: "MoviesByDirector",
    component: MovieListByDirector,
    meta: { public: true },
  },
  // {
  //   path: "/eventsbycategory/:category",
  //   name: "EventsByCategory",
  //   component: EventListByCategory,
  //   meta: { public: true },
  // },
  {
    path: "/movies/:id",
    name: "MovieDetail",
    component: MovieDetail,
    meta: { requiresAuth: true }, // Ruta protegida, requiere autenticación
  },
  // {
  //   path: "/events/:id",
  //   name: "EventDetail",
  //   component: EventDetail,
  //   meta: { requiresAuth: true }, // Ruta protegida, requiere autenticación
  // },
  {
    path: "/categories",
    name: "Categories",
    component: CategoryList,
    meta: { public: true },
  },
  {
    path: "/directors",
    name: "Directors",
    component: DirectorList,
    meta: { public: true },
  },
  {
    path: "/director/:id",
    name: "DirectorDetail",
    component: DirectorDetail,
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
  // {
  //   path: "/createevent",
  //   name: "CreateEvent",
  //   component: EventForm,
  //   meta: { requiresAuth: true }, // Ruta protegida, requiere autenticación
  // },
  {
    path: "/createmovie",
    name: "CreateMovie",
    component: MovieForm,
    meta: { requiresAuth: true, authority: "ADMIN" }, // Ruta protegida y requiere rol de "admin"
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

    meta: { requiresAuth: true, authority: "ADMIN" }, // Ruta protegida y requiere rol de "admin"
  },
  {
    path: "/searchusers",
    name: "SearchUsers",
    component: SearchUsers,
    meta: { requiresAuth: true }, // Ruta protegida y requiere autenticación
  },
  {
    path: "/accessdenied",
    name: "ForbiddenPage",
    component: ErrorForbiddenView,
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
          // auth.logout();
          alert("No tienes acceso a esta página");
          next("/");
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
