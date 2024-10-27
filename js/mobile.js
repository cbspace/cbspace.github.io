// Global to store status of sidebar
let sidebar_visible = false;

// Make website more readable on mobile devices
function is_mobile() {
    var device_is_mobile = false;

    if (navigator.userAgent.match(/Android/i)
    || navigator.userAgent.match(/webOS/i)
    || navigator.userAgent.match(/iPhone/i)
    || navigator.userAgent.match(/iPad/i)) 
    {
        device_is_mobile = true ;
    }

    // For local testing on PC
    //device_is_mobile = true;

    return device_is_mobile;
}

// Change element class names for mobile
function update_for_mobile() {
    if (!is_mobile()) { return; }

    // Change element widths
    document.getElementById('maincont').className = 'maincont mobile_hide';

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

    toggle_sidebar(false);
}

function sidebar_button_press() {
    if (is_mobile()) { 
        toggle_sidebar(!sidebar_visible);
    }
}

function toggle_sidebar(show=True) {
    if (show) {
        document.getElementById('sidepanel').className = 'sidepanel mobile_show';
        document.getElementById('iframecontainer').className = 'iframecontainer mobile_show';
        document.getElementById('maincont').className = 'maincont mobile_show';

        document.getElementById('expandbutton1').className = 'expandbutton mobile_show';
        document.getElementById('expandbutton2').className = 'expandbutton mobile_show';
        document.getElementById('expandbutton2').style.display = 'block';

        let arrow_elements = document.getElementsByClassName('arrow');
        for (block_idx=0; block_idx < arrow_elements.length; block_idx++) {
            arrow_elements[block_idx].innerHTML = '&nbsp;&lt;&lt;';
        }

        sidebar_visible = true;
    } else {
        document.getElementById('sidepanel').className = 'sidepanel mobile_hide';
        document.getElementById('iframecontainer').className = 'iframecontainer mobile_hide';
        document.getElementById('maincont').className = 'maincont mobile_hide';

        document.getElementById('expandbutton1').className = 'expandbutton mobile_hide';
        document.getElementById('expandbutton2').className = 'expandbutton mobile_hide';
        document.getElementById('expandbutton2').style.display = 'none';

        let arrow_elements = document.getElementsByClassName('arrow');
        for (block_idx=0; block_idx < arrow_elements.length; block_idx++) {
            arrow_elements[block_idx].innerHTML = '&nbsp;&gt;&gt;';
        }

        sidebar_visible = false;
    }
}

// Called from sidepanel.html
function update_sidepanel_for_mobile() {
    if (!is_mobile()) { return; }
    document.body.className = 'panel_mobile';
}