"use strict";(self.webpackChunkflexy=self.webpackChunkflexy||[]).push([[384],{7996:(P,r,i)=>{i.d(r,{S:()=>p});const p=[{id:1,name:"John Doe",nationality:"American",gender:"Male",type:"Skilled",cost:"$200/day",age:30,note:"Experienced carpenter",status:"inprogress"},{id:2,name:"Jane Smith",nationality:"British",gender:"Female",type:"Unskilled",cost:"$150/day",age:30,note:"General laborer",status:"inactive"},{id:3,name:"Ahmed Khan",nationality:"Pakistani",gender:"Male",type:"Skilled",cost:"$220/day",age:30,note:"Electrician",status:"complete"},{id:4,name:"Maria Garcia",nationality:"Mexican",gender:"Female",type:"Skilled",cost:"$250/day",age:30,note:"Plumber",status:"complete"},{id:5,name:"Wang Wei",nationality:"Chinese",gender:"Male",type:"Unskilled",cost:"$180/day",age:30,note:"General laborer",status:"inactive"},{id:6,name:"Olga Petrova",nationality:"Russian",gender:"Female",type:"Skilled",cost:"$230/day",age:30,note:"Welder",status:"complete"},{id:7,name:"Carlos Santos",nationality:"Brazilian",gender:"Male",type:"Unskilled",cost:"$170/day",age:30,note:"General laborer",status:"inactive"},{id:8,name:"Yuki Tanaka",nationality:"Japanese",gender:"Female",type:"Skilled",cost:"$240/day",age:30,note:"Painter",status:"complete"},{id:9,name:"Mohammed Ali",nationality:"Egyptian",gender:"Male",type:"Unskilled",cost:"$160/day",age:30,note:"General laborer",status:"complete"},{id:10,name:"Sofia Rossi",nationality:"Italian",gender:"Female",type:"Skilled",cost:"$260/day",age:30,note:"Mason",status:"inactive"}]},7244:(P,r,i)=>{i.d(r,{C:()=>K});var p=i(9776),s=i(8818),u=i(7996),d=i(9684),t=i(4496),M=i(5152),g=i(1368),C=i(3576),h=i(4060),_=i(7536),x=i(2096),O=i(2080),f=i(7816),w=i(1560),y=i(6504),v=i(7528);function I(e,l){1&e&&(t.I0R(0,"div")(1,"button",37),t.OEk(2," Add Labor "),t.C$Y()())}function R(e,l){if(1&e){const n=t.KQA();t.I0R(0,"div",38)(1,"button",39),t.qCj("click",function(){t.usT(n);const o=t.GaO();return t.CGJ(o.CancelUpdate())}),t.OEk(2,"Cancel"),t.C$Y(),t.I0R(3,"button",37),t.OEk(4,"Update"),t.C$Y()()}}function E(e,l){if(1&e&&(t.I0R(0,"mat-option",40),t.OEk(1),t.C$Y()),2&e){const n=l.$implicit;t.E7m("value",n.value),t.yG2(),t.oRS(" ",n.viewValue," ")}}function b(e,l){if(1&e&&(t.I0R(0,"th",44),t.OEk(1),t.wVc(2,"titlecase"),t.C$Y()),2&e){const n=t.GaO().$implicit;t.yG2(),t.oRS(" ",t.kDX(2,1,n)," ")}}function G(e,l){if(1&e&&(t.SAx(0),t.OEk(1),t.k70()),2&e){const n=t.GaO(2).$implicit,a=t.GaO().$implicit;t.yG2(),t.oRS(" ",n[a]," ")}}function D(e,l){if(1&e){const n=t.KQA();t.I0R(0,"div",49)(1,"a",50),t.qCj("click",function(){t.usT(n);const o=t.GaO(2).$implicit,c=t.GaO(2);return t.CGJ(c.Update(o))}),t.wR5(2,"i-tabler",51),t.C$Y(),t.I0R(3,"a",50),t.qCj("click",function(){t.usT(n);const o=t.GaO(2).$implicit,c=t.GaO(2);return t.CGJ(c.openDialog("Delete",o))}),t.wR5(4,"i-tabler",52),t.C$Y()()}}function $(e,l){if(1&e&&(t.SAx(0),t.yuY(1,G,2,1,"ng-container",46)(2,D,5,0,"ng-template",null,48,t.gJz),t.k70()),2&e){const n=t.Gew(3),a=t.GaO(2).$implicit;t.yG2(),t.E7m("ngIf","action"!==a)("ngIfElse",n)}}function k(e,l){if(1&e&&(t.I0R(0,"span",53),t.OEk(1),t.C$Y()),2&e){const n=t.GaO().$implicit,a=t.GaO(2);t.E7m("ngClass",a.getStatusClass(n.status)),t.yG2(),t.oRS(" ","complete"===n.status?"active":n.status," ")}}function T(e,l){if(1&e){const n=t.KQA();t.I0R(0,"td",45),t.qCj("click",function(o){const m=t.usT(n).$implicit,U=t.GaO().$implicit,N=t.GaO();return t.CGJ(N.expandRow(o,m,U))}),t.yuY(1,$,4,2,"ng-container",46)(2,k,2,2,"ng-template",null,47,t.gJz),t.C$Y()}if(2&e){const n=t.Gew(3),a=t.GaO().$implicit;t.yG2(),t.E7m("ngIf","status"!==a)("ngIfElse",n)}}function A(e,l){1&e&&(t.SAx(0,41),t.yuY(1,b,3,3,"th",42)(2,T,4,2,"td",43),t.k70()),2&e&&t._6D("matColumnDef",l.$implicit)}function S(e,l){if(1&e&&(t.I0R(0,"td",54)(1,"div")(2,"div",55)(3,"div",56)(4,"span",57),t.OEk(5),t.C$Y(),t.I0R(6,"div")(7,"div",58),t.OEk(8),t.C$Y(),t.I0R(9,"div",59),t.OEk(10),t.C$Y()()(),t.I0R(11,"div",60),t.OEk(12),t.C$Y()()()()),2&e){const n=l.$implicit,a=t.GaO();t.e48("colspan",a.displayedColumns.length),t.yG2(),t.E7m("@detailExpand",n===a.expandedElement?"expanded":"collapsed"),t.yG2(4),t.oRS(" ",n.id," "),t.yG2(3),t.oRS(" ",n.name," "),t.yG2(2),t.cNF(n.status),t.yG2(2),t.oRS(" ",n.note," ")}}function L(e,l){1&e&&t.wR5(0,"tr",61)}function W(e,l){if(1&e){const n=t.KQA();t.I0R(0,"tr",62),t.qCj("click",function(){const c=t.usT(n).$implicit,m=t.GaO();return t.CGJ(m.expandedElement=m.expandedElement===c?null:c)}),t.C$Y()}if(2&e){const n=l.$implicit,a=t.GaO();t.eAK("example-expanded-row",a.expandedElement===n)}}function Y(e,l){1&e&&t.wR5(0,"tr",63)}const B=()=>["expandedDetail"],F=()=>[10,20,30];let K=(()=>{class e{constructor(n){this.dialog=n,this.ShowAddButoon=!0,this.Name="Name",this.Nationality="Nationality",this.Gender="Gender",this.Type="Type",this.Age="Age",this.Cost="Cost",this.Note="Note",this.Status="Status",this.months=[{value:"mar",viewValue:"March 2023"},{value:"apr",viewValue:"April 2023"},{value:"june",viewValue:"June 2023"}],this.displayedColumns=["id","name","nationality","gender","type","age","cost","note","status","action"],this.columnsToDisplayWithExpand=[...this.displayedColumns],this.expandedElement=null,this.table=Object.create(null),this.paginator=Object.create(null),this.totalCount=-1,this.Cancelled=-1,this.Inprogress=-1,this.Completed=-1,this.dataSource=new s._c(u.S)}ngOnInit(){this.totalCount=this.dataSource.data.length,this.Completed=this.btnCategoryClick("complete"),this.Cancelled=this.btnCategoryClick("inactive"),this.Inprogress=this.btnCategoryClick("InProgress"),this.dataSource=new s._c(u.S)}ngAfterViewInit(){this.dataSource.paginator=this.paginator}applyFilter(n){this.dataSource.filter=n.trim().toLowerCase()}expandRow(n,a,o){"action"===o?this.expandedElement=a:(this.expandedElement=this.expandedElement===a?null:a,n.stopPropagation())}CancelUpdate(){this.ShowAddButoon=!0,this.Name="Name",this.Nationality="Nationality",this.Type="Type",this.Gender="Gender",this.Age="Age",this.Cost="Cost",this.Note="Note",this.Status="Status"}btnCategoryClick(n){return this.dataSource.filter=n.trim().toLowerCase(),this.dataSource.filteredData.length}getStatusClass(n){switch(n){case"inprogress":return"bg-light-warning mat-body-2 f-w-500 p-x-8 p-y-4 f-s-12 rounded-pill";case"complete":return"bg-light-success mat-body-2 f-w-500 p-x-8 p-y-4 f-s-12 rounded-pill";case"inactive":return"bg-light-error mat-body-2 f-w-500 p-x-8 p-y-4 f-s-12 rounded-pill";default:return""}}openDialog(n,a){}addRowData(n){this.dataSource.data.unshift({id:(new Date).getTime(),name:n.name,nationality:n.nationality,gender:n.gender,type:n.type,cost:n.cost,age:n.age,note:n.note,status:n.status}),this.table.renderRows()}Update(n){this.ShowAddButoon=!1,console.log("Hereee"),this.Name=n.name,this.Nationality=n.nationality,this.Gender=n.gender,this.Type=n.type,this.Age=n.age,this.Cost=n.cost,this.Note=n.note,this.Status=n.status}deleteRowData(n){this.dataSource.data=this.dataSource.data.filter((a,o)=>a.id!==n.id)}static#t=this.\u0275fac=function(a){return new(a||e)(t.GI1(M.qW))};static#n=this.\u0275cmp=t.In1({type:e,selectors:[["app-labor-main"]],viewQuery:function(a,o){if(1&a&&(t.CC$(s.wL,7),t.CC$(p.Qb,7)),2&a){let c;t.wto(c=t.Gqi())&&(o.table=c.first),t.wto(c=t.Gqi())&&(o.paginator=c.first)}},decls:89,vars:21,consts:[[1,"four-sections-header"],[1,"two-sections-header"],[1,"shadow-none"],[1,"bg-light-primary","text-center","rounded",3,"click"],[1,"text-primary"],[1,"bg-light-warning","text-center","rounded",3,"click"],[1,"text-warning"],[1,"bg-light-success","text-center","rounded",3,"click"],[1,"text-success"],[1,"bg-light-error","text-center","rounded",3,"click"],[1,"text-error"],[1,"cardWithShadow"],[1,"InputsWholeRow"],[1,"inputsInAdd"],["type","text",3,"placeholder"],["value","Pending"],["value","Approved"],["value","Rejected"],[4,"ngIf"],["class","TwoButtons",4,"ngIf"],[1,"col-sm-4","p-20","searchbar"],["appearance","outline",1,"hide-hint","custom-search"],["matInput","","placeholder","Search labors",3,"keyup"],["matSuffix",""],["name","search",1,"icon-15"],[1,"filter-date"],[1,"d-flex"],["appearance","outline",1,"theme-select"],["value","mar"],[1,"table-responsive"],["mat-table","","multiTemplateDataRows","",3,"dataSource"],["matColumnDef","expandedDetail"],["mat-cell","",4,"matCellDef"],["mat-header-row","",4,"matHeaderRowDef"],["mat-row","","class","example-element-row",3,"example-expanded-row","click",4,"matRowDef","matRowDefColumns"],["mat-row","","class","example-detail-row",4,"matRowDef","matRowDefColumns"],["showFirstLastButtons","",3,"pageSizeOptions"],["mat-flat-button","","color","primary"],[1,"TwoButtons"],["mat-flat-button","","color","primary",3,"click"],[3,"value"],[3,"matColumnDef"],["mat-header-cell","","class","f-w-600 mat-subtitle-1 f-s-14 p-x-24 p-l-0",4,"matHeaderCellDef"],["mat-cell","","class","p-x-24 f-s-14 p-l-0",3,"click",4,"matCellDef"],["mat-header-cell","",1,"f-w-600","mat-subtitle-1","f-s-14","p-x-24","p-l-0"],["mat-cell","",1,"p-x-24","f-s-14","p-l-0",3,"click"],[4,"ngIf","ngIfElse"],["statusColumn",""],["actionColumn",""],[1,"action-link"],[1,"m-r-10","cursor-pointer",3,"click"],["name","edit",1,"icon-18"],["name","trash",1,"icon-18"],[3,"ngClass"],["mat-cell",""],[1,"p-15","rounded","b-1","m-b-16","m-x-18"],[1,"d-flex","align-items-center","gap-12"],[1,"bg-light-primary","text-primary","icon-48","rounded","f-w-600","d-flex","align-items-center","justify-content-center"],[1,"f-s-14","f-w-600","mat-subtitle-1"],[1,"f-s-14"],[1,"f-s-14","m-t-8"],["mat-header-row",""],["mat-row","",1,"example-element-row",3,"click"],["mat-row","",1,"example-detail-row"]],template:function(a,o){1&a&&(t.I0R(0,"div",0)(1,"div",1)(2,"div")(3,"mat-card",2)(4,"div",3),t.qCj("click",function(){return o.btnCategoryClick("")}),t.I0R(5,"h3",4),t.OEk(6),t.C$Y(),t.I0R(7,"p",4),t.OEk(8,"Total Packages"),t.C$Y()()()(),t.I0R(9,"div")(10,"mat-card",2)(11,"div",5),t.qCj("click",function(){return o.btnCategoryClick("InProgress")}),t.I0R(12,"h3",6),t.OEk(13),t.C$Y(),t.I0R(14,"p",6),t.OEk(15,"In Progress"),t.C$Y()()()()(),t.I0R(16,"div",1)(17,"div")(18,"mat-card",2)(19,"div",7),t.qCj("click",function(){return o.btnCategoryClick("complete")}),t.I0R(20,"h3",8),t.OEk(21),t.C$Y(),t.I0R(22,"p",8),t.OEk(23,"Completed"),t.C$Y()()()(),t.I0R(24,"div")(25,"mat-card",2)(26,"div",9),t.qCj("click",function(){return o.btnCategoryClick("inactive")}),t.I0R(27,"h3",10),t.OEk(28),t.C$Y(),t.I0R(29,"p",10),t.OEk(30,"Cancelled"),t.C$Y()()()()()(),t.I0R(31,"mat-card",11)(32,"mat-card-content")(33,"div",12)(34,"div",13)(35,"section")(36,"div"),t.wR5(37,"input",14),t.C$Y(),t.I0R(38,"div"),t.wR5(39,"input",14),t.C$Y()(),t.I0R(40,"section")(41,"div"),t.wR5(42,"input",14),t.C$Y(),t.I0R(43,"div"),t.wR5(44,"input",14),t.C$Y()(),t.I0R(45,"section")(46,"div"),t.wR5(47,"input",14),t.C$Y(),t.I0R(48,"div"),t.wR5(49,"input",14),t.C$Y(),t.I0R(50,"div"),t.wR5(51,"input",14),t.C$Y()(),t.I0R(52,"section")(53,"div"),t.wR5(54,"input",14),t.C$Y(),t.I0R(55,"div")(56,"select")(57,"option",15),t.OEk(58,"InProgress"),t.C$Y(),t.I0R(59,"option",16),t.OEk(60,"Active"),t.C$Y(),t.I0R(61,"option",17),t.OEk(62,"Inactive"),t.C$Y()()()()(),t.yuY(63,I,3,0,"div",18)(64,R,5,0,"div",19),t.C$Y()()(),t.I0R(65,"mat-card",11)(66,"header")(67,"div",20)(68,"mat-form-field",21)(69,"input",22),t.qCj("keyup",function(m){return o.applyFilter(m.target.value)}),t.C$Y(),t.I0R(70,"mat-icon",23),t.wR5(71,"i-tabler",24),t.C$Y()()(),t.I0R(72,"div",25)(73,"mat-card-header",26)(74,"mat-form-field",27)(75,"mat-select",28),t.c53(76,E,2,2,"mat-option",40,t.oxv),t.C$Y()()()()(),t.I0R(78,"mat-card-content")(79,"div",29)(80,"table",30),t.c53(81,A,3,1,"ng-container",41,t.oxv),t.SAx(83,31),t.yuY(84,S,13,6,"td",32),t.k70(),t.yuY(85,L,1,0,"tr",33)(86,W,1,2,"tr",34)(87,Y,1,0,"tr",35),t.C$Y()(),t.wR5(88,"mat-paginator",36),t.C$Y()()),2&a&&(t.yG2(6),t.cNF(o.totalCount),t.yG2(7),t.cNF(o.Inprogress),t.yG2(8),t.cNF(o.Completed),t.yG2(7),t.cNF(o.Cancelled),t.yG2(9),t._6D("placeholder",o.Name),t.yG2(2),t._6D("placeholder",o.Nationality),t.yG2(3),t._6D("placeholder",o.Gender),t.yG2(2),t._6D("placeholder",o.Type),t.yG2(3),t._6D("placeholder",o.Age),t.yG2(2),t._6D("placeholder",o.Note),t.yG2(2),t._6D("placeholder",o.Status),t.yG2(3),t._6D("placeholder",o.Note),t.yG2(9),t.E7m("ngIf",o.ShowAddButoon),t.yG2(),t.E7m("ngIf",!o.ShowAddButoon),t.yG2(12),t.oho(o.months),t.yG2(4),t.E7m("dataSource",o.dataSource),t.yG2(),t.oho(o.displayedColumns),t.yG2(4),t.E7m("matHeaderRowDef",o.columnsToDisplayWithExpand),t.yG2(),t.E7m("matRowDefColumns",o.columnsToDisplayWithExpand),t.yG2(),t.E7m("matRowDefColumns",t.q4q(19,B)),t.yG2(),t.E7m("pageSizeOptions",t.q4q(20,F)))},dependencies:[g.QF,g.u_,C.I5,h.Up,h.Gm,_.yi,x.kX,O.SM,O.WK,O.Uc,f.Gw,w.qL,p.Qb,s.wL,s.ie,s.aG,s.Af,s.uc,s.gx,s.qC,s.cX,s.yC,s._I,y.wd,y.GO,v.A5,g.oL],styles:[".four-sections-header[_ngcontent-%COMP%]   .two-sections-header[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]   .shadow-none[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]{cursor:pointer;display:flex;flex-direction:column;padding:10px}.InputsWholeRow[_ngcontent-%COMP%]{display:flex;justify-content:space-between;column-gap:15px}.InputsWholeRow[_ngcontent-%COMP%]   .inputsInAdd[_ngcontent-%COMP%]{display:flex;flex-direction:row;column-gap:5px}.InputsWholeRow[_ngcontent-%COMP%]   .inputsInAdd[_ngcontent-%COMP%]   section[_ngcontent-%COMP%]{display:flex;flex-direction:row;column-gap:5px;width:100%}.InputsWholeRow[_ngcontent-%COMP%]   .inputsInAdd[_ngcontent-%COMP%]   section[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]{width:100%}.InputsWholeRow[_ngcontent-%COMP%]   .inputsInAdd[_ngcontent-%COMP%]   section[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]   input[_ngcontent-%COMP%], .InputsWholeRow[_ngcontent-%COMP%]   .inputsInAdd[_ngcontent-%COMP%]   section[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]   select[_ngcontent-%COMP%]{width:100%;border:1px solid lightgray;border-radius:10px;padding:10px 5px}.InputsWholeRow[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{min-width:100px}.InputsWholeRow[_ngcontent-%COMP%]   .TwoButtons[_ngcontent-%COMP%]{display:flex;flex-direction:row;column-gap:10px}.four-sections-header[_ngcontent-%COMP%], .four-sections-header[_ngcontent-%COMP%]   .two-sections-header[_ngcontent-%COMP%]{width:100%;display:flex;flex-direction:row;column-gap:10px}.four-sections-header[_ngcontent-%COMP%]   .two-sections-header[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]{width:100%}.four-sections-header[_ngcontent-%COMP%]   .two-sections-header[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]   .shadow-none[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]{display:flex;flex-direction:column;padding:10px}.four-sections-header[_ngcontent-%COMP%]   .two-sections-header[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]   .shadow-none[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{margin:0;padding:0;font-size:16px}.four-sections-header[_ngcontent-%COMP%]   .two-sections-header[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]   .shadow-none[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%]{margin:0;padding:0;font-size:24px}.table-responsive[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%], .table-responsive[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%], .table-responsive[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{cursor:pointer;font-size:14px}.element-td[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]{display:flex;flex-direction:row;column-gap:10px;align-items:center;justify-content:center}.element-td[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{cursor:pointer}.cardWithShadow[_ngcontent-%COMP%]   header[_ngcontent-%COMP%]{display:flex;flex-direction:row;justify-content:space-between;padding:10px 5px}tr.example-detail-row[_ngcontent-%COMP%]{height:0}.example-element-row[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]{border-bottom-width:0}@media (max-width: 800px){.InputsWholeRow[_ngcontent-%COMP%], .InputsWholeRow[_ngcontent-%COMP%]   .inputsInAdd[_ngcontent-%COMP%]{display:flex;flex-direction:column;row-gap:5px}.InputsWholeRow[_ngcontent-%COMP%]   .inputsInAdd[_ngcontent-%COMP%]   section[_ngcontent-%COMP%]{display:flex;flex-direction:row;column-gap:5px;width:100%}.InputsWholeRow[_ngcontent-%COMP%]   .inputsInAdd[_ngcontent-%COMP%]   section[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]{width:100%}.InputsWholeRow[_ngcontent-%COMP%]   .inputsInAdd[_ngcontent-%COMP%]   section[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]   input[_ngcontent-%COMP%], .InputsWholeRow[_ngcontent-%COMP%]   .inputsInAdd[_ngcontent-%COMP%]   section[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]   select[_ngcontent-%COMP%]{width:100%;border:1px solid lightgray;border-radius:10px;padding:10px 5px}.InputsWholeRow[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]{display:flex;justify-content:flex-end;align-items:flex-end;min-width:100px}.InputsWholeRow[_ngcontent-%COMP%]   .TwoButtons[_ngcontent-%COMP%]{flex-direction:row;column-gap:10px;display:flex;justify-content:flex-end;align-items:flex-end}.four-sections-header[_ngcontent-%COMP%]{width:100%;display:flex;flex-direction:column;row-gap:0px}.four-sections-header[_ngcontent-%COMP%]   .two-sections-header[_ngcontent-%COMP%]{width:100%;display:flex;flex-direction:row;column-gap:10px}.four-sections-header[_ngcontent-%COMP%]   .two-sections-header[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]{width:100%}}@media (max-width: 600px){.cardWithShadow[_ngcontent-%COMP%]   header[_ngcontent-%COMP%]{display:flex;flex-direction:column}.cardWithShadow[_ngcontent-%COMP%]   header[_ngcontent-%COMP%]   .filter-date[_ngcontent-%COMP%]{display:flex;justify-content:flex-end;align-items:flex-end}.four-sections-header[_ngcontent-%COMP%]   .two-sections-header[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]   .shadow-none[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{font-size:13px}}@media (max-width: 350px){.InputsWholeRow[_ngcontent-%COMP%], .InputsWholeRow[_ngcontent-%COMP%]   .inputsInAdd[_ngcontent-%COMP%]{display:flex;flex-direction:column;row-gap:5px}.InputsWholeRow[_ngcontent-%COMP%]   .inputsInAdd[_ngcontent-%COMP%]   section[_ngcontent-%COMP%]{display:flex;flex-direction:column;row-gap:5px;width:100%}.InputsWholeRow[_ngcontent-%COMP%]   .inputsInAdd[_ngcontent-%COMP%]   section[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]{width:100%}.InputsWholeRow[_ngcontent-%COMP%]   .inputsInAdd[_ngcontent-%COMP%]   section[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]   input[_ngcontent-%COMP%], .InputsWholeRow[_ngcontent-%COMP%]   .inputsInAdd[_ngcontent-%COMP%]   section[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]   select[_ngcontent-%COMP%]{width:100%;border:1px solid lightgray;border-radius:10px;padding:10px 5px}}"],data:{animation:[(0,d.gV)("detailExpand",[(0,d.K2)("collapsed",(0,d.wb)({height:"0px",minHeight:"0"})),(0,d.K2)("expanded",(0,d.wb)({height:"*"})),(0,d.aK)("expanded <=> collapsed",(0,d.Cs)("225ms cubic-bezier(0.4, 0.0, 0.2, 1)"))])]}})}return e})()},9384:(P,r,i)=>{i.r(r),i.d(r,{LaborRecModule:()=>h});var p=i(1236);const u=[{path:"",children:[{path:"main",component:i(7244).C}]}];var d=i(1737),t=i(4476),M=i(4060),g=i(7536),C=i(4496);let h=(()=>{class _{static#t=this.\u0275fac=function(f){return new(f||_)};static#n=this.\u0275mod=C.a4G({type:_});static#e=this.\u0275inj=C.s3X({imports:[p.qQ.forChild(u),t.iE,d.KC,M.wb,g.cN]})}return _})()}}]);