import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';
import Teams from '../database/models/TeamModel';
import { allTeams } from './mocks/teams.mock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testando a rota teams', () => {
  afterEach(() => {
    sinon.restore();
  })

  it('Verifica se retorna todos os times', async () => {
    sinon.stub(Teams, 'findAll').resolves(allTeams);

    const response: Response = await chai.request(app).get('/teams');

    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.deep.equal(allTeams);
  });

  it('Verifica se retorna o teme através do id', async () => {
    sinon.stub(Teams, 'findByPk').resolves(allTeams[1]);

    const response: Response = await chai.request(app).get('/teams/2');

    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.deep.equal(allTeams[1]);
  })
})