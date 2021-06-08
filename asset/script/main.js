const loadContent = ()=>{
    var contentId = location.hash;
    var html_file = `/asset/src/${contentId.substr(1)}.html`
    $(()=>{$("#contentLocation").load(html_file)})
    window.scrollTo(0,0)
}
if (!location.hash) {
    location.hash="#presentation"
}
loadContent()
window.addEventListener("hashchange",loadContent)