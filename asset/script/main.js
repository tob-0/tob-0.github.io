const loadContent = ()=>{
    console.debug('Content loading...');
    var contentId = location.hash;
    console.debug(`contentId=${contentId}`)
    var html_file = `/asset/src/${contentId.substr(1)}.html`
    console.debug(`html_file=${html_file}`);
    $(()=>{$("#contentLocation").load(html_file)})
    window.scrollTo(0,0)
}
if (!location.hash) {
    location.hash="#presentation"
}

loadContent()
window.addEventListener("hashchange",loadContent)
