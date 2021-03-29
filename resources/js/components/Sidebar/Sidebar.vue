<!-- Side Structure -->
<template>
  	<div class="sidebar" :class="sidebarSelectedFilter.class">
    	<vue-perfect-scrollbar class="scroll-area" :settings="settings">
        <v-toolbar flat class="transparent scroll-area navigation">
          <v-list>
				<app-logo></app-logo>
				<template v-for="(category, key) in filteredList">
					<div :key="key">
						<!-- <div class="sidebar-title px-3">
							<span>{{$t(key)}}</span>
						</div> -->
						<template v-for="item in category">
							<template v-if="item.items != null">
								<v-list-group
									:key="item.title"
									prepend-icon="arrow_right"
									append-icon=""
									no-action
									v-model="item.active"
								>
									<v-list-tile slot="activator">
										<v-list-tile-content>
											<v-list-tile-title  v-if="item.items!= null">
												<i class="mr-3 zmdi" :class="item.action"></i>
												<span >{{ textTruncate($t(item.title)) }}</span>
											</v-list-tile-title>
											
										</v-list-tile-content>
									</v-list-tile>
									<v-list-tile
										v-for="subItem in item.items"
										v-bind:key="subItem.title"
										v-if="subItem !== null"
										:to="!subItem.exact ? `/${getCurrentAppLayoutHandler() + subItem.path}` : subItem.path"
									>
										<v-list-tile-content>
											<v-list-tile-title>{{ textTruncate($t(subItem.title)) }}</v-list-tile-title>
										</v-list-tile-content>
									</v-list-tile>
								</v-list-group>
							</template>	
							<!-- <template v-else>
								<v-list-group
									class="not-submenu"
									:key="item.title"
									prepend-icon="arrow_right"
									append-icon=""
									no-action
									v-model="item.active"
								>
									<v-list-tile slot="activator">
										<v-list-tile-content >
											<v-list-tile-title>
												<router-link :to="!item.exact ? `/${getCurrentAppLayoutHandler() + item.path}` : item.path">
													<i class="mr-3 zmdi" :class="item.action"></i>
													<span>{{ textTruncate($t(item.title)) }}</span>
												</router-link>
											</v-list-tile-title>
										</v-list-tile-content>
									</v-list-tile>
									
								</v-list-group>
							</template>	 -->
						</template>
					</div>
				</template>
          </v-list>
        </v-toolbar>
    	</vue-perfect-scrollbar>
  	</div>
</template>

<script>

import { mapGetters } from "vuex";
import { mapActions } from 'vuex'
import AppLogo from "Components/AppLogo/AppLogo";
import { textTruncate, getCurrentAppLayout } from "Helpers/helpers";
import {	mapState 	} from "vuex";
export default {
  data() {
    return {
	 
      settings: {
        maxScrollbarLength: 160
      }
    };
  },
  components: {
    AppLogo
  },  
	watch: {
		"languages" : function(){
			this.initsidebard();
		}
	},
  computed: {
	  search:{
	get() {
      return this.$store.state.sidebar.search;
	}
	},
	languages:{
	get() {
      return this.$store.state.settings.selectedLocale;
	}
	},
   ...mapGetters(["sidebarSelectedFilter", "menus"]),
   filteredList() {
	   if(this.search == ''){
		this.initsidebard();
		return this.menus;
	}
	 var aux = this.menus;
	 var data = Array.from(aux['message.general']).map((element, index)=> {
		return element.items.filter(post=>{
			return post.title.toLowerCase().includes(this.search.toLowerCase())
		});
	 });
	for (let index = 0; index < Array.from(aux['message.general']).length; index++) {
		 aux['message.general'][index].items = data[index];
		
	}
	return aux;
      
    }
  },
  methods: {
	  async initsidebard(){
		this.menus['message.general']= await this.getRoleMenu();
		var aux = '';
		for (let index = 0; index < Array.from(this.menus['message.general']).length; index++) {
			aux = 'message.'+this.menus['message.general'][index].title;
			this.menus['message.general'][index].title = this.$t(String(aux));
			for (let index2 = 0; index2 < Array.from(this.menus['message.general'][index].items).length; index2++) {
				aux = 'message.'+this.menus['message.general'][index].items[index2].title;
				this.menus['message.general'][index].items[index2].title = this.$t(String(aux));
			}		
		}
	  },
	 ...mapActions(['getRoleMenu']), 
	textTruncate(text) {
        return textTruncate(text, 18);
      },
      getCurrentAppLayoutHandler() {
       
        return getCurrentAppLayout(this.$router);
      },
	
	
  },
     beforeMount(){
		this.initsidebard();		
  }
}
</script>
