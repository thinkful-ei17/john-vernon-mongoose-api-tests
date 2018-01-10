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


describe('GET endpoint',function(){
    it('should return all posts',function(){
        let res;
        return chai.request(app)
        .get('/posts')
        .then( _res => {
            res = _res;
            expect(res).should.have.status(200);
            expect(res.body.post).to.have.length.of(1);
            return BlogPost.count();
        })
        .then(count => {
            expect(res.body.post).to.have.length.of(count);
        })
    })
})