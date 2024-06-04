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

    {   name: 'Transaction', 
        icon: '', 
        route_array: ['/transaction','/transaction/edit','/transaction'],
        route: 'transaction',
        group: 'top',
        dropdown_Array: [],
        show: '',
        function: ''
    },

    {   
    name: 'Translation', 
    icon: '', 
    route_array: ['/translation/EditingAndProofreadingMain','/translation/WebsiteMain','translation/documentMain','/translation/documentTranslation','translation/websiteTranslation','translation/EditingAndProofreading'],
    route: '/transaction',
    group: 'top',
    show: 'showTranslation',
    function: '',
    dropdown_Array: [
        {   
        name: 'Document Translation', 
        icon: '', 
        route_array: ['translation/documentMain','/translation/documentTranslation'],
        route: 'translation/documentMain',
        group: 'top',
        dropdown_Array: [],
        show: '',
        function: ''
    }
    ,{   
        name: 'Website Translation', 
        icon: '', 
        route_array: ['translation/WebsiteMain','/translation/websiteTranslation'],
        route: 'translation/WebsiteMain',
        group: 'top',
        dropdown_Array: [],
        show: '',
        function: ''
    }
    ,{   
        name: 'Editing & Proofreading', 
        icon: '', 
        route_array: ['translation/EditingAndProofreadingMain','/translation/EditingAndProofreading'],
        route: 'translation/EditingAndProofreadingMain',
        group: 'top',
        dropdown_Array: [],
        show: '',
        function: ''
    },
    
    ]
    },

    {  
     name: 'Notifications', 
    icon: '', 
    route_array: ['/notification'],
    route: 'notification',
    group: 'bottom',
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