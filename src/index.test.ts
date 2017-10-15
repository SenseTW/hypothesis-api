import * as mocha from 'mocha'
import * as chai from 'chai'

import { Hypothesis } from './index'

const expect = chai.expect

describe('Hypothesis API', () => {
  it('should exists', () => {
    expect(Hypothesis).to.exist
    expect(Hypothesis.hello).to.exist
  })
})