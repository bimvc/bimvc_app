<template>
    <v-container>
        <v-layout>
            <v-flex md12 sm12 xs12>
                <h1 class="title mb-3">Пройденные тестирования:</h1>

                <div 
                    v-if="!testsResult.length" 
                    style="
                        display: flex; 
                        align-items: center; 
                        justify-content: center; 
                        height: 300px; 
                        width: 100%;">
                    <v-progress-circular 
                        indeterminate 
                        color="primary"
                        center="true"> 
                    </v-progress-circular>  
                </div>

                <div 
                    v-if="testsResult.length" 
                    v-for="test in testsResult">
                    <h1 class="subheading mb-3">{{ test.name }}</h1>
                    <v-data-table
                        :headers="headers"
                        :items="test.blocks"
                        hide-actions
                        class="elevation-1">
                        <v-progress-linear slot="progress" color="blue" indeterminate></v-progress-linear>
                        <template slot="items" slot-scope="props">
                            <td>{{ props.item.name }}</td>
                            <td class="text-md-center">{{ props.item.result }} %</td>
                            <td class="text-md-center">{{ props.item.rules.successPrecent}} %</td>
                            <td class="text-md-center">
                                <v-icon color="orange" medium v-if="props.item.result > props.item.rules.successPrecent">done</v-icon>
                            </td>
                        </template>
                       <template slot="footer">
                          <td colspan="100%" style="text-align: right;">
                            <v-btn color="info" v-on:click="loadCertificate(test.name)">Сертификат</v-btn>
                          </td>
                        </template>
                    </v-data-table>
                </div>

            </v-flex>
        </v-layout>
        <v-dialog v-model="dialog" max-width="290">
            <v-card>

            </v-card>
        </v-dialog>
    </v-container>
</template>
<script>
    import { mapState } from 'vuex';
    export default {
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
                    { text: 'Выполнено на', value: 'result', align: 'center' },
                    { text: 'Процент прохождения', value: 'rules.successPrecent', align: 'center' },
                    { text: 'Пройдено', align: 'center' }
                ],
            }
        },
        computed: {
            ...mapState([
                'isAuth',
                'testPassing',
                'testsList'
            ]),
            testsResult() {
                return this.testsList.map(t => {
                    t.blocks.map(b => {
                        b.result = this.testPassing
                            .filter(p => p.testid === +b.id)
                            .sort((p1, p2) => p1.sessionid < p2.sessionid);
                        if (b.result[0] && b.result[0].hasOwnProperty('ResultNum')) {
                            b.result = Math.ceil(b.result[0].ResultNum);
                        }else{
                            b.result = 0;
                        }

                        return b;
                    })

                    t.blockResult = 0;
                    t.blocks.forEach(b => t.blockResult += b.result);
                    t.blockResult = t.blockResult % t.blocks.length;

                    return t;
                });
            }
        },
        methods:{
            loadCertificate(name) {
                this.$store.dispatch('generateCerificate', { 
                    courseName: name, 
                    date: 'test', 
                    result: 100 
                });
            }
        }
    };
</script>