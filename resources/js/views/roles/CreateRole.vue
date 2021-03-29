<template>
	<div>
		<page-title-bar></page-title-bar>
		<v-container grid-list-xl fluid pt-0>
			<app-card>
				<!-- <app-section-loader :status="loader"></app-section-loader> -->
				<v-progress-linear :indeterminate="true" :active="indeterminate" color="green"></v-progress-linear>

				<v-layout row wrap>
					<v-flex xs12 sm4>
						<span class="pt-4 d-block">{{$t('message.rolename')}}</span>
					</v-flex>
					<v-flex xs12 sm6>
						<v-text-field v-model="name" :placeholder="$t('message.name')"></v-text-field>
						<v-btn class="btn-gradient-primary" v-if="create == true" v-on:click="postRole()">{{$t('message.submit')}}</v-btn>
					</v-flex>

				</v-layout>
				<v-snackbar
					:timeout="timeout"
					:top="y === 'top'"
					:bottom="y === 'bottom'"
					:right="x === 'right'"
					:left="x === 'left'"
					:multi-line="mode === 'multi-line'"
					:vertical="mode === 'vertical'"
					:color="snackbarStatus.color"
					v-model="snackbarStatus.status"
											>
						{{ snackbarStatus.text }}
					<v-btn color="error" @click.native="snackbarStatus.status = false">{{ $t('message.close') }}</v-btn>
				</v-snackbar>
			</app-card>
		</v-container>
	</div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import { mapActions } from 'vuex'
export default Vue.extend({
 //el: '#app',
  data ()
  {
    return {
	  loader: false,
	  y: "top",
      x: 'right',
      mode: "",
      mode2: "",
      timeout: 6000,
      text: "Hello, I'm a snackbar",
    };
  },
   computed: {
   name: {
     get() {
       return this.$store.state.role.name;
 	},
 	set(value) {
      this.$store.commit("role/setName", value);
     }
  },
	create: {
		get() {
			return this.$store.state.permit.create;
		}
	},
	read: {
		get() {
			return this.$store.state.permit.read;
		}
	},
	update: {
		get() {
			return this.$store.state.permit.update;
		}
	},
	deletePermit: {
		get() {
			return this.$store.state.permit.deletePermit;
		}
	},
  snackbarStatus: {
    get() {
      return this.$store.state.role.snackbarStatus;
	}
  },
  indeterminate: {
    get() {
      return this.$store.state.role.indeterminate;
	}
  },
 },

  methods:{
		...mapActions({getPermitByRoleModule: 'permit/getPermitByRoleModule'}),

	   ...mapActions('role', ['postRole']),
  },
	mounted(){
	//console.log(this.$t('message.oppositeSlot'));
	this.getPermitByRoleModule(4);
	//this.testItalo = 	t('message.oppositeSlot');
	}
})
</script>
