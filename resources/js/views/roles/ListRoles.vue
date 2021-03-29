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
					<v-card-title>Roles
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
							<td>{{ props.item.role}}</td>
							<td v-if="update == true">
	        					<v-btn v-if="update == true" color="primary" dark v-on:click="getRoleId(props)">{{$t('message.edit')}}</v-btn>
										<v-btn v-if="deletePermit == true" color="primary" dark v-on:click="deleteRole(props)">{{$t('message.delete')}}</v-btn>
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

export default Vue.extend({
  data() {
    return {
      max25chars: v => v.length <= 25 || "Input too long!",
      tmp: "",
      search: "",
	  pagination: {},
	  snackbar: false,
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
      return this.$store.state.role.items;
	}
  },
  snackbarStatus: {
    get() {
      return this.$store.state.role.snackbarStatus;
	}
  },
  loader: {
    get() {
      return this.$store.state.role.loader;
	}
  },
 },
  methods: {
	  ...mapActions('role', ['getRoles', 'getRoleId', 'deleteRole']),
		...mapActions({getPermitByRoleModule: 'permit/getPermitByRoleModule'}),
		viewAction(){
		  if (this.update == false){
			  this.headers.splice(2)
		  }
		  },
 },
  mounted(){
    	this.getRoles();
  },
  async beforeMount(){
	  await this.getPermitByRoleModule(5);
	  	this.viewAction();
  }
})
</script>
