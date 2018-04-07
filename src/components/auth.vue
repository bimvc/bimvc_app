<template>
    <v-app id="inspire">
        <v-content>
            <v-container fluid fill-height>
                <v-layout align-center justify-center>
                    <v-flex xs12 sm8 md4>
                        <v-card class="elevation-12">
                            <v-toolbar>
                                <v-toolbar-title>Авторизация</v-toolbar-title>
                            </v-toolbar>
                            <v-card-text>
                                <v-form>
                                    <v-text-field prepend-icon="person" name="login" label="email" type="text"></v-text-field>
                                    <v-text-field prepend-icon="lock" name="password" label="Пароль" id="password" type="password"></v-text-field>
                                </v-form>
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="primary" v-on:click="auth">Войти</v-btn>
                            </v-card-actions>
                            <v-progress-linear :indeterminate="isAuth"></v-progress-linear>
                        </v-card>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-content>
    </v-app>
</template>

<script>
    export default {
        data: () => ({
            drawer: null
        }),
        props: {
            source: String
        },
        computed: {
            isAuth() {
                return this.$store.state.isAuth;
            }
        },
        methods: {
            auth() {
                return this.$store.commit('auth');
            }
        }
    }
</script>