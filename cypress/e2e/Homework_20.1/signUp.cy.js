import { GenerateChars } from "../Homework_18.1/utils/GeneratingChars"
import customBrands from "../../fixtures/custom-brands.json"
import customBrandsLong from "../../fixtures/custom-brands-long.json"
import customModels from "../../fixtures/custom-models.json"

describe('Cypress network', ()=>{

  it.only('intercept', ()=>{
        cy.visit('https://guest:welcome2qauto@qauto2.forstudy.space/')
        const generateChars = new GenerateChars()
        const email = generateChars.getRandomEmail(10)
        const password = 'Q123q123_'

        cy.intercept('api/auth/signup', (req)=>{
          expect(req.body.email).to.eq(email)
          return req
        })

        cy.get('.btn-primary').click()
        cy.get('#signupName').type('Oleksii')
        cy.get('#signupLastName').type('Haiduk')
        cy.get('#signupEmail').type(email)
        cy.get('#signupPassword').type(password)
        cy.get('#signupRepeatPassword').type(password)

        cy.get('.modal-footer .btn-primary').click()

        cy.get('button').contains('Add car').should('be.visible')
  })
})


describe('Cypress network 2', ()=> {
  beforeEach(() => {
    cy.visit('https://guest:welcome2qauto@qauto2.forstudy.space/')
    cy.get('button.-guest').click()
  })

  it('mock response', ()=>{

    cy.intercept("GET", "/api/cars/brands", {
      "status": "ok",
      "data": customBrands
    })

    cy.intercept("GET", "/api/cars/models?carBrandId=1", {
      "status": "ok",
      "data": customModels
    })

    cy.get('button.btn-primary').click()
    cy.get('div.modal-content').should('be.visible')
  })

  it('mock response (too long names)', ()=>{
    cy.intercept("GET", "/api/cars/brands", {
      "status": "ok",
      "data": customBrandsLong
    })
    cy.intercept("GET", "/api/cars/models?carBrandId=1", {
      "status": "ok",
      "data": customModels
    })

    cy.get('button.btn-primary').click()
    cy.get('div.modal-content').should('be.visible')
  })
})