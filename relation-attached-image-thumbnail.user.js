// ==UserScript==
// @name         Re:lation Attached Image Thumbnail View
// @namespace    http://tampermonkey.net/
// @version      0.4
// @description  *
// @author       shiraishi@seed24.jp
// @match        https://*.relationapp.jp/tickets/*
// @updateURL    https://gist.github.com/SEED-SHIRAISHI/6112c5d5a9733db658c909a5696d58f9/raw/28a639fda052744f0aaf7939269e239a064bcbe2/relation-attached-image-thumbnail.user.js
// @downloadURL  https://gist.github.com/SEED-SHIRAISHI/6112c5d5a9733db658c909a5696d58f9/raw/28a639fda052744f0aaf7939269e239a064bcbe2/relation-attached-image-thumbnail.user.js
// @grant        none
// ==/UserScript==

function getFileExtension(filename) {
  const parts = filename.split('.');
  return parts.length > 1 ? parts.pop() : '';
}

function method1()
{
  let processed     = false;
  let process_count = 0;

  jQueryPlus.find('#ticket-detail .attachments a[target^="src_"]').forEach( (e, i, a) => {
    processed = true;
    const e1 = jQueryPlus(e);
    const target_no = e1.attr("target").replace("src_file_", "");
    const path      = e1.attr("href");
    const filename  = e1.find("span").first().text();

    const ext = getFileExtension(filename);

    if( !/^(jpg|png|gif|jpeg)$/i.test(ext) )
    {
        return;
    }

    const target_img = jQueryPlus.find('#sd-thumbnail-' + target_no);

    if( target_img.length == 0 )
    {
      const preview_link = jQueryPlus( 'a[target^="preview_file_' + target_no + '"]' );
      preview_link.append('<img id="sd-thumbnail-' + target_no + '" src="' + path + '" height="150px" width="150px" />');

      process_count++;
    }
    // console.log( target_no, path, filename, ext );
  })

  if(processed && process_count == 0)
  {
    //clearInterval(window.sd_processid_001);
    //console.log("non process.");
  }
}



window.addEventListener('load', function() {
  'use strict';

  const id = setInterval(method1, 1000);

  window.sd_processid_001 = id;
});
