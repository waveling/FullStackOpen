(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{14:function(e,t,n){e.exports=n(36)},36:function(e,t,n){"use strict";n.r(t);var a=n(0),o=n.n(a),c=n(13),r=n.n(c),u=n(2),l=function(e){var t=e.handleSearch,n=e.searchParam;return o.a.createElement("div",null,o.a.createElement("h4",null,"Search contact:",o.a.createElement("input",{onChange:t,value:n})))},i=function(e){var t=e.addContact,n=e.newName,a=e.handleNameChange,c=e.newNumber,r=e.handleNumberChange;return o.a.createElement("form",{onSubmit:t},o.a.createElement("div",null,"name: ",o.a.createElement("input",{value:n,onChange:a})),o.a.createElement("div",null,"number: ",o.a.createElement("input",{value:c,onChange:r})),o.a.createElement("div",null,o.a.createElement("button",{type:"submit"},"add")))},d=function(e){var t=e.persons,n=e.deleteContact;return t.map((function(e){return o.a.createElement("p",{key:Math.random()},e.name," ",e.number,o.a.createElement("button",{onClick:function(){return n(e.id,e.name)}},"Delete"))}))},s=n(3),m=n.n(s),f="/api/persons",h=function(){return m.a.get(f)},b=function(e){return m.a.post(f,e)},g=function(e){return m.a.delete("".concat(f,"/").concat(e))},p=function(e,t){return m.a.put("".concat(f,"/").concat(e),t)},E=function(e){var t=e.successMessage,n=e.errorMessage;return null===t&&null===n?null:o.a.createElement("div",{className:"success",style:null===t?{color:"red",background:"lighgrey",fontSize:20,borderStyle:"solid",borderRadius:5,padding:10,marginBottom:10}:{color:"green",background:"lighgrey",fontSize:20,borderStyle:"solid",borderRadius:5,padding:10,marginBottom:10}},null===t?n:t)},v=function(){var e=Object(a.useState)([]),t=Object(u.a)(e,2),n=t[0],c=t[1],r=Object(a.useState)(""),s=Object(u.a)(r,2),m=s[0],f=s[1],v=Object(a.useState)(""),w=Object(u.a)(v,2),C=w[0],S=w[1],y=Object(a.useState)(""),O=Object(u.a)(y,2),j=O[0],k=O[1],N=Object(a.useState)(null),M=Object(u.a)(N,2),T=M[0],P=M[1],x=Object(a.useState)(null),A=Object(u.a)(x,2),B=A[0],D=A[1];Object(a.useEffect)((function(){h().then((function(e){c(e.data)}))}),[]);var z=0===j.length?n:n.filter((function(e){return e.name.toLowerCase().indexOf(j.toLowerCase())>=0}));return o.a.createElement("div",null,o.a.createElement(E,{successMessage:T,errorMessage:B}),o.a.createElement("h1",null,"Phonebook"),o.a.createElement(l,{searchParam:j,handleSearch:function(e){k(e.target.value)}}),o.a.createElement("h2",null,"Add new contact"),o.a.createElement(i,{addContact:function(e){e.preventDefault();var t={name:m,number:C},a=n.find((function(e){return e.name===m}));a?window.confirm("Number for contact ".concat(m," already exists. Do you want to replace?"))&&p(a.id,t).then((function(e){c(n.map((function(t){return t.id!==a.id?t:e.data}))),P("Updated number for ".concat(m)),f(""),S(""),setTimeout((function(){P(null)}),3e3)})).catch((function(e){console.log(e.response.data),D("Could not update the contact"),setTimeout((function(){D(null)}),3e3)})):b(t).then((function(){c(n.concat(t)),P("Added contact for ".concat(m)),f(""),S(""),setTimeout((function(){P(null)}),3e3)})).catch((function(e){console.log(e.response.data.error),D("Could not add the contact!"),setTimeout((function(){D(null)}),3e3)}))},handleNameChange:function(e){f(e.target.value)},handleNumberChange:function(e){S(e.target.value)},newName:m,newNumber:C}),o.a.createElement("h2",null,"Contacts"),o.a.createElement(d,{persons:z,searchParam:j,deleteContact:function(e,t){window.confirm("Are you sure you want to delete the contact ".concat(t))&&g(e).then((function(){c(n.filter((function(t){return t.id!==e}))),f(""),S(""),P("".concat(t," was succesfully removed from the phonebook!")),setTimeout((function(){P(null)}),3e3)})).catch((function(){c(n.filter((function(t){return t.id!==e}))),D("".concat(t," was already removed from server"),"error")}))}}))};r.a.render(o.a.createElement(o.a.StrictMode,null,o.a.createElement(v,null)),document.getElementById("root"))}},[[14,1,2]]]);
//# sourceMappingURL=main.36a705e0.chunk.js.map