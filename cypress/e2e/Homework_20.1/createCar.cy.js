import expectedBrands from "../../fixtures/brands.json"
import customBrands from "../../fixtures/custom-brands.json"
import customBrandsLong from "../../fixtures/custom-brands-long.json"
import customModels from "../../fixtures/custom-models.json"

describe('Cypress network', ()=>{
    beforeEach(()=>{
      cy.visit('https://guest:welcome2qauto@qauto.forstudy.space/')
      cy.get('button.-guest').click()
    })
  
    it('intercept', ()=>{
        cy.intercept("GET", "/api/cars/brands").as("brands")
  
        cy.get('button.btn-primary').click()
        cy.get('div.modal-content').should('be.visible')
  
        cy.wait("@brands").its("response.body.data").should("deep.equal", expectedBrands)
    })
  
    it('mock response', ()=>{
      cy.intercept("GET", "/api/cars/brands", {
        "status": "ok",
        "data": customBrands
      }).as("customBrands")
      cy.intercept("GET", "/api/cars/models?carBrandId=1", {
        "status": "ok",
        "data": customModels
      }).as("customModels")
  
      cy.get('button.btn-primary').click()
      cy.get('div.modal-content').should('be.visible')
  
      cy.wait("@customBrands")
      cy.wait("@customModels")
    })
  
    it('mock response (too long names)', ()=>{
      cy.intercept("GET", "/api/cars/brands", {
        "status": "ok",
        "data": customBrandsLong
      }).as("customBrandsLong")
      cy.intercept("GET", "/api/cars/models?carBrandId=1", {
        "status": "ok",
        "data": customModels
      }).as("customModelsLong")
  
      cy.get('button.btn-primary').click()
      cy.get('div.modal-content').should('be.visible')
  
      cy.wait("@customBrandsLong")
      cy.wait("@customModelsLong")
    })
  
    it('mock response (no brands)', ()=>{
      cy.intercept("GET", "/api/cars/brands", {
        "status": "ok",
        "data": []
      }).as("noBrands")
  
      cy.get('button.btn-primary').click()
      cy.get('div.modal-content').should('be.visible')
  
      cy.wait("@noBrands")
    })
})