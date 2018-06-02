<template>
    <v-app id="inspire">
        <v-progress-linear 
          v-if="isAuth" 
          :indeterminate="true" 
          style="height: 5px; margin: 0;">
        </v-progress-linear>
        <v-content v-if="!isAuth">
            <v-container fluid fill-height>
                <v-layout align-center justify-center>
                    <v-flex xs12 sm8 md4>
                        <v-card class="elevation-12" v-if="passwordRecoveryMode">
                            <v-progress-linear :indeterminate="signInProcess || passwordRecoveryStart"></v-progress-linear>
                            <v-btn icon large>
                                <img width="32px" src="http://bim.vc/wp-content/themes/vysotsky_theme/img/VC.jpg" >
                            </v-btn>
                            <v-card-text>
                                <v-form v-model="valid" ref="passwordRecoveryForm" lazy-validation>
                                    <v-text-field
                                            v-model="email"
                                            name="login"
                                            label="Электронная почта"
                                            :rules="emailRules"
                                            type="text" required>
                                    </v-text-field>
                                </v-form>
                            </v-card-text>
                            <v-card-text v-if="showRecoveryText">
                                <p>На ваш email отправлено письмо с инструкциями.</p>
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="primary" v-on:click="passwordRecovery">Восстановить</v-btn>
                            </v-card-actions>
                        </v-card>

                        <v-card class="elevation-12" v-if="!passwordRecoveryMode">
                            <v-progress-linear :indeterminate="signInProcess"></v-progress-linear>
                            <v-btn icon large>
                                <img width="32px" src="http://bim.vc/wp-content/themes/vysotsky_theme/img/VC.jpg" >
                            </v-btn>
                            <v-card-text>
                                <v-form v-model="valid" ref="form" lazy-validation>
                                    <v-text-field
                                            v-model="email"
                                            name="login"
                                            label="Электронная почта"
                                            :rules="emailRules"
                                            type="text" required>
                                    </v-text-field>
                                    <v-text-field
                                        v-model="password"
                                          name="password"
                                          label="Пароль"
                                          id="password"
                                          type="password" required>
                                    </v-text-field>
                                </v-form>
                            </v-card-text>
                            <v-card-actions>
                                <a href="#" @click="setPasswordRecoveryMode">Забыли пароль?</a>
                                <v-spacer></v-spacer>
                                <v-btn color="primary" v-on:click="registration">Регистрация</v-btn>
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
            valid: false,
            email: '',
            emailRules: [
                v => !!v || 'Укажите почту',
                v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'Неверная почта'
            ],
            password: '',
            passwordRules: [
                v => !!v || 'Укажите пароль'
            ],
            passwordRecoveryMode: false,
            passwordRecoveryStart: false,
            showRecoveryText: false
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
                if (!this.$refs.form.validate()) {
                    return;
                }
                await this.$store.dispatch('signIn', { email: this.email, password: this.password });
                this.$router.push('account');
            },
            async passwordRecovery() {
                this.passwordRecoveryStart = true;
                await this.$store.dispatch('passwordRecovery', { email: this.email });
                this.passwordRecoveryStart = false;
                this.showRecoveryText = true;
            },
            setPasswordRecoveryMode() {
                this.passwordRecoveryMode = !this.passwordRecoveryMode;
            },
            registration() {
                this.$router.push('registration');
            }
        }
    }
</script>