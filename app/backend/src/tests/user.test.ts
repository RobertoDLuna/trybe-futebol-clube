import * as sinon from 'sinon';
import * as chai from 'chai'
// @ts-ignore
import chaiHttp from 'chai-http';

import {app} from '../app'
import UserModel from '../models/user.model';

import {Response} from 'superagent'

chai.use(chaiHttp);

const {expect} = chai
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoxLCJ1c2VybmFtZSI6IkFkbWluIiwicm9sZSI6ImFkbWluIiwiZW1haWwiOiJhZG1pbkBhZG1pbi5jb20iLCJwYXNzd29yZCI6IiQyYSQwOCR4aS5IeGsxY3pBTzBuWlIuLkIzOTN1MTBhRUQwUlExTjNQQUVYUTdIeHRMaktQRVpCdS5QVyJ9LCJpYXQiOjE2Njc1MTUxODF9.cd7bRQTy1eZU-8goQHqeGnUgzVTN3mAX2SwzEmNb6YI'

describe('Teste do Login', () => {
    let chaiHttpResponse: Response;

    beforeEach(async () => {
        sinon
        .stub(UserModel, "findOne")
        .resolves({
            email: 'admin@admin.com',
            password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW',
            role: 'admin'
        } as UserModel)
    })

    afterEach(sinon.restore)

    it('Teste se retorna o token com os dados corretos', async () => {
      const chaiHttpResponse = await chai
      .request(app)
      .post('/login').send({
        email: 'admin@admin.com',
        password: 'secret_admin'
      })

      expect(chaiHttpResponse.status).to.be.equal(200);
      expect(chaiHttpResponse.body).to.haveOwnProperty('token')
    })
    it('Testa se retorna erro ao tentar nao passar um dos campos',async () => {
      const chaiHttpResponse = await chai
      .request(app)
      .post('/login').send({
        email: 'admin@admin.com',
        password: ''
      });

      expect(chaiHttpResponse.status).to.be.equal(400);
      expect(chaiHttpResponse.body.message).to.be.equal('All fields must be filled')
    })
})