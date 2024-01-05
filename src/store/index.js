import { defineStore } from "pinia";

export const MainStore = defineStore("main", {
    state: () => ({
        isLogin: false,
        userName: "",
        token: "",
        userID: 0,
        password: "",
        role: "0",
    }),
    persist: true
});