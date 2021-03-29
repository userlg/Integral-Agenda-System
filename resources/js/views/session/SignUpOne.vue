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
					<img
						:src="appLogo"
						class="img-responsive mb-3"
						width="200"
						height="78"
					/>
					<!-- <h2 class="mb-3">{{$t('message.signUp')}}</h2>
					<p class="fs-14">{{$t('message.havingAnAccount')}}
						<router-link to="/session/login">{{$t('message.login')}}</router-link>
					</p> -->
					<v-form v-model="valid" class="mb-4">
						<v-text-field
							:placeholder="$t('message.username')"
							v-model="name"
							:rules="nameRules"
							:counter="20"
							required
						></v-text-field>
						<v-text-field
							:placeholder="$t('message.email')"
							v-model="email"
							:rules="emailRules"
							required
						></v-text-field>
						<v-text-field
							:placeholder="$t('message.password')"
							v-model="password"
							:rules="passwordRules"
							type="password"
							required
						></v-text-field>
						<v-flex xs12 sm6>
							<v-select  hide-details
							v-bind:items="items"
							item-text="role"
  							item-value="id"
							v-model="role_id"
							:placeholder="$t('message.role')"
							single-line
							required
							menu-props="bottom" ></v-select>
						</v-flex>
						<v-btn large v-if="create == true" @click="submit" block color="primary" class="mb-3">{{$t('message.signUp')}}</v-btn>
						<!-- <p>{{$t('message.bySigningUpYouAgreeTo')}} {{brand}}</p>
						<router-link to="">{{$t('message.termsOfService')}}</router-link> -->
					</v-form>

					<!-- <div class="session-social-links d-inline-block">
						<ul class="list-inline">
							<li @click="signInWithFacebook">
								<span class="facebook-bg session-icon">
									<i class="ti-facebook"></i>
								</span>
							</li>
							<li @click="signInWithGoogle">
								<span class="google-bg session-icon">
									<i class="ti-google"></i>
								</span>
							</li>
							<li @click="signInWithTwitter">
								<span class="twitter-bg session-icon">
									<i class="ti-twitter-alt"></i>
								</span>
							</li>
							<li @click="signInWithGithub">
								<span class="github-bg session-icon">
									<i class="ti-github"></i>
								</span>
							</li>
						</ul>
					</div> -->
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
		:color="color"
		v-model="snackbar"
						>
	{{ text }}
	<v-btn color="error" @click.native="snackbar = false">{{ $t('message.close') }}</v-btn>
</v-snackbar>
				</app-card>
		</v-container>
	</div>
</template>

<script>
import SessionSliderWidget from "Components/Widgets/SessionSlider";
import AppConfig from "Constants/AppConfig";
import axios from 'axios'
import { mapActions } from 'vuex'
export default {
  components: {
    SessionSliderWidget
  },
  data() {
    return {
			snackbar: false,
			y: "top",
			x: 'right',
			mode: "",
			mode2: "",
			timeout: 6000,
			text: "Hello, I'm a snackbar",
			color: "",
      valid: false,
		  name: "",
		  items:[],
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
      appLogo: AppConfig.appLogo2,
      brand: AppConfig.brand
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
},
  methods: {

		...mapActions({getPermitByRoleModule: 'permit/getPermitByRoleModule'}),

	  async getRoles(){

		let datos = await axios.get(process.env.MIX_URL+'/api/role/list')
		this.items = datos.data;
		this.loader = false;

		},
    submit() {

      if (this.valid && this.role_id) {
        let userDetail = {
          name: this.name,
				  email: this.email,
				  role_id: this.role_id,
          password: this.password
		};

       this.$store.dispatch("signupUserLaravel", {
          userDetail,
          router: this.$router
        });
      } else {
				this.color = "red";
				this.text = "Missing Fields";
				this.snackbar = true;
			}
		},
  },
    beforeMount(){
    this.getRoles();
		this.getPermitByRoleModule(2);

  }
};
</script>
