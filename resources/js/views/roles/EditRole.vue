<template>
	<div>
		<page-title-bar></page-title-bar>
		<v-container grid-list-xl fluid pt-0>
			<app-card>
				<!-- <v-layout row wrap>
					<v-flex xs12 sm4>
						<span class="pt-4 d-block">Role Name</span>
					</v-flex>
					<v-flex xs12 sm6>
						<v-text-field v-model="name" placeholder="Enter role name"></v-text-field>
						<v-btn class="btn-gradient-primary" v-on:click="postRole()">Submit</v-btn>
					</v-flex>
				</v-layout> -->
        <v-btn class="btn-gradient-success" v-if="update == true" v-on:click="savePermit()">{{$t('message.submit')}}</v-btn>
                        <v-container v-for="prueba in test" v-bind:key="prueba">
                            <h1>{{ $t(prueba.parent) }}</h1>
                             <v-data-table
                            v-bind:headers="headers"
                            v-bind:items="prueba.child"
                            v-bind:key="prueba2"
                            :rows-per-page-items="[prueba.child.length]">
                                  <template slot="items" slot-scope="props">
                                      <!-- <v-container v-for="prueba3 in props.item.permits" v-bind:key="prueba3">   -->
                                        <td>{{ $t(props.item.name) }}</td>
                                        <td><v-switch v-model="permit" color="red" :value="props.item.id+'-1'" hide-details></v-switch></td>
                                        <td><v-switch v-model="permit" color="indigo" :value="props.item.id+'-2'" hide-details></v-switch></td>
                                        <td><v-switch v-model="permit" color="orange" :value="props.item.id+'-3'" hide-details></v-switch></td>
                                        <td><v-switch v-model="permit" color="primary" :value="props.item.id+'-4'" hide-details></v-switch></td>
                                      <!-- </v-container>   -->
                                    </template>
                            </v-data-table>
                        </v-container>
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
  data ()
  {
    return {
	    y: "top",
      x: 'right',
      mode: "",
      mode2: "",
      timeout: 6000,
      text: "Hello, I'm a snackbar",
      headers: [
        {
          text: this.$t('message.name'),
          align: "left",
          sortable: false,
		  value: "name",
		  dark: true,
		},
        {
          text:this.$t('message.create'),
          align: "left",
          sortable: false,
		  value: "name",
		  dark: true,
		},
		{
          text: this.$t('message.read'),
		  value: "auxItem",
		  sortable: false,
        },
        {
          text: this.$t('message.update'),
		  value: "auxItem",
		  sortable: false,

        },
        {
          text: this.$t('message.delete'),
		  value: "auxItem",
		  sortable: false,
		}
      ]
    };
  },
watch:{
  ex11:function(new_value,old){
    console.log("new: "+new_value);
    console.log("old: "+old);
  }
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
   test: {
     get() {
       return this.$store.state.role.test;
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
   permit: {
     get() {
       return this.$store.state.role.permit;

   },
   set(value) {
      this.$store.commit("role/setPermit", value);
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
	  ...mapActions('role',['getRoleIdEdit','savePermit']),
		...mapActions({getPermitByRoleModule: 'permit/getPermitByRoleModule'}),
  },
  mounted(){
    this.getRoleIdEdit();
		this.getPermitByRoleModule(7);
  }
})
</script>
