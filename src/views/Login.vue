<template>
    <section class="section background">
        <!-- <m-button @click="aaa">login</m-button> -->
        <div class="login-form glass">
            <div class="form-lable">MAIN.RUN</div>
            <div class="form-input">
                <m-input design="yoko" lable="用户名" v-model="username"></m-input>
                <m-input design="yoko" lable="密码" v-model="password" type="password"></m-input>
            </div>
            <div class="form-submit">
                <m-button @click="login" special>登录</m-button>
            </div>
        </div>
    </section>
</template>

<script>
// import { login } from "@/api/user.js";
export default {
    name: "Login",
    data() {
        return {
            username: "",
            password: ""
        };
    },
    methods: {
        login() {
            this.$store.dispatch("Login", { username: this.username, password: this.password }).then(() => {
                this.$router.push({ name: "home" });
            }).catch(() => {
                // console.log("222");
            });
        }
    }
};
</script>

<style lang="stylus" scoped>
//import "../../web.main.run/src/ui/style/glass.styl"

.section {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    //background("../assets/background.jpg")

    .login-form {
        //width: 300px;
        //background-color: #ffffff;
        //border: 1px solid #F5F5F5;

        width: 300px;
        //height: 400px;
        position: absolute;
        //border-radius: 8px;
        //glass("../assets/background.jpg")

        .form-lable {
            font-size: 2rem;
            text-align: center;
            padding-top: 20px;
            color: #fcad26;
        }

        .form-input {
            padding: 10px 5px 0 5px;
        }

        .form-submit {
            padding: 20px 0 20px 0;
            text-align: center;
        }
    }
}
</style>
