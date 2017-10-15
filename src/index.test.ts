import * as mocha from 'mocha'
import * as chai from 'chai'
import { API } from './api'
import { Hypothesis } from './index'

const expect = chai.expect

let h

before(() => {
  const apiUrl = 'https://hypothes.is/api/'
  h = new Hypothesis(apiUrl)
})

after(() => {
  h = undefined
})

describe('Hypothesis API', () => {
  it('should exist', () => {
    expect(Hypothesis).to.exist
  })

  it('should list resources', async () => {
    const resources: API.Resources = await h.resources()

    expect(resources).to.exist
  })

  it('should read the user profile', async () => {
    const profile: API.Profile = await h.profile()

    expect(profile).to.exist
  })

  it('should read an annotation', async () => {
    const annotation: API.Annotation = await h.annotation('c5AeVv0pEeaWu_f_2ojWhw')

    expect(annotation).to.exist
  })
})
