var _loadedImages=0,
_imageArray=new Array('arrow.png','bg.jpg','brush01.png','brush02.png','copy01_overlay.png','copy01.png','copyEF.png','ctaClose.png','ctaOpen.png','isi_arrow.png','isi_line.png','logo.png','logoGenentech.png','opacityEF.png'),
_tl,
_tlPulse,
_isiOpenCTA = document.getElementById('isi-open-cta'),
_isiText = document.getElementById('isi-text'),
_container = document.getElementById('isi'),
_isiControls = document.getElementById('isi-controls'),
_scrollForMore = document.getElementById('scrollForMore'),
_scrollerBeingDragged = false,
_scroller,_scrollerline,_arrowUp,_arrowDown,
_normalizedPosition,
_topPosition,
_contentPosition = 0,
_percentY,
autoScroll,//Interval
autoScrollSpeed = 80,//
scrollStep = 5,//Arrow click seek
_textScrollHeight,
_isiOpened = true,
_isiCollapsed = 720,
_isiExpanded = 1400;

this.addEventListener('DOMContentLoaded', preloadImages);

function preloadImages() {
    for (var i = 0; i < _imageArray.length; i++) {
        var _tempImage = new Image();
        _tempImage.addEventListener('load', trackProgress);
        _tempImage.src = _imageArray[i];
    }
}

function trackProgress(){
    _loadedImages++;
    if(_loadedImages == _imageArray.length) init();
}

function init(){
    var css = document.createElement( 'link' );
    css.setAttribute( 'rel', 'stylesheet' );
    css.setAttribute( 'type', 'text/css' );
    css.setAttribute( 'href', "style.css" );
    document.getElementsByTagName('head')[0].appendChild(css);

    _tl = new TimelineMax({delay:1});
    _tlPulse = new TimelineMax({delay:1, repeat:50, yoyo:true});
    initAnimations();
    _isiOpenCTA.addEventListener('click', function(){
      _isiCollapsed = 720;
      actionsISIButton();
    }, null);
}

function initAnimations(){
    console.time('TotalTime');
    console.time('==>');
    _tlPulse.to('#isi-open-cta',.5,{scale:1.03,ease: Sine.easeInOut})

    _tl
    .to(_tl,.2,{timeScale:2, ease: Power2.easeIn}, '-=3')
    
    .addLabel('greenWords','+=2.98')
    .to('.greenWords',.75,{opacity:1,ease: Sine.easeInOut,onStart:function(){
        console.log('Note 1:'); console.timeLog('==>');
    }},'greenWords')

    .addLabel('greenlightWords','+=3.3')
    .to('.greenlightWords',.75,{opacity:1,ease: Sine.easeInOut,onStart:function(){
        console.log('Note 2:'); console.timeLog('==>');
    }},'greenlightWords')


    .to('.greenWords',.75,{opacity:0,ease: Sine.easeInOut},'greenlightWords')
    .to('#brush01',1,{opacity:1,ease: Sine.easeInOut},'-=.8')

    .addLabel('EF','+=3.15')
    .to('.copy01',1,{opacity:0}, 'EF')
    .to('#opacity',.2,{opacity:0,ease: Sine.easeInOut}, 'EF')
    .to('#opacityEF',.2,{opacity:1,ease: Sine.easeInOut,onStart:function(){
        console.log('Note 3:'); console.timeLog('==>');
    }}, 'EF')

    .to(['#copyEF','#logo'],1,{opacity:1,ease: Sine.easeInOut}, '-=.5')
    .to('#brush01',1,{opacity:0,scaleX:1.5,y:30,ease: Sine.easeInOut},'-=1.5')
    .to(['#brush02','#addText','#copyFPI'],1,{opacity:1,ease: Sine.easeInOut, onComplete: function(){ _isiOpened = false } }, '-=.9')

    .call(function() {
      // console.log('call 1' + _isiOpened);
      if (!_isiOpened) {
        // console.log('_isiOpened' + _isiOpened);
        actionsISIButton();
        TweenMax.delayedCall(10, function() {
            // console.log('_isiOpened');
            console.timeEnd('TotalTime')        
            actionsISIButton() });
        _container.addEventListener('click', function(){ _isiCollapsed = _isiExpanded}, null);
      }
    },null,null,'+=7.4')
    .call(function(){console.log('Note 4:'); console.timeLog('==>');})
    ;

}



function actionsISIButton(){
  if (_container.style.height === '' || _container.style.height == '720px') {
    TweenMax.to(_container,.5,{ height:_isiExpanded });
    TweenMax.to('#open-cta-arrow',.5,{ rotation:180 });
    TweenMax.to('#open-cta-text',.5,{ opacity: 0 });
    TweenMax.to('#close-cta-text',.5,{ opacity: 1 });
    TweenMax.set('#isi-controls',{ autoAlpha:0 });
    _tl.seek(_tl.totalDuration(), false);
    _tlPulse.pause();
    _isiOpened = true;
  } else {
    TweenMax.to(_container,.5,{ height:_isiCollapsed });
    TweenMax.to('#open-cta-arrow',.5,{ rotation:0 });
    TweenMax.to('#open-cta-text',.5,{ opacity: 1 });
    TweenMax.to('#close-cta-text',.5,{ opacity: 0 });
  }
}


 


