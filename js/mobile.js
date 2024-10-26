// Global to store status of sidebar
let sidebar_visible = false;

// Make website more readable on mobile devices
function check_device() {
   var is_mobile = false;

  if (navigator.userAgent.match(/Android/i)
   || navigator.userAgent.match(/webOS/i)
   || navigator.userAgent.match(/iPhone/i)
   || navigator.userAgent.match(/iPad/i)) 
  {
     is_mobile = true ;
     update_for_mobile();
   }

   // For local testing on PC
   //update_for_mobile();
}

function update_for_mobile() {
   // Change element widths
   let main_element = document.getElementById('maincont');
   main_element.className = 'maincont mobile';
   
   // Increase font sizes
   document.body.className = 'body mobile';
   
   let linkbold_elements = document.getElementsByClassName('linkbold');
   for (block_idx=0; block_idx < linkbold_elements.length; block_idx++) {
       linkbold_elements[block_idx].className = 'linkbold mobile';
   }
   
   let code_elements = document.getElementsByTagName('code');
   for (block_idx=0; block_idx < code_elements.length; block_idx++) {
       code_elements[block_idx].className = 'mobile';
   }
   
   let codeblock_elements = document.getElementsByTagName('codeblock');
   for (block_idx=0; block_idx < codeblock_elements.length; block_idx++) {
       codeblock_elements[block_idx].className = 'mobile';
   }
   
   document.getElementById('footer').className = 'footer mobile';
   
   // Update Sidepanel for mobile
   document.getElementById('sidepanel').className = 'sidepanel mobile_hide';
   document.getElementById('iframecontainer').className = 'iframecontainer mobile_hide';

//    let sidepanel_element = document.getElementByName('sidepanel');
//    let sp_headings = sidepanel_element.contentWindow.document.getElementsByClassName('paneltopic');

//    sidepanel_element.contentWindow.document.body.style.fontSize = '16pt';

//    for (block_idx=0; block_idx < sp_headings.length; block_idx++) {
//        sp_headings[block_idx].style.fontSize = '18pt';
//    }
}

function toggle_sidebar() {
    if (sidebar_visible) {
        document.getElementById('sidepanel').className = 'sidepanel mobile_hide';
        document.getElementById('iframecontainer').className = 'iframecontainer mobile_hide';
        sidebar_visible = false;
    } else {
        document.getElementById('sidepanel').className = 'sidepanel mobile_show';
        document.getElementById('iframecontainer').className = 'iframecontainer mobile_show';
        sidebar_visible = true;
    }
}