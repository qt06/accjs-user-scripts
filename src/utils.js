function addAttr(el, key, val) {
return el.setAttribute(key, val);
}

function setAttr(el, key, val) {
return addAttr(el, key, val);
}

function getAttr(el, key) {
return el.getAttribute(key);
}

function removeAttr(el, key ){
return el.removeAttribute(key);
}

function addClass(el, classes) {
classes.split(' ').forEach(function(className) {
el.classList.add(className);
});
}

function removeClass(el, classes) {
classes.split(' ').forEach(function(className) {
el.classList.remove(className);
});
}

function aamo(proc) {
    var mo = new MutationObserver((records) => {
proc(records);
});
    mo.observe(document.body, {
      'attributes': true,
//'attributeOldValue': true,
      'subtree': true,
'attributeFilter': ['class']
    });
return mo;
}

function acmo(proc) {
    let mo = new MutationObserver((records) => {
proc(records);
});
    mo.observe(document.body, {
      'childList': true,
      'subtree': true
    });
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

export {
aamo,
acmo,
nextFocus,
previousFocus,
addAttr,
removeAttr,
getAttr,
setAttr,
addClass,
removeClass
};
