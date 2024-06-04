export class SidebarElements {
    name: string = '';
    icon: string = '';
    route_array: any [] = [];
    route: string = '';
    group: string = '';
    dropdown_Array : SidebarElements [] = [];
    show: string = '';
    function: string = ''
}

export const sidebarArray: SidebarElements[] = [
    {   name: 'Dashboard', 
        icon: '', 
        route_array: ['/dashboard'],
        route: 'dashboard',
        group: 'top',
        dropdown_Array: [],
        show: '',
        function: ''
    },

    {   name: 'Package', 
        icon: '', 
        route_array: ['/package'],
        route: 'package',
        group: 'top',
        dropdown_Array: [],
        show: '',
        function: ''
    },

    {   
    name: 'Visa', 
    icon: '', 
    route_array: ['/visa','/visa/edit','/visa'],
    route: '/visa',
    group: 'top',
    show: 'showTranslation',
    function: '',
    dropdown_Array: [],
    },

    {  
     name: 'Labor Recruitment', 
    icon: '', 
    route_array: ['/recruitment'],
    route: 'recruitment',
    group: 'top',
    dropdown_Array: [],
    show: '',
    function: ''
},

{  
    name: 'Accounting', 
   icon: '', 
   route_array: ['/accounting'],
   route: 'accounting',
   group: 'top',
   dropdown_Array: [],
   show: '',
   function: ''
},

{  
    name: 'Admins', 
   icon: '', 
   route_array: ['/admins', '/admins/add', '/admins/edit'],
   route: 'admins',
   group: 'bottom',
   dropdown_Array: [],
   show: '',
   function: ''
},

{  
    name: 'Log out', 
   icon: '', 
   route_array: ['/settings'],
   route: 'settings',
   group: 'bottom',
   dropdown_Array: [],
   show: '',
   function: 'logout()'
},
]