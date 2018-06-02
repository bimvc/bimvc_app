<template>
    <v-container>
        <v-layout>
            <v-flex md12 sm12 xs12>
                <h1 class="title mb-3">Тесты:</h1>
                <v-btn color="info" @click="addTestDialog">Добавить тест из Let's Test</v-btn>
            </v-flex>
        </v-layout>

        <v-dialog v-model="dialog" persistent max-width="500px">
          <v-card>
            <v-card-text>
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex xs12 sm12 md12>
                    <div 
                        v-if="savingTest" 
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
                    <v-form ref="form" v-model="testValid" lazy-validation v-if="!savingTest">
                        <v-text-field 
                            v-model="testName" 
                            label="Название теста"
                            :rules="inputRule" 
                            required>
                        </v-text-field>

                        <v-card v-for="(block, i) in testBlocks" class="mt-2">   
                            <v-container>
                                <v-text-field v-model="testBlocks[i].id" type="number" label="id" :rules="inputRule" required></v-text-field>
                                <v-text-field v-model="testBlocks[i].name" label="Название блока" :rules="inputRule" required></v-text-field>
                                <v-text-field v-model="testBlocks[i].rules.successPrecent" label="Правило прохождения (%)" type="number" :rules="inputRule" required></v-text-field>
                            </v-container>
                        </v-card>

                        <v-btn @click="addTestBlock" block class="mt-2">+ Добавить блок</v-btn>
                    </v-form>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card-text>
            <v-card-actions v-if="!savingTest">
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" flat @click.native="dialog = false">Закрыть</v-btn>
              <v-btn color="blue darken-1" flat @click="submit">Сохранить</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

    </v-container>
</template>
<script>
    import { mapState } from 'vuex';
    export default {
        data: () => ({
            dialog: false,
            testValid: false,
            testName: '',
            testBlocks: [],
            inputRule: [v => !!v || 'Необходимо заполнить'],
            savingTest: false
        }),
        methods:{
            addTestDialog: function() {
                this.dialog = !this.dialog;        
                this.testName = '';
                this.testBlocks = [];
                this.savingTest = false;
            },
            addTestBlock: function() {
                this.testBlocks.push({
                    id: '',
                    name: '',
                    rules: {
                        successPrecent: ''
                    }
                });
            },
            async submit () {
                if (this.$refs.form.validate()) {
                    this.savingTest = true;
                    await this.$store.dispatch('addNewLetsTest', { name: this.testName, blocks: this.testBlocks });
                    this.addTestDialog();
                }
            },
        }
    };
</script>