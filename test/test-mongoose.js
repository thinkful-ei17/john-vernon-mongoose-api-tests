'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const faker = require('faker');
const mongoose = require('mongoose');

const should = chai.should();

const { BlogPost } = require('../models');
const { closeServer, runServer, app } = require('../server');
const { TEST_DATABASE_URL } = require('../config');

chai.use(chaiHttp);

const expect = chai.expect;


describe('GET endpoint',function(){
  // Before our tests run, we activate the server. Our `runServer`
// function returns a promise, and we return the that promise by
// doing `return runServer`. If we didn't return a promise here,
// there's a possibility of a race condition where our tests start
// running before our server has started.
before(function() {
  return runServer();
});

// although we only have one test module at the moment, we'll
// close our server at the end of these tests. Otherwise,
// if we add another test module that also has a `before` block
// that starts our server, it will cause an error because the
// server would still be running from the previous tests.
after(function() {
  return closeServer();
});

    it('should return all posts',function(){
        let res;
        return chai.request(app)
        .get('/posts')
        .then( _res => {
            res = _res;
            expect(res).to.have.status(200);
            expect(res.body).to.have.length.of.at.least(1);
            return BlogPost.count();
        })
        .then(count => {
            //expect(res.body.post).to.have.length.of(count);
        })
    })
})
