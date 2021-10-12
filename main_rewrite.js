document.addEventListener('DOMContentLoaded', () =>
  {
  console.log("test");

    Vue.component('standard-table',{
      props: ['harr','barr'],
      template: `<table><thead><tr><th v-for="hcell in harr">{{hcell}}</th></tr></thead>
      <tbody><tr v-for="row in barr"><td v-for="bcell in row">{{bcell}}</td></tr></tbody></table>`
    });

  var mainOutput = new Vue({
    el: '#main-output',
    data: {
      title: 'cticket',
      harr: [],
      barr: [],
      showLoginPopout:false,
      showNewTicketPopout:false,
      showSearchPopout:true,
      username:'',
      password:'',
      arr: [1,2,3]
    },
    methods:{
      submitLoginAttempt: function(username,password){
        return fetch("login",{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body : JSON.stringify([username,password])

      }).then(data=>data.json());
      }
    }

  });

  fillTable(['a','b'],[['1','2'],['3','4']]);
  function fillTable(harr, barr){
    mainOutput.harr = harr;
    mainOutput.barr = barr;
  }

});
var tickets = [];

function submitLoginAttempt(username,password){
  fetch("login",{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body : JSON.stringify([username,password])

}).then(data=>console.log(data.json()));
}

function createTickets(n){
  for(let i=0; i<n; i++){
    let ticket = "";
    if(i>1000){
      ticket = tickets[i%1000];
    }
    else{
      for(let j=0;j<1000; j++){
        ticket = ticket + Math.floor(Math.random()*26);

    }
  }
    tickets.push(ticket);
  }
}
