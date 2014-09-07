// ==UserScript==
// @name          HKG Auto Reply LM
// @author        indream
// @version       0.1.1
// @description   HKG Auto Reply LM
// @namespace     https://github.com/inDream
// @updateURL     https://raw.githubusercontent.com/inDream/hkg-autoLM/master/autoLM.meta.js
// @downloadURL   https://raw.githubusercontent.com/inDream/hkg-autoLM/master/autoLM.user.js
// @include       http://*.hkgolden.com/view.aspx?*
// @include       http://*.hkgolden.com/post.aspx?*
// @match         http://*.hkgolden.com/view.aspx?*
// @match         http://*.hkgolden.com/post.aspx?*
// @grant         none
// @copyright     2014+, inDream
// ==/UserScript==

var www = '', id, m, title, mid;
www = document.querySelector('a[href^="Javascript:bookmarkPost"]');
if(www){
    www = www;
  id = www.href.match(/\d+/);
}
m = document.querySelector('#ctl00_ContentPlaceHolder1_reply_messagesubject');
if(m){
    m = m;
    title = escape(m.textContent);
  mid = location.href.match(/id=(\d+)/)[1] || '';
}

var LMbtn = document.createElement('a');
LMbtn.textContent = '留名回覆';
LMbtn.href = 'javascript:retrun false;';
LMbtn.setAttribute('style', 'padding: 5px; margin: 5px; vertical-align: super;'+
    'background-image: linear-gradient(#85b7e7, #2a85dc); box-shadow: inset 0 0 3px #f0f6fc;'+
    'border: 1px solid #1f5e9b; color: white; text-shadow: 0 1px 1px #1a5186; text-decoration: none;');
var autoLM = function(){
    xmlHttp = GetXmlHttpObject();
    var url = '';
    if(www)url = '/js/saveBookmark.aspx?messageID=' + id;
    else if(m)url = 'AddBookmarkLink.aspx?bid=0&title=' + title + '&messageid=' + mid;
    if(url){
        xmlHttp.onreadystatechange = function(){
            if (xmlHttp.readyState == 4) {
                //alert("名已留");
                document.querySelector('#ctl00_ContentPlaceHolder1_btn_Submit').click();
            }
        };
        xmlHttp.open('POST', url, true);
        xmlHttp.send(null);
    }else{
      alert('Error!');
    }
}
LMbtn.addEventListener("click", autoLM, false);

var btn = document.querySelector('#ctl00_ContentPlaceHolder1_btn_Submit');
btn.parentNode.appendChild(LMbtn);
