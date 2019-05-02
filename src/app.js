// script for index.html
/* eslint camelcase: "off", no-var: "off", vars-on-top: "off" */
/* eslint no-console: "off" */
/* eslint-env jquery */

// import Analytics from 'electron-ga';

const mysql = require('mysql');

const Store = require('electron-store');

const store = new Store();

const Vue = require('./vendor/vue/vue.js');  // eslint-disable-line

// const analytics = new Analytics('UA-322710-22');

const eu_database = mysql.createPool({
  host: '127.0.0.1',
  port: '3307',
  user: 'USERNAME',
  password: 'PASSWORD',
  database: 'cloud',
  connectionLimit: 5,
});

const usa_database = mysql.createPool({
  host: '127.0.0.1',
  port: '3308',
  user: 'USERNAME',
  password: 'PASSWORD',
  database: 'cloud',
  connectionLimit: 5,
});

const asia_database = mysql.createPool({
  host: '127.0.0.1',
  port: '3306',
  user: 'USERNAME',
  password: 'PASSWORD',
  database: 'cloud',
  connectionLimit: 5,
});

function resetBreadCrumbs() {
  $('div.ui.row.breadcrumb').children().remove();
  $('div.ui.row.breadcrumb').text('Home');
  return true;
}

function search() {  // eslint-disable-line
  console.log('search running....');
  const the_search = $('input#searchInput');

  // const analytics_label = the_search.val();
  // analytics.send('pageview', { dl: 'https://geekycode.io/stratus-desktop/search/' });
  // analytics.send('event', { ec: 'search', ea: 'search', el: analytics_label });

  // Tidy up first
  const results_table = $('tbody#results');
  $('tbody#results > tr').remove();
  // $('table#results_table').css('display', 'block');

  $('div.ui.row.breadcrumb').css('display', 'none');
  resetBreadCrumbs();

  // const the_results = [];

  $('div.results').css('display', 'block');
  // Search for accounts/domains
  const account_sql = `select * from account where account_name like '%${
     the_search.val()
    }%' and removed is null limit 50;`;

  const domain_sql = `select * from domain where name like '%${
     the_search.val()}%' and removed is null limit 50;`;

  eu_database.getConnection((err, eu_conn) => {
    eu_conn.query(account_sql, (_err, results) => {
      eu_conn.release();
      // Display the results
      results.forEach((item) => {
        console.log('Putting results');
        const func_call = `showAcct('${item.uuid}','Europe');`;
        results_table.append(
          `<tr id="search_acct_${item.uuid}"><td><a href="#" onclick=${func_call}>${item.account_name
           }</a></td><td>Account</td><td>${item.state}</td><td>Europe</td></tr>`,
        );
        if (item.state === 'disabled') {
          $(`tr#search_acct_${item.uuid}`).addClass('error');
        }
      });
    });
  });

  eu_database.getConnection((err, eu_conn) => {
    eu_conn.query(domain_sql, (_err, results) => {
      eu_conn.release();
      // Display the results
      results.forEach((item) => {
        console.log('Putting results');
        const func_call = `showDomain('${item.uuid}','Europe');`;
        results_table.append(
          `<tr id="search_doamin_${item.uuid}"><td><a href="#" onclick=${func_call}>${item.name
           }</a></td><td>Domain</td><td>${item.state}</td><td>Europe</td></tr>`,
        );
        if (item.state === 'disabled') {
          $(`tr#search_acct_${item.uuid}`).addClass('error');
        }
      });
    });
  });

  usa_database.getConnection((err, usa_conn) => {
    console.log(`USA err: ${err}`);
    usa_conn.query(account_sql, (_err, results) => {
      usa_conn.release();
      // Display the results
      results.forEach((item) => {
        console.log('Putting results');
        const func_call = `showAcct('${item.uuid}','USA');`;
        results_table.append(
          `<tr id="search_acct_${item.uuid}"><td><a href="#" onclick=${func_call}>${item.account_name
           }</a></td><td>Account</td><td>${item.state}</td><td>USA</td></tr>`,
        );
        if (item.state === 'disabled') {
          $(`tr#search_acct_${item.uuid}`).addClass('error');
        }
      });
    });
  });

  usa_database.getConnection((err, usa_conn) => {
    console.log(`USA err: ${err}`);
    usa_conn.query(domain_sql, (_err, results) => {
      usa_conn.release();
      // Display the results
      results.forEach((item) => {
        console.log('Putting results');
        const func_call = `showDomain('${item.uuid}','USA');`;
        results_table.append(
          `<tr id="search_domain_${item.uuid}"><td><a href="#" onclick=${func_call}>${item.name
           }</a></td><td>Domain</td><td>${item.state}</td><td>USA</td></tr>`,
        );
        if (item.state === 'disabled') {
          $(`tr#search_acct_${item.uuid}`).addClass('error');
        }
      });
    });
  });

  asia_database.getConnection((err, asia_conn) => {
    console.log(`Asia err: ${err}`);
    asia_conn.query(account_sql, (_err, results) => {
      asia_conn.release();
      // Display the results
      results.forEach((item) => {
        console.log('Putting results');
        const func_call = `showAcct('${item.uuid}','Asia');`;
        results_table.append(
          `<tr id="search_acct_${item.uuid}"><td><a href="#" onclick=${func_call}>${item.account_name}</a></td><td>Account</td><td>${item.state}</td><td>Asia</td></tr>`,
        );
        if (item.state === 'disabled') {
          $(`tr#search_acct_${item.uuid}`).addClass('error');
        }
      });
    });
  });

  asia_database.getConnection((err, asia_conn) => {
    console.log(`Asia err: ${err}`);
    asia_conn.query(domain_sql, (_err, results) => {
      asia_conn.release();
      // Display the results
      results.forEach((item) => {
        console.log('Putting results');
        const func_call = `showDomain('${item.uuid}','Asia');`;
        results_table.append(
          `<tr id="search_domain_${item.uuid}"><td><a href="#" onclick=${func_call}>${item.name}</a></td><td>Domain</td><td>${item.state}</td><td>Asia</td></tr>`,
        );
        if (item.state === 'disabled') {
          $(`tr#search_acct_${item.uuid}`).addClass('error');
        }
      });
    });
  });

  // Search for VMs
  const vm_sql = `select * from vm_instance where name like '%${
     the_search.val()
    }%' and removed is null limit 50;`;

  eu_database.getConnection((err, eu_conn) => {
    eu_conn.query(vm_sql, (_err, results) => {
      eu_conn.release();
      // Display the results
      results.forEach((item) => {
        console.log('Putting results');
        const func_call = `showVM('${item.uuid}','Europe');`;
        results_table.append(
          `<tr id="search_vm_${item.uuid}"><td><a href="#" onclick=${func_call}>${item.name
           }</a></td><td>VM</td><td>${item.state}</td><td>Europe</td></tr>`,
        );
        if (item.state === 'disabled') {
          $(`tr#search_vm_${item.uuid}`).addClass('error');
        }
      });
    });
  });

  usa_database.getConnection((err, usa_conn) => {
    usa_conn.query(vm_sql, (_err, results) => {
      usa_conn.release();
      // Display the results
      results.forEach((item) => {
        console.log('Putting results');
        const func_call = `showVM('${item.uuid}','USA');`;
        results_table.append(
          `<tr id="search_vm_${item.uuid}"><td><a href="#" onclick=${func_call}>${item.name
           }</a></td><td>VM</td><td>${item.state}</td><td>USA</td></tr>`,
        );
        if (item.state === 'disabled') {
          $(`tr#search_vm_${item.uuid}`).addClass('error');
        }
      });
    });
  });

  asia_database.getConnection((err, asia_conn) => {
    asia_conn.query(vm_sql, (_err, results) => {
      asia_conn.release();
      // Display the results
      results.forEach((item) => {
        console.log('Putting results');
        const func_call = `showVM('${item.uuid}','Asia');`;
        results_table.append(
          `<tr id="search_vm_${item.uuid}"><td><a href="#" onclick=${func_call}>${item.name
           }</a></td><td>VM</td><td>${item.state}</td><td>Asia</td></tr>`,
        );
        if (item.state === 'disabled') {
          $(`tr#search_vm_${item.uuid}`).addClass('error');
        }
      });
    });
  });

  console.log('Search complete');
  return false;
}

// TODO: Fix this
function saveConfig() {  // eslint-disable-line
  store.set('cs_url', $('input[name=cs_url]').val());
  store.set('cs_key', $('input[name=cs_key]').val());
  store.set('cs_secret', $('input[name=cs_secret]').val());
}

// script for index.html

const eu_cloudstack = new (require('cloudstack'))({  // eslint-disable-line
  apiUri: store.get('eu_cs_url'),
  apiKey: store.get('eu_cs_key'), // overrides process.env.CLOUDSTACK_API_KEY
  apiSecret: store.get('eu_cs_secret'), // overrides process.env.CLOUDSTACK_API_SECRET
});

const usa_cloudstack = new (require('cloudstack'))({  // eslint-disable-line
  apiUri: store.get('usa_cs_url'),
  apiKey: store.get('usa_cs_key'), // overrides process.env.CLOUDSTACK_API_KEY
  apiSecret: store.get('usa_cs_secret'), // overrides process.env.CLOUDSTACK_API_SECRET
});

const asia_cloudstack = new (require('cloudstack'))({  // eslint-disable-line
  apiUri: store.get('asia_cs_url'),
  apiKey: store.get('asia_cs_key'), // overrides process.env.CLOUDSTACK_API_KEY
  apiSecret: store.get('asia_cs_secret'), // overrides process.env.CLOUDSTACK_API_SECRET
});

function MainPage() {  // eslint-disable-line
  console.log('MainPage running....');
  // Hide all sections first
  $('div.row').css('display', 'none');

  // Check everything is configured and ready
  if (store.has('eu_cs_url')) {
    console.log(store.get('cs_url'));
    // Activate the search box
    $('div#search').css('display', 'block');

    // Stop loading screen
    $('div.ui.inverted.dimmer.active').removeClass('active');
  }
}


function addBreadCrumb(title, func) {
  const breadcrumbs = $('div.ui.row.breadcrumb');
  const last_item = breadcrumbs.children().last();
  if (last_item.text() !== title) {
    if (last_item.hasClass('active')) {
      const click = last_item.attr('click');
      const text = last_item.text();
      last_item.remove();
      breadcrumbs.append(`<a class="section" onclick="${click}">${text}</a>`);
    }
    breadcrumbs.append('<i class="right chevron icon divider"></i>');
    breadcrumbs.append(`<div class="active section" click="${func}">${title}</div>`);
  } else {
    console.log('Breadcrumbs match, not updating....');
  }
  return true;
}

function showAcct(uuid, region) {
  console.log('showAcct is running....');
  acctApp.region = region;  // eslint-disable-line
  acctApp.account = '';  // eslint-disable-line
  acctApp.networks = [];  // eslint-disable-line
  acctApp.vms = [];  // eslint-disable-line
  acctApp.users = [];  // eslint-disable-line
  // Show the loader
  $('div.ui.inverted.dimmer').addClass('active');

  // Hide everything except the search box
  $('div.row:not(#search)').css('display', 'none');

  // Do some cleaning up
  $('tbody#vms').children().remove();

  let cloudstack;

  if (region === 'Europe') {
    cloudstack = eu_cloudstack;
  }

  if (region === 'USA') {
    cloudstack = usa_cloudstack;
  }

  if (region === 'Asia') {
    cloudstack = asia_cloudstack;
  }

  // Get details of the account
  cloudstack.exec('listAccounts', { id: uuid }, (error, result) => {
    // console.log(result);
    const acct = result.account[0];
    acctApp.account = acct;  // eslint-disable-line

    // analytics.send('pageview', { dl: 'https://geekycode.io/stratus-desktop/showacct/' });
    // analytics.send('event', { ec: 'View', ea: 'Account', el: acct.name });

    // updateResources(acct);
    // Show the results div
    $('div.row.account').css('display', 'block');

    // Enable the tabs
    $('.menu .item').tab();

    // Update the breadcrumbs
    resetBreadCrumbs();
    addBreadCrumb(result.account[0].name, `showAcct('${result.account[0].id}','${region}');`);
    $('div.ui.breadcrumb').css('display', 'block');

    // Disable the main loader
    $('div.ui.inverted.dimmer.main.active').removeClass('active');

    // Activate the VMs loader
    $('div.ui.inverted.dimmer.vms').addClass('active');

    // Get details of the domain
    cloudstack.exec('listDomains', { id: acct.domainid }, (_error, _result) => {
      const domain = _result.domain;

      if (domain) {
        acctApp.domain = domain[0];  // eslint-disable-line
      }
    });


    // Get the VMs
    cloudstack.exec('listVirtualMachines', { domainid: acct.domainid }, (_error, _result) => {
      // console.log(result);
      // $('tbody#vms').children().remove()
      const vms = _result.virtualmachine;
      if (vms) {
        vms.forEach((vm) => {
          // console.log(vm);
          vm.raw_data = `<i id="vm_raw_${vm.id}" class="code icon" onclick="generateVMModal('${vm.id}');" data-html='<pre>${JSON.stringify(vm, null, 4)}</pre>'></i>`;  // eslint-disable-line
          vm.func_call = `showVM('${vm.id}','${region}');`;  // eslint-disable-line
          acctApp.vms.push(vm);  // eslint-disable-line
        });
        $('#vms_table').tablesort();
      }
      $('div.ui.inverted.dimmer.vms.active').removeClass('active');
    });

    // Get the Networks
    cloudstack.exec('listNetworks', { domainid: acct.domainid }, (_error, _result) => {
      // console.log(result);
      // $('tbody#vms').children().remove()
      const networks = _result.network;
      if (networks) {
        networks.forEach((network) => {
          // console.log(network);
          acctApp.networks.push(network);  // eslint-disable-line
        });
        $('#networks_table').tablesort();
      }
      $('div.ui.inverted.dimmer.networks.active').removeClass('active');
    });

    cloudstack.exec('listUsers', { domainid: acct.domainid }, (_error, _result) => {
      // console.log(error);
      // console.log(result);
      const users = _result.user;
      if (users) {
        users.forEach((user) => {
          acctApp.users.push(user);  // eslint-disable-line
        });
      }
    });
  });
  console.log('showAcct completed....');
}

function showVM(uuid, region) {  // eslint-disable-line
  console.log('showVM is running....');
  // Reset a few things
  vmApp.volumes = [];  // eslint-disable-line

  // Show the loader
  $('div.ui.inverted.dimmer.main').addClass('active');

  // Hide everything except the search box
  $('div.row:not(#search)').css('display', 'none');

  let cloudstack;
  let database;

  if (region === 'Europe') {
    cloudstack = eu_cloudstack;
    database = eu_database;
  }

  if (region === 'USA') {
    cloudstack = usa_cloudstack;
    database = usa_database;
  }

  if (region === 'Asia') {
    cloudstack = asia_cloudstack;
    database = asia_database;
  }

  // Get details of the account
  cloudstack.exec('listVirtualMachines', { id: uuid }, (error, result) => {
    console.log(result);
    vmApp.vm = result.virtualmachine[0];  // eslint-disable-line
    const vm = result.virtualmachine[0];

    // Search for accounts
    const account_sql = `select * from account where account_name = '${vm.account}';`;

    database.getConnection((err, conn) => {
      conn.query(account_sql, (_err, results) => {
        conn.release();
        // Display the results
        results.forEach((item) => {
          const func_call = `showAcct('${item.uuid}','${region}');`;
          console.log(`func_call = ${func_call}`);
          $('a#vm_acct').on('click', () => {
            showAcct(item.uuid, region);
          });
        });
      });
    });

    // Show the results div
    $('div.row.virtualmachine').css('display', 'block');

    // Update the breadcrumbs
    addBreadCrumb(vm.name, `showVM('${vm.id}','${region}');`);
    $('div.ui.breadcrumb').css('display', 'block');

    // Disable the main loader
    $('div.ui.inverted.dimmer.active').removeClass('active');

    // Do the NICs table
    console.log(vm.nic);
    if (vm.nic) {
      vm.nic.forEach((nic) => {
        console.log(nic);
        $('tbody#vm_nics').append(`<tr id="${nic.id}"></tr>`);
        $(`#${nic.id}`).append(`<td>${nic.networkname}</td>`);
        $(`#${nic.id}`).append(`<td>${nic.macaddress}</td>`);
        $(`#${nic.id}`).append(`<td>${nic.ipaddress}</td>`);
      });
    }
  });
  console.log(`Doing listVolumes on vm id ${uuid}`);
  cloudstack.exec('listVolumes', { virtualmachineid: uuid, listall: 'true' }, (error, result) => {
    console.log(error);
    console.log(result);
    const volumes = result.volume;
    $('tbody#vm_volumes').children().remove();
    if (volumes) {
      volumes.forEach((volume) => {
        console.log(volume);
        volume.raw_data = `<i id="raw_${volume.id}" class="code icon" onclick="generateVolumeModal('${volume.id}');" data-html='<pre>${JSON.stringify(volume, null, 4)}</pre>'></i>`;  // eslint-disable-line
        vmApp.volumes.push(volume);  // eslint-disable-line
      });
    }
    $('i.vol_popup').popup();
  });
  $('.menu .item').tab();
  console.log('showVM completed....');
}

function updateResources(acct) {  // eslint-disable-line
  console.log('Running updateResources....');
  $('td#cpulimit').text(acct.cpulimit);
  $('td#cpuused').text(acct.cputotal);
  $('td#cpuavail').text(acct.cpuavailable);
  $('td#ramlimit').text(acct.memorylimit);
  $('td#ramused').text(acct.memorytotal);
  $('td#ramavail').text(acct.memoryavailable);
  $('td#volumelimit').text(acct.volumelimit);
  $('td#volumeused').text(acct.volumetotal);
  $('td#volumeavail').text(acct.volumeavailable);
}

function generateVolumeModal(uuid) {  // eslint-disable-line
  const html = $(`#raw_${uuid}`).attr('data-html');
  $('#scrolling_modal_content').html(html);
  $('#scrolling_modal').modal('show');
}

function generateVMModal(uuid) {  // eslint-disable-line
  const html = $(`#vm_raw_${uuid}`).attr('data-html');
  $('#scrolling_modal_content').html(html);
  $('#scrolling_modal').modal('show');
}
