<template>
	<v-container>
		<v-layout>
			<v-flex md6 sm8 xs12 offset-md3 offset-sm2 offset-lg0>
			<h2 class="title mb-2">Личные данные:</h2>
			<div 
				v-if="updateUserInfoInProgress" 
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
			<v-form 
				ref="form" 
				v-model="valid" 
				lazy-validation
				v-if="name && !updateUserInfoInProgress">
				<v-text-field
				  v-model="email"
				  :rules="emailRules"
				  label="E-mail"
				  disabled
				></v-text-field>
				<v-text-field
				  v-model="setName"
				  :rules="nameRules"
				  label="Имя"
				  
				></v-text-field>
				<v-text-field
				  v-model="setSurname"
				  :rules="surnameRules"
				  label="Фамилия"
				 
				></v-text-field>
				<v-text-field
				  v-model="setCity"
				  :rules="cityRules"
				  label="Город"
				></v-text-field>
				<v-select
				  v-model="setStatus"
				  :items="items"
				  label="Статус"
				></v-select>
				<v-text-field
				  v-model="setCompany"
				  require
				  label="Вуз / Место работы"
				></v-text-field>
				<div class="mt-3">
					<v-btn
					  :disabled="!valid"
					  @click="submit"
					  block
					>
					  {{!saving?'Сохранить':''}}
	  					<v-progress-circular
	  						v-if="saving"
							indeterminate 
							color="primary"
							center="true"> 
						</v-progress-circular>	
					</v-btn>
				</div>
			</v-form>
		    </v-flex>
		</v-layout>
	</v-container>			
</template>

<script>
import { mapState } from 'vuex';	
export default {
	data: () => ({
    	formName: null, 
    	formSurname: null,
    	formCity: null,
    	formCompany: null,
    	formStatus: null,
		valid: true,
		nameRules: [v => !!v || 'Введите имя'],
		surnameRules: [v => !!v || 'Введите фамилию'],
		cityRules: [v => !!v || 'Введите город'],
		workPlaceRules: [v => !!v || 'Введите вуз или место работы'],
		emailRules: [
			v => !!v || 'Введите e-mail',
			v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'Неверный формат e-mail'
		],
		items: [
			'Школьник',
			'Студент',
			'Инженер',
			'Преподаватель'
		],
		saving: false
	}),
	computed:{
        ...mapState([
	        'name',
	        'surname',
	        'email',
	        'city',
	        'company',
	        'status',
	        'updateUserInfoInProgress'
        ]),
        setName: {
        	get() {
        		return this.name;
        	},
        	set(v) {
        		this.formName = v;
        	}
        },
        setSurname: {
        	get() {
        		return this.surname;
        	},
        	set(v) {
        		this.formSurname = v;
        	}
        },
        setCity: {
        	get() {
        		return this.city;
        	},
        	set(v) {
        		this.formCity = v;
        	}
        },
        setCompany: {
        	get() {
        		return this.company;
        	},
        	set(v) {
        		this.formCompany = v;
        	}
        },
        setStatus: {
        	get() {
        		return this.status;
        	},
        	set(v) {
        		this.formStatus = v;
        	}
        }
	},
	methods: {
	  clear () {
	    this.$refs.form.reset()
	  },
	  async submit () {
	  	this.saving = true;
	    await this.$store.dispatch('updateUserInfo', { 
	    	name: this.formName || this.name, 
	    	surname: this.formSurname || this.surname,
	    	city: this.formCity || this.city,
	    	company: this.formCompany || this.company,
	    	status: this.formStatus || this.status
	    });

	    this.saving = false;
	  }
	}
}
</script>