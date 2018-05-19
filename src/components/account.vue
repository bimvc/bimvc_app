<template>
  <v-app>
    <v-navigation-drawer
            
            app
            mobile-break-point="600"
            
            v-model="drawer"
    >
      <v-list dense>
        <template v-for="item in items">
          <v-layout
                  row
                  v-if="item.heading"
                  align-center
                  :key="item.heading"
          >
            <v-flex xs6>
              <v-subheader v-if="item.heading">
                {{ item.heading }}
              </v-subheader>
            </v-flex>
            <v-flex xs6 class="text-xs-center">
              <a href="#!" class="body-2 black--text">EDIT</a>
            </v-flex>
          </v-layout>
          <v-list-group
                  v-else-if="item.children"
                  v-model="item.model"
                  :key="item.text"
                  :prepend-icon="item.model ? item.icon : item['icon-alt']"
                  append-icon=""
                  @click="goTo(item.path)"
          >
            <v-list-tile slot="activator">
              <v-list-tile-content>
                <v-list-tile-title>
                  {{ item.text }}
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile
                    v-for="(child, i) in item.children"
                    :key="i"
                    @click="goTo(item.path)"
            >
              <v-list-tile-action v-if="child.icon">
                <v-icon>{{ child.icon }}</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>
                  {{ child.text }}
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list-group>
          <v-list-tile v-else @click="goTo(item.path)" :key="item.text">
            <v-list-tile-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>
                {{ item.text }}
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar
            color="white"
            app
            :clipped-left="$vuetify.breakpoint.lgAndUp"
            fixed
    >
      <v-toolbar-title style="width: 300px" class="ml-0 pl-3">
        <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
        <v-btn icon large>
          <img
                  width="32px"
                  src="http://bim.vc/wp-content/themes/vysotsky_theme/img/VC.jpg"
                  alt="Vuetify"
          >
        </v-btn>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-icon color="red">home</v-icon>
    </v-toolbar>
    <v-content>
      <v-container fluid>
        <v-layout>
          <router-view></router-view>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
    export default {
        data: () => ({
            dialog: false,
            drawer: true,
            items: [
                { icon: 'content_copy', text: 'Курсы', path: 'courses'},
                { icon: 'check_box', text: 'Тестирования', path: 'testing'},
                { icon: 'settings', text: 'Настройки', path: 'edit'},

                // { icon: 'settings', text: 'Настройки'},
                // { icon: 'content_copy', text: 'План обучения' },
                // { icon: 'content_copy', text: 'Видео курсы' },
                // { icon: 'content_copy', text: 'Баллы' },
                // { icon: 'content_copy', text: 'Вакансии' },
                //
                //   { icon: 'contacts', text: 'Contacts' },
                // { icon: 'history', text: 'Frequently contacted' },
                // { icon: 'content_copy', text: 'Duplicates' },
                //
                //
                // {
                //   icon: 'keyboard_arrow_up',
                //   'icon-alt': 'keyboard_arrow_down',
                //   text: 'Labels',
                //   model: true,
                //   children: [
                //     { icon: 'add', text: 'Create label' }
                //   ]
                // },
                // {
                //   icon: 'keyboard_arrow_up',
                //   'icon-alt': 'keyboard_arrow_down',
                //   text: 'More',
                //   model: false,
                //   children: [
                //     { text: 'Import' },
                //     { text: 'Export' },
                //     { text: 'Print' },
                //     { text: 'Undo changes' },
                //     { text: 'Other contacts' }
                //   ]
                // },
                // { icon: 'settings', text: 'Settings' },
                // { icon: 'chat_bubble', text: 'Send feedback' },
                // { icon: 'help', text: 'Help' },
                // { icon: 'phonelink', text: 'App downloads' },
                // { icon: 'keyboard', text: 'Go to the old version' }
            ]
        }),
        props: {
            source: String
        },
        methods: {
            goTo (path) {
                return this.$router.push('/account/'+path);
            }
        },
    }
</script>