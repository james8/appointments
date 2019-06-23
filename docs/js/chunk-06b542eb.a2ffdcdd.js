(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-06b542eb"],{1394:function(e,t,a){"use strict";var i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{attrs:{id:"toggle-field"}},[a("div",{staticClass:"toggleContainer",class:{toggleSelected:e.selected,toggleDisabled:e.isDisabled},on:{click:function(t){e.Toggle()}}},[e.isDisabled?e._e():a("div",{staticClass:"toggle"})]),a("span",{staticClass:"toggleLabel",class:{toggleDisabled:e.isDisabled},on:{click:function(t){e.Toggle()}}},[e._v(e._s(e.labels[e.selected?1:0]))])])},n=[],s=a("d4ec"),o=a("bee2"),l=a("99de"),c=a("7e84"),r=a("262e"),d=(a("cadf"),a("551c"),a("097d"),a("9ab4")),u=a("60a3"),m=function(e){function t(){var e;return Object(s["a"])(this,t),e=Object(l["a"])(this,Object(c["a"])(t).apply(this,arguments)),e.selected=!1,e}return Object(r["a"])(t,e),Object(o["a"])(t,[{key:"created",value:function(){this.selected=this.value}},{key:"Toggle",value:function(){this.isDisabled||(this.selected=!this.selected,this.$emit("toggled",this.selected))}},{key:"ValueChanged",value:function(e,t){this.selected=e}}]),t}(u["c"]);d["a"]([Object(u["b"])({type:Array,required:!0})],m.prototype,"labels",void 0),d["a"]([Object(u["b"])({type:Boolean,required:!0})],m.prototype,"value",void 0),d["a"]([Object(u["b"])({type:Boolean})],m.prototype,"isDisabled",void 0),d["a"]([Object(u["d"])("value")],m.prototype,"ValueChanged",null),m=d["a"]([u["a"]],m);var h=m,p=h,y=(a("1cd8"),a("2877")),b=Object(y["a"])(p,i,n,!1,null,"58bef5f6",null);t["a"]=b.exports},"1cd8":function(e,t,a){"use strict";var i=a("aba6"),n=a.n(i);n.a},"3de7":function(e,t,a){},"5f66":function(e,t,a){"use strict";var i=a("3de7"),n=a.n(i);n.a},aba6:function(e,t,a){},d0b5:function(e,t,a){"use strict";a.r(t);var i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{attrs:{id:"view_employees"}},[a("h1",[e._v(e._s(e.title))]),a("table",{staticClass:"dataResults",attrs:{id:"employees_results",cellspacing:"0"}},[a("thead",[a("th",[e._v("\n                "+e._s(e.title)+"\n                "),a("i",{staticClass:"fas fa-plus",attrs:{title:"Create New Employee"},on:{click:function(t){e.BtnCreate()}}})])]),a("tbody",e._l(e.employees,function(t,i){return a("tr",{key:"employee"+i},[a("td",{on:{click:function(t){e.SelectEmployee(i)}}},[t.isAdmin?a("span",{staticClass:"isAdmin"},[e._v("*")]):e._e(),e._v("\n                    "+e._s(t.firstName)+" "+e._s(t.lastName)+"\n                ")])])}),0)]),e.showForm?a("div",[a("form",{staticClass:"form dataForm",attrs:{id:"employee_form"}},[a("div",{staticClass:"header"},[e._v("\n                "+e._s(e.formTitle)+"\n                "),e.employeeNew.id>-1&&!e.editing?a("i",{staticClass:"fas fa-trash-alt",attrs:{title:e.deleteTitle},on:{click:function(t){e.BtnDelete()}}}):e._e()]),a("div",{staticClass:"body"},[a("input-field",{attrs:{id:"employee_first_name",label:"First Name",value:e.employeeNew.firstName,isRequired:"",isDisabled:!e.canEdit},on:{inputChange:function(t){e.UpdateEmployeeForm(e.formFields[0],t)}}}),a("input-field",{attrs:{id:"employee_last_name",label:"Last Name",value:e.employeeNew.lastName,isRequired:"",isDisabled:!e.canEdit},on:{inputChange:function(t){e.UpdateEmployeeForm(e.formFields[1],t)}}}),a("input-field",{class:{hideInput:!e.showPhoneEdit},attrs:{id:"employee_phone",type:"phone",label:"Phone #",value:e.employeeNew.phone,isRequired:"",isDisabled:!e.canEdit},on:{inputChange:function(t){e.UpdateEmployeeForm(e.formFields[2],t)}}}),a("input-field",{class:{hideInput:e.showPhoneEdit},attrs:{id:"employee_phone_disabled",label:"Phone #",value:e._f("FPhoneNumber")(e.employeeNew.phone),isRequired:"",isDisabled:!0}}),a("input-field",{attrs:{id:"employee_email",label:"Email",value:e.employeeNew.email,isRequired:"",isDisabled:!e.canEdit},on:{inputChange:function(t){e.UpdateEmployeeForm(e.formFields[3],t)}}}),a("toggle-field",{attrs:{labels:["Not Admin","Admin"],value:e.employeeNew.isAdmin,isDisabled:!e.canEdit},on:{toggled:function(t){e.UpdateAdminToggled(t)}}}),-1===e.employeeNew.id?a("div",{staticClass:"buttons"},[a("button",{staticClass:"btn btnSuccess",class:{btnDisabled:!e.canSave},attrs:{type:"button",disabled:!e.canSave},on:{click:function(t){e.BtnSaveCreate()}}},[e._v("Create")]),a("button",{staticClass:"btn btnError",attrs:{type:"button"},on:{click:function(t){e.BtnCancel()}}},[e._v("Cancel")])]):e.editing?a("div",{staticClass:"buttons"},[a("button",{staticClass:"btn btnSuccess",class:{btnDisabled:!e.canSave},attrs:{type:"button",disabled:!e.canSave},on:{click:function(t){e.BtnSave()}}},[e._v("Save")]),a("button",{staticClass:"btn btnError",attrs:{type:"button"},on:{click:function(t){e.BtnCancelEdit()}}},[e._v("Cancel")])]):a("div",{staticClass:"buttons"},[a("button",{staticClass:"btn btnNormal",attrs:{type:"button"},on:{click:function(t){e.BtnEdit()}}},[e._v("Edit")]),a("button",{staticClass:"btn btnError",attrs:{type:"button"},on:{click:function(t){e.BtnClose()}}},[e._v("Close")])])],1)]),a("backdrop")],1):e._e(),e.showToast?a("toast",{attrs:{type:e.toastType,msg:e.toastMsg},on:{closeToast:function(t){e.showToast=t}}}):e._e()],1)},n=[],s=a("d4ec"),o=a("bee2"),l=a("99de"),c=a("7e84"),r=a("262e"),d=(a("cadf"),a("551c"),a("097d"),a("9ab4")),u=a("60a3"),m=a("ea25"),h=a("5b3b"),p=a("8192"),y=a("0eb4"),b=a("1394"),f=a("955b"),v=function(e){function t(){var e;return Object(s["a"])(this,t),e=Object(l["a"])(this,Object(c["a"])(t).apply(this,arguments)),e.title="Employees",e.employees=[],e.formFields=["firstName","lastName","phone","email","isAdmin"],e.showForm=!1,e.showPhoneEdit=!1,e.canSave=!1,e.canEdit=!1,e.editing=!1,e.formTitle="",e.deleteTitle="",e.employeeOld=new m["a"],e.employeeNew=new m["a"],e.showToast=!1,e.toastType="",e.toastMsg="",e}return Object(r["a"])(t,e),Object(o["a"])(t,[{key:"created",value:function(){var e=this;m["a"].GetEmployees().then(function(t){return e.employees=t}).catch(function(e){return console.log("Error => Employee => GetEmployees(): ".concat(e))})}},{key:"SelectEmployee",value:function(e){var t=this.employees[e];this.employeeOld=new m["a"](t.id,t.firstName,t.lastName,t.phone,t.email,t.isAdmin),this.employeeNew=new m["a"](t.id,t.firstName,t.lastName,t.phone,t.email,t.isAdmin);var a=this.employeeNew.firstName,i=this.employeeNew.lastName;this.formTitle="".concat(a," ").concat(i.substr(0,1),"."),this.deleteTitle="Delete Employee '".concat(a," ").concat(i,"'"),this.showForm=!0}},{key:"UpdateEmployeeForm",value:function(e,t){var a=this;switch(e){case"firstName":this.employeeNew.firstName=t;break;case"lastName":this.employeeNew.lastName=t;break;case"phone":this.employeeNew.phone=t;break;case"email":this.employeeNew.email=t;break}setTimeout(function(){a.canSave=a.CanSave()},50)}},{key:"UpdateAdminToggled",value:function(e){this.employeeNew.isAdmin=e,this.canSave=this.CanSave()}},{key:"BtnCreate",value:function(){this.employeeOld=new m["a"],this.employeeNew=new m["a"],this.formTitle="New Employee",this.showForm=!0,this.showPhoneEdit=!0,this.canSave=!1,this.canEdit=!0}},{key:"BtnDelete",value:function(){var e="".concat(this.employeeNew.firstName," ").concat(this.employeeNew.lastName),t="Are you sure you want to permanently delete employee '".concat(e,"'?");confirm(t)&&(this.toastType="success",this.toastMsg="Employee '".concat(e,"' has been successfully deleted!"),this.showToast=!0,this.showForm=!1)}},{key:"BtnSaveCreate",value:function(){}},{key:"BtnCancel",value:function(){var e=this.IsDirty(this.employeeOld,this.employeeNew),t="Are you sure you want to cancel employee creation?";(!e||e&&confirm(t))&&(this.showForm=!1,this.showPhoneEdit=!1,this.canSave=!1,this.canEdit=!1,this.employeeNew=new m["a"])}},{key:"BtnSave",value:function(){}},{key:"BtnCancelEdit",value:function(){var e=this.employeeOld,t=this.employeeNew,a=this.IsDirty(e,t),i="Are you sure you want to cancel employee edit? All changes will be lost.";(!a||a&&confirm(i))&&(t.firstName=e.firstName,t.lastName=e.lastName,t.phone=e.phone,t.email=e.email,t.isAdmin=e.isAdmin,this.showPhoneEdit=!1,this.canSave=!1,this.canEdit=!1,this.editing=!1)}},{key:"BtnEdit",value:function(){this.showPhoneEdit=!0,this.editing=!0,this.canEdit=!0}},{key:"BtnClose",value:function(){this.showForm=!1,this.employeeNew=new m["a"]}},{key:"IsDirty",value:function(e,t){return console.log("old: ".concat(e.phone),"new: ".concat(t.phone),"test: ".concat(e.phone!==t.phone)),e.firstName!==t.firstName||(e.lastName!==t.lastName||(e.phone!==t.phone||(e.email!==t.email||e.isAdmin!==t.isAdmin)))}},{key:"CanSave",value:function(){var e=document.getElementById("employee_form"),t=e.checkValidity(),a=this.IsDirty(this.employeeOld,this.employeeNew);return t&&a}}]),t}(u["c"]);v=d["a"]([Object(u["a"])({components:{Backdrop:h["a"],InputField:p["a"],Toast:y["a"],ToggleField:b["a"]},filters:{FPhoneNumber:f["a"]}})],v);var w=v,N=w,g=(a("5f66"),a("2877")),E=Object(g["a"])(N,i,n,!1,null,"dc392240",null);t["default"]=E.exports},ea25:function(e,t,a){"use strict";a.d(t,"a",function(){return s});var i=a("d4ec"),n=a("bee2"),s=(a("cadf"),a("551c"),a("097d"),function(){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:-1,a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"",n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"",s=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"",o=arguments.length>4&&void 0!==arguments[4]?arguments[4]:"",l=arguments.length>5&&void 0!==arguments[5]&&arguments[5];Object(i["a"])(this,e),this.id=t,this.firstName=a,this.lastName=n,this.phone=s,this.email=o,this.isAdmin=l}return Object(n["a"])(e,null,[{key:"GetEmployees",value:function(){return new Promise(function(t,a){var i=[new e(0,"Amy","A","0000000000","a@b.c"),new e(1,"Kody","Tsuneda","1111111111","a@b.c"),new e(2,"Lani","Kuniyuki","2222222222","a@b.c"),new e(3,"Laureen","Shirokane","3333333333","a@b.c",!0),new e(4,"Nuri","Heo","4444444444","a@b.c")];t(i)})}},{key:"GetAciveEmployees",value:function(){return new Promise(function(t,a){var i=[new e(0,"Amy","A","0000000000","a@b.c"),new e(2,"Lani","Kuniyuki","2222222222","a@b.c"),new e(3,"Laureen","Shirokane","3333333333","a@b.c",!0),new e(4,"Nuri","Heo","4444444444","a@b.c")];t(i)})}}]),e}())}}]);
//# sourceMappingURL=chunk-06b542eb.a2ffdcdd.js.map