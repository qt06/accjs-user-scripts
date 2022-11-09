// ==UserScript==
// @name  解决淘宝商品无法读出尺码和颜色的问题
// @namespace  https://accjs.org/
// @version  0.1
// @description  解决淘宝商品无法读出尺码和颜色等问题
// @author  杨永全
// @updated  2022-11-09
// @match  https://item.taobao.com/item.htm*
// @grant  none
// ==/UserScript==

(function() {
setTimeout(() => document.querySelectorAll('a').forEach(a => a.setAttribute('aria-label', a.textContent)), 1500);
})();
