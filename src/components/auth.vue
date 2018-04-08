<template>
    <v-app id="inspire">
        <v-content>
            <v-container fluid fill-height>
                <v-layout align-center justify-center>
                    <v-flex xs12 sm8 md4>
                        <v-card class="elevation-12" >
                            <v-progress-linear :indeterminate="signInProcess"></v-progress-linear>
                            <v-btn icon large>
                                <img
                                        width="32px"
                                        src="http://bim.vc/wp-content/themes/vysotsky_theme/img/VC.jpg"
                                        alt="Vuetify"
                                >
                            </v-btn>

                            <v-card-text>
                                <v-form>
                                    <v-text-field
                                        v-model="email"
                                          name="login"
                                          label="email"
                                          type="text">
                                    </v-text-field>
                                    <v-text-field
                                        v-model="password"
                                          name="password"
                                          label="Пароль"
                                          id="password"
                                          type="password">
                                    </v-text-field>
                                </v-form>
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="primary" v-on:click="auth">Войти</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-content>
    </v-app>
</template>

<script>
    import { mapState } from 'vuex';

    export default {
        data: () => ({
            drawer: null,
            email: '',
            password: ''
        }),
        props: {
            source: String
        },
        computed: {
            ...mapState([
                'isAuth',
                'signInProcess'
            ])
        },
        methods: {
            async auth() {
                await this.$store.dispatch('signIn', {email: this.email, password: this.password});
                if (this.isAuth) {
                    this.$router.push('account');
                }
            }
        }
    }
</script>