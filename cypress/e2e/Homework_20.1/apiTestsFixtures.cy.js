// cypress/integration/apiTests.spec.js
describe('JSONPlaceholder API Tests', () => {

    beforeEach(() => {
      cy.fixture('testData').as('data');
    });
  
    it('Get post by ID', () => {
      cy.request('GET', '/posts/1').then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('id', 1);
      });
    });
  
    it('Get posts list', () => {
      cy.request('GET', '/posts').then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.be.an('array');
      });
    });
  
    it('Create new post', function() {
      cy.request('POST', '/posts', this.data.post).then((response) => {
        expect(response.status).to.eq(201);
        expect(response.body).to.include(this.data.post);
      });
    });
  
    it('Update post by ID', function() {
      cy.request('PUT', '/posts/1', this.data.updatedPost).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.include(this.data.updatedPost);
      });
    });
  
    it('Delete post by ID', () => {
      cy.request('DELETE', '/posts/1').then((response) => {
        expect(response.status).to.eq(200);
      });
    });
  });