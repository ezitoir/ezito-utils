'use strict';

function detectDevice(){
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ? 'mobile' : 'desktop';
}

module.exports = detectDevice ;
