let PAGE_MAX_WIDTH = 750,
    BASE_FONT_SIZE = 50;
!function () {
    let DOC_ROOT_STYLE = document.documentElement.style,
        docEle = document.documentElement || document.body;
    window.addEventListener('load', resizeFontSize);
    window.addEventListener('resize', resizeFontSize);
    function resizeFontSize() {
        let clientWidth = Math.max(docEle.clientWidth || 0, window.innerWidth || 0);
        DOC_ROOT_STYLE.fontSize = Math.min(clientWidth / PAGE_MAX_WIDTH * BASE_FONT_SIZE, BASE_FONT_SIZE) + 'px';
    }
}();