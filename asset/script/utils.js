ats = document.getElementsByClassName('github-user')
for (const at of ats) {
    at.href = `https://github.com/${at.text.slice(1)}`
}
mails = document.getElementsByClassName('mail')
for (const mail of mails) {
    mail.href = 'mailto:'+mail.text
}
