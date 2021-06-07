function formatToId(text) {
    return `projects-${text.toLowerCase().replaceAll(' ','-')}`
}

projectTypes = document.getElementsByClassName('project-type')
for (const type of projectTypes) {
    type.addEventListener('click', () => {
        id = formatToId(type.innerText)
        
        display = document.getElementById(id).style.display
        if (display != 'block') {
            document.getElementById(id).style.display='block'
            type.style.backgroundColor="violet"
        }
        else{
            document.getElementById(id).style.display ='none'
            type.style.backgroundColor="black"
        }
    })
        } 




let projectsCardHTML={"projects-ada-tech-school":"","projects-perso":""};
$.getJSON('/asset/data/projects.json', (projects)=>{
    for (const project of projects) {
        projectsCardHTML[project.label]+=`
<div class="project-card size-l">
    <div class="card-elements">
        <div class="card-text">
        <p class="card-title">${project.title}</p>
        <p class="card-shortdesc">${project.shortdesc}</p>
        <div class="card-details">
            <span class="project-languages">${project.languages.join(', ')}</span>
        </div>
        </div>
    </div>
    <div class="card-elements">
        <div class="card-image">
        <a href="${project.link}" target='_blank'><img src="${project.image_link}" alt="${project.image_alt}"></a>
        </div>
    </div>
</div>`
    }
    for (const projType in projectsCardHTML) {
        document.getElementById(projType).innerHTML=`
        <div class="container">${projectsCardHTML[projType]}
        </div>`
    }
})