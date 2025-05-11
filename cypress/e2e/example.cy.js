import { fakerEN_NG as faker } from "@faker-js/faker"
let data
let details
let basic
let other
let iden
let inboxId
let emailAddress
describe('Sign Up Journey', () => {
  beforeEach(() => {
    cy.fixture('example').then(sel => {
    //   data = sel
      basic = sel.basicDetailsPage
      other = sel.otherDetailsPage
      iden = sel.otpPage
    })
    cy.fixture('creds').then(cred => {
      details = cred
    })

  })
  it('A successful sign up with all fields filled', () => {
    cy.contains('Sign up').should('be.visible').click()
    cy.get(basic.fullnameField).should('be.visible').fill(faker.person.fullName())
    cy.get(basic.bizNameField).fill(faker.person.middleName())
    cy.get(basic.bizEmailField).fill(details.email)
    cy.get(basic.bizPhoneNum).fill(faker.phone.number({style:'international'}))
    cy.get(basic.bizRegNum).fill('RC-0987')
    cy.get('button').contains('Next').click()
    cy.get(other.WebField).should('be.visible').fill(faker.internet.domainName())
    cy.get(other.InsField).fill('@osmanshire')
    cy.get(other.TwtField).fill('@osmanshire')
    cy.get(other.heardAboutUs).click()
    cy.get('#scrollableDiv').contains('Google Search').should('be.visible').click()
    cy.get(other.passwordField).fill('Test@1234')
    cy.get('button').contains('Sign Up').click()
    cy.retrieveOTP(details.mailId)
  })
})