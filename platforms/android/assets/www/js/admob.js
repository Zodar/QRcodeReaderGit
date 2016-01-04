var admobid = {};

if ( /(android)/i.test(navigator.userAgent) ) { 
    admobid = {
        banner: 'ca-app-pub-7962913569595328/2711873891'
    };
}

if(( /(ipad|iphone|ipod|android|windows phone)/i.test(navigator.userAgent) )) {
    document.addEventListener('deviceready', initApp, false);
} else {
    initApp();
}

function initApp() {
//	
//    AdMob.createBanner( {
//        adId: admobid.banner, 
//        isTesting: true,
//        overlap: false, 
//        offsetTopBar: false, 
//        position: AdMob.AD_POSITION.BOTTOM_CENTER,
//        bgColor: 'black'
//    } );
}