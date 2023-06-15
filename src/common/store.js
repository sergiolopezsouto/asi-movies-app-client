import { ref } from "vue";

const store = ref({
  state: {
    user: {
      authority: "",
      login: "",
      id: "", // O null, dependiendo de lo que prefieras
      logged: false,
    },
  },
});

export { getStore };

function getStore() {
  return store.value;
}
