// cypress/integration/apiTests.spec.js
describe('JSONPlaceholder API Tests', () => {

    it('Get post by ID', () => {
        const id = 1; 
      cy.request('GET', `/posts/${id}`).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('id', id);
      });
    });
  
    it('Get posts list', () => {
      cy.request('GET', '/posts').then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.be.an('array');
      });
    });
  
    it('Create new post', () => {
      cy.request('POST', '/posts', {
        title: 'BYD',
        body: 'E5',
        userId: 1
      }).then((response) => {
        expect(response.status).to.eq(201);
        expect(response.body).to.include({
          title: 'BYD',
          body: 'E5',
          userId: 1
        });
      });
    });
  
    it('Update post by ID', () => {
        const id = 1;
      cy.request('PUT', `/posts/${id}`, {
        id: id,
        title: 'Tesla',
        body: 'Model S',
        userId: 1
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.include({
          id: id,
          title: 'Tesla',
          body: 'Model S',
          userId: 1
        });
      });
    });
  
    it('Delete post by ID', () => {
        const id = 1;
      cy.request('DELETE', `/posts/${id}`).then((response) => {
        expect(response.status).to.eq(200);
      });
    });
  });