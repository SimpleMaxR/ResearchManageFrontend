import { defineStore } from "pinia";

export const useMainStore = defineStore("main", {
    state: () => ({
        isAdmin: false,
        isLogin: false,
        userName: "",
        token: "",
        userId: ""
    }),
});