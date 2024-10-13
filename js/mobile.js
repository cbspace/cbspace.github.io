// Temporary hack to make website more readable on mobile devices
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
}

function update_for_mobile() {
   // Change element widths
   let main_element = document.getElementById('maincont');
   main_element.style.width = '70%';
   
   // Increase font sizes
   document.body.style.fontSize = '22pt';
   
   let linkbold_elements = document.getElementsByClassName('linkbold');
   for (block_idx=0; block_idx < linkbold_elements.length; block_idx++) {
       linkbold_elements[block_idx].style.fontSize = '24pt';
   }
   
   let code_elements = document.getElementsByTagName('code');
   for (block_idx=0; block_idx < code_elements.length; block_idx++) {
       code_elements[block_idx].style.fontSize = '20pt';
   }
   
   let codeblock_elements = document.getElementsByTagName('codeblock');
   for (block_idx=0; block_idx < codeblock_elements.length; block_idx++) {
       codeblock_elements[block_idx].style.fontSize = '18pt';
   }
   
   document.getElementById('footer').style.fontSize = '16pt';
   
   // Update Sidepanel font sizes
   let sidepanel_element = document.getElementByName('sidepanel');
   let sp_headings = sidepanel_element.contentWindow.document.getElementsByClassName('paneltopic');

   sidepanel_element.contentWindow.document.body.style.fontSize = '16pt';

   for (block_idx=0; block_idx < sp_headings.length; block_idx++) {
       sp_headings[block_idx].style.fontSize = '18pt';
   }
}