
// Import commands.js using ES2015 syntax:
import './commands';
import 'cypress-fill-command'
import 'cypress-mochawesome-reporter/register'


let mailId
beforeEach(()=>{
    cy.on('uncaught:exception', ()=>{
        return false
    })
    cy.visit('/')
})

before(()=>{
    
    const mail = new Date().getTime()
    const mailSuffix = mail.toString().substring(6,13)
    mailId = `test${mailSuffix}`
    const emailAddress = `${mailId}@maildrop.cc`
    const userDetails = `
                {
                  "email": "${emailAddress}",
                  "mailId": "${mailId}"
                }
      `
      cy.writeFile('cypress/fixtures/creds.json', userDetails)
})