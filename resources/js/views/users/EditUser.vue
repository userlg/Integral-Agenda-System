<template>
	<div>
		<page-title-bar></page-title-bar>
		<v-container grid-list-xl fluid pt-0>
			<app-card>
	<div class="session-wrapper">
		<!-- <div class="session-left">
			<session-slider-widget></session-slider-widget>
		</div> -->
		<div class="session-center text-xs-center">
			<div class="session-table-cell">
				<div class="session-content">
					<!-- <h2 class="mb-3">{{$t('message.signUp')}}</h2>
					<p class="fs-14">{{$t('message.havingAnAccount')}}
						<router-link to="/session/login">{{$t('message.login')}}</router-link>
					</p> -->
					<v-form v-model="valid" class="mb-4">
						<v-text-field
							:placeholder="$t('message.username')"
							v-model="user.name"
							:rules="nameRules"
							:counter="20"
							required
						></v-text-field>
						<v-text-field
							:placeholder="$t('message.email')"
							v-model="user.email"
							:rules="emailRules"
							required
						></v-text-field>
						<v-text-field
							:placeholder="$t('message.password')"
							v-model="user.password"
							:rules="passwordRules"
							type="password"
							required
						></v-text-field>
						<v-flex xs12 sm6>
							<v-select  hide-details
							v-bind:items="items"
							item-text="role"
  						item-value="id"
							v-model="user.role_id"
							:placeholder="$t('message.role')"
							single-line
							menu-props="bottom" ></v-select>
						</v-flex>
						    <v-btn large block color="primary" v-if="update == true" v-on:click="updateUser()" class="mb-3">{{$t('message.submit')}}</v-btn>
					    </v-form>
                    </div>
                </div>
            </div>

        </div>
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
      color: "",
      valid: false,
	  name: "",
      nameRules: [
        v => !!v || "Name is required",
        v => v.length <= 20 || "Name must be less than 20 characters"
      ],
      email: "",
      emailRules: [
        v => !!v || "E-mail is required",
        v =>
          /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
          "E-mail must be valid"
      ],
      password: "",
      passwordRules: [v => !!v || "Password is required"],
	  	role_id:null,
    };
  },
   computed: {
	items: {
    get() {
      return this.$store.state.user.items_role;
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
  user: {
    get() {
      return this.$store.state.user.user;
	},
	set(value) {
      this.$store.commit("user/setUser", value);
     }
  },
 },
  methods:{
	   ...mapActions('user', ['getRoles', 'getUserId','updateUser']),
		 ...mapActions({getPermitByRoleModule: 'permit/getPermitByRoleModule'}),

    },
    beforeMount(){
        this.getRoles();
        this.getUserId();
				this.getPermitByRoleModule(6);

    }
})
</script>
