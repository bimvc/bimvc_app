<template>
    <v-container>
        <v-layout>
            <v-flex md12 sm12 xs12>
                <h1 class="headline">Статистика тестирования:</h1>
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
                    <h1 class="title mb-3 mt-3">{{ test.name }}</h1>
                    <v-data-table
                        :headers="headers"
                        :items="test.blocks"
                        hide-actions
                        class="elevation-1">
                        <template slot="items" slot-scope="props">
                            <td width="60%">{{ props.item.name }}</td>
                            <td width="10%" class="text-md-center"> {{ props.item.date }}</td>
                            <td width="20%" class="text-md-center">
                                <v-icon color="orange" medium v-if="props.item.result > props.item.rules.successPrecent">done</v-icon>
                            </td>
                        </template>
                       <template slot="footer">
                            <td width="60%" style="height: 110px;">
                                <h2 class="body-1">
                                    Набрано: {{ score(test.blocks) }} баллов
                                    <br>
                                    Минимум: {{ passedScore(test.blocks) }} баллов
                                    <br>
                                    Средний балл: {{ middleScore(test.blocks) }}
                                </h2>   
                            </td>
                            <td width="10%"></td>    
                            <td width="20%" class="text-md-center">
                               <v-progress-circular
                                    v-if="successPrecent(test.blocks) < 100"
                                  :size="80"
                                  :width="10"
                                  :rotate="20"
                                  :value="successPrecent(test.blocks)"
                                  color="red"
                                  class="mt-3 mb-3">
                                  {{ successPrecent(test.blocks) + '%' }}
                                </v-progress-circular>
                                <v-btn
                                    v-if="successPrecent(test.blocks) >= 100" 
                                    color="info" 
                                    v-on:click="loadCertificate(test.name, test.blocks[test.blocks.length - 1].date)">
                                    Сертификат
                                </v-btn>
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
                        value: 'name',
                        sortable: false,
                    },
                    { text: 'Дата', align: 'center', sortable: false },
                    { text: 'Пройдено', align: 'center', sortable: false }
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

                        if (b.result[0] && b.result[0].hasOwnProperty('enddate')) {
                            b.date = b.result[0].enddate.split(' ')[0];
                        } else {
                            b.date = '';
                        }   
                        
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
            loadCertificate(name, date) {
                this.$store.dispatch('generateCerificate', { 
                    courseName: name, 
                    date, 
                    result: 100 
                });
            },
            middleScore(list) {
                return Math.ceil(list
                    .map(i => i.result)
                    .reduce((a,b) => a+b) / list.length);
            },
            score(list) {
                return Math.ceil(list
                    .map(i => i.result)
                    .reduce((a,b) => +a+(+b)));
            },
            passedScore(list) {
                console.log(list
                    .map(i => i.rules.successPrecent)
                    .reduce((a,b) => +a+(+b)))
                return list
                    .map(i => i.rules.successPrecent)
                    .reduce((a,b) => +a+(+b));
            },
            successPrecent(list) {
                return this.score(list) / ((this.passedScore(list) / 100)); 
            }
        }
    };
</script>