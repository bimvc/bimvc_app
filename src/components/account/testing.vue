<template>
    <v-app>
        <v-subheader>{{ tests.name }}</v-subheader>
        <v-card>
            <v-data-table
                :headers="headers"
                :items="tests.blocks"
                hide-actions
                class="elevation-1">
                <template slot="items" slot-scope="props">
                    <td>{{ props.item.name }}</td>
                    <td class="text-xs-right">{{ props.item.result }}</td>
                    <td class="text-xs-right">{{ props.item.rules.successPrecent}}</td>
                </template>
            </v-data-table>
        </v-card>
        <v-layout>
            <v-flex xs12 sm12 offset6 text-xs-right>
                <v-btn @click.stop="dialog = true" small>Сертификат</v-btn>
            </v-flex>
        </v-layout>
        <v-dialog v-model="dialog" max-width="290">
            <v-card>
                <v-card-title class="headline">Use Google's location service?</v-card-title>
                <v-card-text>Let Google help apps determine location. This means sending anonymous location data to Google, even when no apps are running.</v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="green darken-1" flat="flat" @click.native="dialog = false">Disagree</v-btn>
                    <v-btn color="green darken-1" flat="flat" @click.native="dialog = false">Agree</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-app>
</template>
<script>
    import { mapState } from 'vuex';
    export default {
        computed: {
            ...mapState([
                'tests'
            ])
        },
        created() {
            this.$store.dispatch('loadTestInfo')
        },
        data () {
            return {
                dialog: false,
                headers: [
                    {
                        text: 'Название блока',
                        align: 'left',
                        sortable: false,
                        value: 'name'
                    },
                    { text: 'Процент выполнения', value: 'result' },
                    { text: 'Процент прохождения', value: 'rules.successPrecent' }
                ],
                items: [
                    {
                        value: false,
                        name: 'Frozen Yogurt',
                        calories: 159,
                        fat: 6.0,
                        carbs: 24,
                        protein: 4.0,
                        iron: '1%'
                    },
                    {
                        value: false,
                        name: 'Ice cream sandwich',
                        calories: 237,
                        fat: 9.0,
                        carbs: 37,
                        protein: 4.3,
                        iron: '1%'
                    },
                    {
                        value: false,
                        name: 'Eclair',
                        calories: 262,
                        fat: 16.0,
                        carbs: 23,
                        protein: 6.0,
                        iron: '7%'
                    },
                    {
                        value: false,
                        name: 'Cupcake',
                        calories: 305,
                        fat: 3.7,
                        carbs: 67,
                        protein: 4.3,
                        iron: '8%'
                    },
                    {
                        value: false,
                        name: 'Gingerbread',
                        calories: 356,
                        fat: 16.0,
                        carbs: 49,
                        protein: 3.9,
                        iron: '16%'
                    },
                    {
                        value: false,
                        name: 'Jelly bean',
                        calories: 375,
                        fat: 0.0,
                        carbs: 94,
                        protein: 0.0,
                        iron: '0%'
                    },
                    {
                        value: false,
                        name: 'Lollipop',
                        calories: 392,
                        fat: 0.2,
                        carbs: 98,
                        protein: 0,
                        iron: '2%'
                    },
                    {
                        value: false,
                        name: 'Honeycomb',
                        calories: 408,
                        fat: 3.2,
                        carbs: 87,
                        protein: 6.5,
                        iron: '45%'
                    },
                    {
                        value: false,
                        name: 'Donut',
                        calories: 452,
                        fat: 25.0,
                        carbs: 51,
                        protein: 4.9,
                        iron: '22%'
                    },
                    {
                        value: false,
                        name: 'KitKat',
                        calories: 518,
                        fat: 26.0,
                        carbs: 65,
                        protein: 7,
                        iron: '6%'
                    }
                ]
            }
        }
    };
</script>