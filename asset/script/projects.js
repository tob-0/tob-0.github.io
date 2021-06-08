$.getJSON('/asset/data/projects-tree.json', (projectTypes)=>{
    finalStr = "projects/\n"
    for (const key in projectTypes) {
        objKey = Object.keys(projectTypes)
        idxKey = objKey.indexOf(key)
        nbProjects = key.length
        symbol = (idxKey == objKey.length -1) ? "└── " : "├── "
        finalStr += symbol + key + "/\n"

        for (const project of projectTypes[key]) {
            idxProject = projectTypes[key].indexOf(project)
            symbol = (idxProject ==projectTypes[key].length -1) ? "└── " : "├── "
            padding = (nbProjects && idxKey != objKey.length -1) ? "│   ":"    "
            finalStr+= `${padding}${symbol}<a href=${project.link} target=_blank>${project.title}</a>/\n`
        }
    }
    document.getElementById("projects").innerHTML="<pre>"+finalStr+"</pre>"
    console.log(finalStr)
})