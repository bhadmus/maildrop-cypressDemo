// ***********************************************
// Visit https://on.cypress.io/custom-commands to
// learn more about custom commands.
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add("retrieveOTP", (emailID) => {
  cy.wait(20000);
  cy.request({
    method: "POST",
    url: "https://api.maildrop.cc/graphql",
    headers: {
      "Content-Type": "application/json",
    },
    body: {
      query: ` query Example { inbox(mailbox:"${emailID}") { id headerfrom subject date } }`,
      variables: {},
    },
  }).then((resp) => {
    const ServerID = resp.body.data.inbox[0].id;
    cy.log(ServerID);

    return cy
      .request({
        method: "POST",
        url: "https://api.maildrop.cc/graphql",
        headers: {
          "Content-Type": "application/json",
        },
        body: {
          query: ` query Example {
      message(mailbox:"${emailID}", id:"${ServerID}") { id headerfrom subject date html}
    }`,
          variables: {},
        },
      })
      .then((resp) => {
        const emailBody = resp.body.data.message.html;
        cy.log(emailBody);
        const parser = new DOMParser();
        const doc = parser.parseFromString(emailBody, "text/html");
        const code = doc.querySelector(
          "tr:nth-of-type(2) > td > table td > p:nth-of-type(3)"
        ).textContent;
        const otp = code.trim();
        cy.get('input').each(($el, index) => {
          cy.wrap($el).should("be.visible").type(otp[index]);
        });
      });
  });
});
