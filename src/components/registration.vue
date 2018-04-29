<template>
    <v-app id="inspire">
        <v-content>
            <v-container fluid fill-height>
                <v-layout align-center justify-center>
                    <v-flex xs12 sm8 md4>
                        <v-card class="elevation-12">
                            <v-progress-linear
                                :indeterminate="registrationProcess && !awaitEmailConfirm">
                            </v-progress-linear>
                            <v-btn icon large>
                                <img width="32px" src="http://bim.vc/wp-content/themes/vysotsky_theme/img/VC.jpg" >
                            </v-btn>
                            <v-card-text v-if="!awaitEmailConfirm">
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
                                        label="Придумайте пароль"
                                        :rules="passwordRules"
                                        id="password"
                                        type="password" required>
                                    </v-text-field>
                                    <v-text-field
                                        v-model="name"
                                        name="name"
                                        label="Имя"
                                        :rules="nameRules"
                                        id="name"
                                        type="text" required>
                                    </v-text-field>
                                    <v-text-field
                                        v-model="surname"
                                        name="surname"
                                        label="Фамилия"
                                        :rules="surnameRules"
                                        id="surname"
                                        type="text" required>
                                    </v-text-field>
                                    <v-text-field
                                        v-model="company"
                                        name="company"
                                        label="Компания/ВУЗ"
                                        :rules="companyRules"
                                        id="company"
                                        type="text" required>
                                    </v-text-field>
                                    <v-text-field
                                        v-model="city"
                                        name="city"
                                        label="Город"
                                        id="city"
                                        :rules="cityRules"
                                        type="text" required>
                                    </v-text-field>
                                </v-form>
                            </v-card-text>
                            <v-card-text v-if="awaitEmailConfirm">
                                Письмо с подтверждением регистрации отправлено на {{email}}
                            </v-card-text>
                            <v-card-actions v-if="!awaitEmailConfirm">
                                <v-spacer></v-spacer>
                                <v-btn color="primary" v-on:click="registration">Регистрация</v-btn>
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
                v => !!v || 'Укажите пароль',
                v => v.length >= 7 || 'Пароль должен быть больше 6 символов'
            ],
            name: '',
            nameRules: [
                v => !!v || 'Укажите имя',
                v => v.length <= 10 || 'Имя должно быть меньше 10 символов'
            ],
            surname: '',
            surnameRules: [
                v => !!v || 'Укажите фамилию',
            ],
            company: '',
            companyRules: [
                v => !!v || 'Укажите компанию',
            ],
            city: '',
            cityRules: [
                v => !!v || 'Укажите город',
            ]
        }),
        props: {
            source: String
        },
        computed: {
            ...mapState([
                'isAuth',
                'signInProcess',
                'awaitEmailConfirm',
                'registrationProcess'
            ])
        },
        methods: {
            async registration() {
                if (!this.$refs.form.validate()) {
                    console.log('invalid');
                }
                await this.$store.dispatch('registration', {
                    email: this.email,
                    password: this.password,
                    name: this.name,
                    surname: this.surname
                });


            }
        }
    }
</script>