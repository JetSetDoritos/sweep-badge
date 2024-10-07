//var sweep_addresses = ['donotreply@firstbilling.com','usbank@notifications.usbank.com','deals@da.slickdeals.net','capitalone@notification.capitalone.com',"oldnavy@email.oldnavy.com"]
//var sweep_addresses = []

function add_icons(){
    setTimeout(function(){
        //document.querySelector('span[title="usbank@notifications.usbank.com"]').insertAdjacentHTML("afterend",'<i data-icon-name="BroomRegular" aria-hidden="true" class="ms-Button-icon icon-284"><span role="presentation" aria-hidden="true" style="padding-left: 3px;height: 100%; text-align: center; vertical-align: top; width: 100%;" class="FLwLv"><i class="fui-Icon-font Q0K3G ___1hzgx0x f14t3ns0 fne0op0 fkc42ay fmd4ok8 f1sxfq9t" style="forced-color-adjust: unset;" fill="currentColor" aria-hidden="true"></i></span></i>')
        insert_all();
        updateRules();
        add_icons();
    }, 1000);
}



function updateRules(){
    if (document.querySelector('div[aria-label="Sweep rules"]') != null){
        var sweep_addresses = []
        console.log('Sweep rules updating..');
        if (document.querySelector('#sweeps-updated-message') == null){ 
            document.querySelector('div[aria-label="Sweep rules"]').insertAdjacentHTML("beforebegin",'<div id="sweeps-updated-message">Sweeps badge list updated!</div>')
        }
        document.querySelector('div[aria-label="Sweep rules"]').querySelectorAll('div').forEach(function (item, index) {
        if (item.textContent.startsWith("For messages received from ")){
            //console.log(item.textContent.split(' ')[4].substring(0, str.length - 1));
            sweep_addresses.push(item.textContent.split(' ')[4].slice(0,-1));
        }       
         
        });
        browser.storage.local.set({ "sweeps":sweep_addresses });


    }
    
}

/*

//potential update for mutation observer
let demo = document.querySelector(".jEpCF > div:nth-child(1)");

      function callback(mutationList, observer) {
        for (let list of mutationList) {
          // console.log(list.type) -> attribute | child (tag) change detect
          //list.addedNodes[0].nodeValue = "still change the value";
          //console.log(list);
          console.log(list.target.querySelector('span[title="' + 'oldnavy@email.oldnavy.com' + '"]'))
          //   list.target.innerHTML = "java";
        }
      }

      let mo = new MutationObserver(callback);

      //Element to detect changes
      mo.observe(demo, { childList: true, attributes: true, subtree: true });
 
      //Making changes so that mutation observer can detect change
      setTimeout(() => {
        demo.children[1].innerHTML = "javascript";
      }, 1000);

 */

function insert_all(){
    
    chrome.storage.local.get('sweeps', function (result) {
        var sweep_addresses = result.sweeps;
        //console.log(sweep_addresses);
        sweep_addresses.forEach(function (item, index) {
            //console.log(item, index);
            insert_icon(item);
            
          });
    });

}

function insert_icon(email_addr){
    if (document.querySelector('span[title="' + email_addr + '"]') != null){
        document.querySelectorAll('span[title="' + email_addr + '"]').forEach(function (item, index) {
                //only insert if thee is not existing sibling
                if(item.nextSibling == null){
                    item.insertAdjacentHTML("afterend",'<i data-icon-name="BroomRegular" aria-hidden="true" class="row-sweep-icon ms-Button-icon icon-284"><span role="presentation" aria-hidden="true" style="padding-left: 3px;height: 100%; text-align: center; vertical-align: top; width: 100%;" class="FLwLv"><i class="fui-Icon-font Q0K3G ___1hzgx0x f14t3ns0 fne0op0 fkc42ay fmd4ok8 f1sxfq9t" style="forced-color-adjust: unset;" fill="currentColor" aria-hidden="true"></i></span></i>');
                }
        });
    }

}



add_icons();

