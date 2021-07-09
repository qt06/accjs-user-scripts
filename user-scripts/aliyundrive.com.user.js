// ==UserScript==
// @name  阿里云盘无障碍优化
// @namespace    https://accjs.org/
// @version      0.1
// @description  阿里云盘无障碍优化脚本
// @author  杨永全
// @match  https://www.aliyundrive.com/*
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

function proc() {
/*utils*/
//icon map
let icons = {
"图片": "PDSImage",
"视频": "PDSVideo",
"文件夹": "PDSFolder",
"文档": "PDSDoc",
"音频": "PDSAudio",
"info": "PDSInfo",
"文件": "PDSFile",
"相册": "PDSAlbum",
"保险箱": "PDSVault",
"搜索": "PDSSearch",
"添加": "PDSAdd",
"排序": "PDSSort",
"拖拽": "PDSDrag",
"SquareGrid": "SquareGrid",
"左箭头": "ArrowLeft",
"右箭头": "ArrowRight",
"上箭头": "ArrowUp",
"下箭头": "ArrowDown",
"左箭头": "PDSArrowLeftBox",
"右箭头": "PDSArrowRightBox",
"上箭头": "PDSArrowUpBox",
"下箭头": "PDSArrowDownBox",
"箭头": "PDSArrowRULD",
"chevron": "PDSChevronDown",
"下载": "DownLoad",
"分享": "Share",
"收藏": "Star",
"删除": "Trash",
"编辑": "PDSEditCircle",
"时间": "PDSTime",
"路径": "PDSMappin",
"重命名": "PDSRename",
"pip": "PDSPip",
"快进": "PDSForwardEndFill",
"播放": "PDSPlayCircle",
"sidebar": "PDSSidebar",
"播放": "PlayFill",
"播放列表": "PlayList",
"速度": "Speed",
"重复": "Repeat",
"静音": "volume3",
"取消静音": "volume0",
"已选中": "Checkmark",
"更多": "MoreCircle",
"更多": "More",
"关闭": "CloseCircle",
"关闭": "Close"
};

//get label from icon
function getLabel(labels, src) {
let label = '';
if(typeof src != 'string' || src == '') {
return label;
}
for(let key in labels) {
if(src.includes(labels[key])) {
label = key;
break;
}
}
return label;
}


//file list
document.querySelectorAll('[class*="node-card-container"]').forEach(function(el) {
el.querySelectorAll('[role="checkbox"]').forEach(function(cb) {
cb.setAttribute('tabindex', '0');
cb.setAttribute('aria-label', (el.querySelector('[class*="title"]').innerText || ''));
});
el.querySelectorAll('[class*="info"]').forEach(function(el1) {
el1.setAttribute('tabindex', '0');
el1.setAttribute('role', 'link');
});
});

//icon buttons
document.querySelectorAll('[data-icon-type]').forEach(function(el) {
el.setAttribute('tabindex', '0');
el.setAttribute('role', 'button');
el.setAttribute('aria-label', getLabel(icons, el.getAttribute('data-icon-type')));
//el.setAttribute('aria-label', el.getAttribute('data-icon-type'));
});
//navbar menu
document.querySelectorAll('li[class*="nav-menu-item"]').forEach(function(el) {
el.setAttribute('role','link');
el.setAttribute('tabindex', '0');
el.querySelectorAll('span[data-icon-type]').forEach(function(el1) {
el1.removeAttribute('tabindex');
el1.removeAttribute('role');
el1.setAttribute('aria-hidden', 'true');
});
});

//ant-dropdown-menu-item
document.querySelectorAll('[role="menu"], [role="menuitem"]').forEach(function(el) {
el.removeAttribute('role');
});
document.querySelectorAll('.ant-dropdown-menu-item').forEach(function(el) {
el.setAttribute('tabindex', '0');
el.setAttribute('role','button');
});

//for share page
document.querySelectorAll('header [class*="action"] [class*="button-wrapper"]').forEach(function(el) {
el.setAttribute('tabindex', '0');
el.setAttribute('role', 'button');
});
document.querySelectorAll('[data-col-key="name"]').forEach(function(el) {
el.querySelectorAll('[role="checkbox"]').forEach(function(cb) {
cb.setAttribute('tabindex', '0');
cb.setAttribute('aria-label', (el.querySelector('[class*="text-primary"]').innerText || ''));
});
});
}
document.addEventListener('keydown', function(e) {
if((e.keyCode === 32 || e.keyCode === 13) && e.target.matches('[role="checkbox"], [role="button"], [role="link"]')) {
e.target.click();
}
}, null);
amo(proc);
proc();
})();
