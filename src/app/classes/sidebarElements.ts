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
        icon: './assets/home.png', 
        route_array: ['/dashboard'],
        route: 'dashboard',
        group: 'top',
        dropdown_Array: [],
        show: '',
        function: ''
    },

    {   name: 'Package', 
        icon: './assets/package.png', 
        route_array: ['/package'],
        route: 'package',
        group: 'top',
        dropdown_Array: [],
        show: '',
        function: ''
    },

    {   
    name: 'Visa', 
    icon: './assets/visa.png', 
    route_array: ['/visa','/visa/edit','/visa'],
    route: '/visa',
    group: 'top',
    show: 'showTranslation',
    function: '',
    dropdown_Array: [],
    },

    {  
     name: 'Labor Recruitment', 
    icon: './assets/labor.png', 
    route_array: ['/recruting'],
    route: 'recruting',
    group: 'top',
    dropdown_Array: [],
    show: '',
    function: ''
},

{  
    name: 'Accounting', 
   icon: './assets/acc.png', 
   route_array: ['/accounting'],
   route: 'accounting',
   group: 'top',
   dropdown_Array: [],
   show: '',
   function: ''
},

{  
    name: 'Admins', 
   icon: './assets/admin.png', 
   route_array: ['/admins', '/admins/add', '/admins/edit'],
   route: 'admins',
   group: 'bottom',
   dropdown_Array: [],
   show: '',
   function: ''
}

]