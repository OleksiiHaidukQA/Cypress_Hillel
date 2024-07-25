describe('JSONPlaceholder API Tests', () => {

    const postData = {
        title: 'BYD',
        body: 'E5',
        userId: 1
    };

    const updatedPostData = {
        id: 1,
        title: 'Tesla',
        body: 'Model S',
        userId: 1
    };

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
      cy.request('POST', '/posts', postData).then((response) => {
        expect(response.status).to.eq(201);
        expect(response.body).to.include(postData);
      });
    });
  
    it('Update post by ID', () => {
        const id = 1;
      cy.request('PUT', `/posts/${id}`, updatedPostData).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.include(updatedPostData);
      });
    });
  
    it('Delete post by ID', () => {
        const id = 1;
      cy.request('DELETE', `/posts/${id}`).then((response) => {
        expect(response.status).to.eq(200);
      });
    });
});