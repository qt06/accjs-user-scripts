// ==UserScript==
// @name  学习强国无障碍优化
// @namespace    https://accjs.org/
// @version      0.1
// @description  学习强国无障碍优化脚本
// @author  杨永全
// @updated  2021-11-20 22:28:10
// @match  https://article.xuexi.cn/articles/audio/*
// @grant  none
// ==/UserScript==

(function() {
function amo(proc, target, options) {
target = target || document.body;
options = options || {
      'childList': true,
      'subtree': true
    };
    let mo = new MutationObserver((records) => {proc();});
    mo.observe(target, options);
return mo;
}

  function isVisible(t) {
    return !! (!t.hasAttribute('disabled') && t.getAttribute('aria-hidden') !== 'true' && t.offsetParent !== null);
  }

  function gi(i, len, op) {
    let n = op == '+' ? +1 : -1;
    i = i + n;
    if (i >= len) {
      i = 0;
    }
    if (i < 0) {
      i = len - 1;
    }
    return i;
  }

  function _toFocus(el) {
    let tagName = el.tagName.toLowerCase();
    let tagNames = ['div', 'p', 'span', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'ul', 'ol', 'li', 'form', 'img', 'nav', 'header', 'main', 'footer', 'section', 'aside'];
    if (tagNames.includes(tagName) || (tagName == 'a' && !el.hasAttribute('href'))) {
      if (!el.hasAttribute('tabindex')) {
        el.setAttribute('tabindex', '-1');
      }
    }
    el.focus();
  }

  function toFocus(focusSelector, op) {
    let els = Array.prototype.slice.call(document.body.querySelectorAll('*'));
    let len = els.length;
    let aeIndex = Math.max(0, els.indexOf(document.activeElement));
    let i = aeIndex == 0 ? 0 : gi(aeIndex, len, op);
    do {
      if (els[i].matches(focusSelector) && isVisible(els[i])) {
        _toFocus(els[i]);
        break;
      }
      i = gi(i, len, op);
    } while ( i != aeIndex );
  }

  function nextFocus(selector) {
    toFocus(selector, '+');
  }

  function previousFocus(selector) {
    toFocus(selector, '-');
  }

//get label from attributes
function getLabel(labels, src) {
let label = '';
if(typeof src != 'string' || src == '') {
return label;
}
label = src;
for(let key in labels) {
if(src.includes(key)) {
label = labels[key];
break;
}
}
return label;
}


	function getMedia() {
	return document.querySelector('audio, video');
	}
	function setMediaVolume(op) {
	let c = getMedia();
	if(c == null) { return false; }
	if(op == '+') {
	c.volume = Math.min(c.volume + 0.05, 1);
	} else {
	c.volume = Math.max(c.volume - 0.05, 0);
	}
	}
	function setMediaCurrentTime(op) {
	let c = getMedia();
	if(c == null) { return false; }
	if(op == '+') {
	c.currentTime += 5;
	} else {
	c.currentTime -= 5;
	}
	}
	function toggleMediaPlay() {
	let c = getMedia();
	if(c == null) { return false; }
	if(c.paused) {
	c.play();
	} else {
	c.pause();
	}
	}
function proc() {

//label map
let labels = {
"close": "返回",
"btn-icon-play": "播放",
"btn-icon-pause": "暂停"
};

document.querySelectorAll('.close, .btn-icon-play, .btn-icon-pause').forEach((el) => {
el.setAttribute('role', 'button');
el.setAttribute('tabindex', '0');
el.setAttribute('aria-label', getLabel(labels, el.getAttribute('class')));
});
document.querySelectorAll('.song-info').forEach((el) => {
el.setAttribute('role', 'link');
el.setAttribute('tabindex', '0');
});

}
document.addEventListener('keydown', function(e) {
let t = e.target || null;
let xSelector = '.song-info, .btn-icon-play, .btn-icon-pause';
let xKey = e.keyCode == 88;
let zSelector = '.uploadBtn, div.f_cl';
let zKey = e.keyCode == 90;
        if (e.altKey && e.shiftKey && xKey) {
          e.preventDefault();
          previousFocus(xSelector);
        } else if (e.altKey && xKey) {
          e.preventDefault();
          nextFocus(xSelector);
        } else         if (e.altKey && e.shiftKey && zKey) {
          e.preventDefault();
          previousFocus(zSelector);
        } else if (e.altKey && zKey) {
          e.preventDefault();
          nextFocus(zSelector);
        } else if(e.keyCode == 32 || e.keyCode == 13) {
if(t.matches('[role="checkbox"], [role="button"], [role="link"]')) {
t.click();
}
}
}, null);
	document.addEventListener('keydown', function(e) {
	let keyCode = e.keyCode;
	let shiftKey = e.shiftKey;
	if(keyCode == 27) {
	e.preventDefault();
	toggleMediaPlay();
	}
	if((keyCode == 32) && !e.target.matches('input, button, select, textarea, [role="link"], [role="button"]')) {
	e.preventDefault();
	toggleMediaPlay();
	}
	if(shiftKey && keyCode == 38) {
	e.preventDefault();
	setMediaVolume('+');
	}
	if(shiftKey && keyCode == 40) {
	e.preventDefault();
	setMediaVolume('-');
	}
	if(shiftKey && keyCode == 37) {
	e.preventDefault();
	setMediaCurrentTime('-');
	}
	if(shiftKey && keyCode == 39) {
	e.preventDefault();
	setMediaCurrentTime('+');
	}

	}, null);
amo(proc);
proc();
})();
