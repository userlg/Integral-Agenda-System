<template>
	<div>

		<page-title-bar></page-title-bar>
		<app-section-loader :status="loader"></app-section-loader>

  	<v-container fluid>

			<v-layout>
				<app-card
					:fullBlock="true"
					colClasses="xl12 lg12 md12 sm12 xs12"
				>
					<v-card-title>{{$t('message.subdomain')}}
						<v-spacer></v-spacer>
						<!-- <v-text-field
							append-icon="search"
							label="Search"
							single-line
							hide-details
							v-model="search"
						>
						</v-text-field> -->
					</v-card-title>
					<v-data-table
						v-bind:headers="headers"
						v-bind:items="items.data"
						v-bind:search="search"
					>
						<template slot="items" slot-scope="props">
							<td>{{ props.item.id}}</td>
							<td>{{ props.item.name}}</td>
              				<td>{{ props.item.email}}</td>
              				<td>{{ props.item.role}}</td>
							<td>
								<v-btn color="primary" v-if="update == true" dark v-on:click="change(props.item.id)">{{$t('message.edit')}}</v-btn>
	        					<v-btn color="primary" v-if="deletePermit == true" dark v-on:click="deleteUser(props)">{{$t('message.delete')}}</v-btn>
								<!--	<v-btn class="btn-gradient-success" v-on:click="ShowParameters()">Parameters</v-btn>
								<v-btn class="btn-gradient-warning" v-on:click="postCompany()">Delete</v-btn>-->
							</td>
						</template>

					</v-data-table>
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
			</v-layout>
  	</v-container>
	</div>


</template>


<script>
import Vue from 'vue'
import axios from 'axios'
import { mapActions } from 'vuex'
import Full from 'Container/Full'

export default Vue.extend({
  data() {
    return {
		name: this.$t('message.name'),
      max25chars: v => v.length <= 25 || "Input too long!",
      tmp: "",
      search: "",
	  	pagination: {},
		  id:'',
			y: "top",
			x: 'right',
      mode: "",
      mode2: "",
      timeout: 6000,
      text: "Hello, I'm a snackbar",
      headers: [
		{
          text:this.$t('message.id'),
          align: "left",
          sortable: false,
		  value: "name",
		  dark: true,
		},
        {
          text:this.$t('message.name'),
          align: "left",
          sortable: false,
		  value: "name",
		  dark: true,
		},
		{
          text: this.$t('message.email'),
				  value: "auxItem",
				  sortable: false,

        },
        {
          text: this.$t('message.role'),
				  value: "auxItem",
				  sortable: false,

		},
		{
          text: this.$t('message.action'),
				  value: "auxItem",
				  sortable: false,

        },
		],

    };
  },

    computed: {
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
		items: {
    get() {
      return this.$store.state.user.items;
	}
  },
  snackbarStatus: {
    get() {
      return this.$store.state.user.snackbarStatus;
	}
  },
  loader: {
    get() {
      return this.$store.state.user.loader;
	}
  },
 },
  methods: {
	  	 change(id){

		this.$router.push({ name: 'edit_user', params: { id: id }});
		},

	...mapActions({getPermitByRoleModule: 'permit/getPermitByRoleModule'}),

  ...mapActions('user', ['getUsers', 'deleteUser']),
  	  viewAction(){
		  if (this.update == false){
			  this.headers.splice(4)
		  }
			},
 },
  mounted(){
	this.getUsers();
	//console.log(this.$t('message.oppositeSlot'));
	//this.testItalo = 	t('message.oppositeSlot');
  },
  async beforeMount() {
	  await this.getPermitByRoleModule(3);
	  	this.viewAction();
  }
})
</script>
