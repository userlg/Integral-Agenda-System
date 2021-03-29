import Full from 'Container/Full'

// role components
const CreateRole = () => import('Views/roles/CreateRole');
const ListRoles = () => import('Views/roles/ListRoles');
const EditRole = () => import('Views/roles/EditRole');

// users components
const ListUsers = () => import('Views/users/ListUsers');
const EditUser = () => import('Views/users/EditUser');

// company components
const SignUp = () => import('Views/session/SignUpOne');

// dashboard components
const Home = () => import('Views/dashboard/Home');

// Pages views
const Blank = () => import('Views/pages/Blank');
const Blank1 = () => import('Views/pages/Blank1');
//Scheduler
const Scheduler = () => import('Views/scheduler/Scheduler');

//Chat
const Chat = () => import('Views/chat/Chat');

//Inbox
const inbox = () => import('Views/inbox/Inbox');

export default {
   path: '/',
   component: Full,
   redirect: '/scm/dashboard/home',
   children: [ ///////Prefijo por defecto=scm, cambiar segun conveniencia a todas las rutas/////
    {
      path: '/scm/tools/list_users',
      component: ListUsers,
      meta:
      {
        requiresAuth: true,
        title: 'message.listusers',
        breadcrumb: 'list_users'
      }
    },
    {
      path: '/scm/tools/sign-up',
      component: SignUp,
      meta:
      {
        requiresAuth: true,
        title: 'message.register',
        breadcrumb: 'sign_up'
      }
    },
    {
      path: '/scm/tools/edit_user/:id',
      name:'edit_user',
      component: EditUser,
      props: true,
      meta:
      {
        requiresAuth: true,
        title: 'message.edituser',
        breadcrumb: 'Edit_user'
      }
    },
    {
      path: '/scm/tools/create_role',
      component: CreateRole,
      meta:
      {
        requiresAuth: true,
        title: 'message.createrole',
        breadcrumb: 'create_role'
      }
    },
    {
      path: '/scm/tools/list_roles',
      component: ListRoles,
      meta:
      {
        requiresAuth: true,
        title: 'message.listroles',
        breadcrumb: 'List_roles'
      }
    },
    {
      path: '/scm/tools/edit_role/:role_id',
      name:'edit_role',
      component: EditRole,
      props: true,
      meta:
      {
        requiresAuth: true,
        title: 'message.editrole',
        breadcrumb: 'Edit_role'
      }
    },
      {
         path: '/scm/dashboard/home',
         component: Home,
         meta: {
            requiresAuth: true,
            title: 'message.home',
            breadcrumb: null
         }
      },
      {
         path: '/scm/pages/blank',
         component: Blank,
         meta: {
            requiresAuth: true,
            title: 'message.blank',

         }
      },
      {
        path: '/scm/module/scheduler',
        component: Scheduler,
        meta: {
           requiresAuth: true,
           title: 'message.blank',

        }
     },
     {
      path: '/scm/module/chat',
      component: Chat,
      meta: {
         requiresAuth: true,
         title: 'message.blank',

      }
   },
   {
    path: '/scm/module/inbox',
    component: inbox,
    meta: {
       requiresAuth: true,
       title: 'message.blank',

    }
 },
      { path: "scm/*", component: Blank1 },
   ]
}
