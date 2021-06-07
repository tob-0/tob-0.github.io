function formatToId(text) {
    return `projects-${text.toLowerCase().replaceAll(' ','-')}`
}

projectTypes = document.getElementsByClassName('project-type')
for (const type of projectTypes) {
    type.addEventListener('click', () => {
        id = formatToId(type.innerText)
        display = document.getElementById(id).style.display
        console.log(id)
        if (display != 'block') document.getElementById(id).style.display='block'
        else document.getElementById(id).style.display ='none'
    })
}
