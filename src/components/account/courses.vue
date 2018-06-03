<template>
    <v-container>
        <v-layout>
            <v-flex md12 sm12 xs12>
              <v-jumbotron color="lighten-2">
                <v-container fill-height>
                  <v-layout align-center>
                    <v-flex>
                      <h3 class="display-3">База знаний</h3>
                      <span class="subheading">
                        <p>Миссия Vysotskiy Consulting — распространение профессиональных знаний по эффективной работе в BIM-среде.</p>
                        <p>Помимо основной работы, мы уделяем большое внимание публикации открытой информации по информационному моделированию, доступной для всех посетителей нашего ресурса.</p>
                    </span>
                    <a href="https://bim.vc/base" target="_blank"><v-btn large color="primary" class="mx-0">Перейти к курсам</v-btn></a>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-jumbotron>
            </v-flex>
        </v-layout>
    </v-container>
</template>
<script>
    import { mapState } from 'vuex';
    export default {
        data () {
            return {

            }
        },
        computed: {

        }
    };
</script>