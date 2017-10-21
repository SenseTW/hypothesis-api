import * as mocha from 'mocha'
import * as chai from 'chai'
import { API } from './api'
import { Hypothesis } from './index'

const expect = chai.expect
const TIME_OUT = 5000

let h

before(() => {
  const apiUrl = 'https://hypothes.is/api/'
  h = new Hypothesis(apiUrl)
})

after(() => {
  h = undefined
})

/**
 * Test if the given object is a Link.
 *
 * If we use flowtype, we can use `babel-plugin-flow-runtime` to keep type
 * informations for jest.
 * We can install `ts-runtime` but I think it's better to have a register of
 * `ts-runtime` for mocha. So we don't have to write this.
 *
 * @param {API.Link} obj - The object to test.
 */
const expectToBeALink = (obj: API.Link) => {
  expect(obj).to.be.an('object')
  expect(obj.url).to.be.a('string')
  expect(obj.method).to.be.oneOf(['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD'])
  expect(obj.desc).to.be.a('string')
}

/**
 * Test if the given object is a Group.
 *
 * @param {API.Group} obj - The object to test.
 */
const expectToBeAGroup = (obj: API.Group) => {
  expect(obj).to.be.an('object')
  expect(obj.id).to.be.a('string')
  expect(obj.name).to.be.a('string')
  expect(obj.public).to.be.a('boolean')
}

/**
 * Test if the given object is a Selector.
 *
 * @param {API.Selector} obj - The object to test.
 */
const expectToBeASelector = (obj: API.Selector) => {
  expect(obj).to.be.an('object')
  expect(obj.type).to.be.a('string')
}

/**
 * Test if the given object is an array or map of some type.
 *
 * @param {any} obj - The array or object to test.
 */
const expectToBeAnContainerOf = (obj: any, ty: string) => {  
  expect(obj).to.be.exist
  for (let k in obj) {
    expect(obj[k]).to.be.a(ty)
  }
}

/**
 * Test if the given object is an annotation.
 *
 * @param {API.Annotation} obj - The object to test.
 */
const expectToBeAnAnnotation = (obj: API.Annotation) => {
  expect(obj).to.contain.keys(
    'created',
    'updated',
    'group',
    'flagged',
    'user',
    'hidden',
    'document',
    'permissions',
    'tags',
    'target',
    'links',
    'text',
    'uri',
    'id'
  )
  expect(obj.created).to.be.a('string')
  expect(obj.updated).to.be.a('string')
  expect(obj.group).to.be.a('string')
  expect(obj.flagged).to.be.a('boolean')
  expect(obj.user).to.be.a('string')
  expect(obj.hidden).to.be.a('boolean')
  if (obj.document.title) {
    expectToBeAnContainerOf(obj.document.title, 'string')
  }
  expectToBeAnContainerOf(obj.permissions.read, 'string')
  expectToBeAnContainerOf(obj.permissions.admin, 'string')
  expectToBeAnContainerOf(obj.permissions.update, 'string')
  expectToBeAnContainerOf(obj.permissions.delete, 'string')
  if (obj.references) {
    expectToBeAnContainerOf(obj.references, 'string')
  }
  expectToBeAnContainerOf(obj.tags, 'string')
  for (let k in obj.target) {
    expect(obj.target[k].source).to.be.a('string')
    for (let j in obj.target[k].selector) {
      expectToBeASelector(obj.target[k].selector[j])
    }
  }
  expect(obj.links.json).to.be.a('string')
  expect(obj.links.html).to.be.a('string')
  expect(obj.links.incontext).to.be.a('string')
  expect(obj.text).to.be.a('string')
  expect(obj.uri).to.be.a('string')
  expect(obj.id).to.be.a('string')
}

describe('Hypothesis API', () => {
  it('should exist', () => {
    expect(Hypothesis).to.exist
  })

  it('should list resources', async () => {
    expect(h.resources).to.exist

    const resources: API.Resources = await h.resources()

    expect(resources).to.have.all.keys('message', 'links')
    expect(resources.message).to.be.a('string')
    expect(resources.links)
      .to.have.all.keys('profile', 'search', 'group', 'annotation', 'links')
    expectToBeALink(resources.links.profile.read)
    expectToBeALink(resources.links.profile.update)
    expectToBeALink(resources.links.search)
    expect(resources.links.group.member).to.be.an('object')
    expectToBeALink(resources.links.group.member.delete)
    expectToBeALink(resources.links.annotation.hide)
    expectToBeALink(resources.links.annotation.unhide)
    expectToBeALink(resources.links.annotation.read)
    expectToBeALink(resources.links.annotation.create)
    expectToBeALink(resources.links.annotation.update)
    expectToBeALink(resources.links.annotation.flag)
    expectToBeALink(resources.links.annotation.delete)
    expectToBeALink(resources.links.links)
  }).timeout(TIME_OUT)

  it('should read the user profile', async () => {
    const profile: API.Profile = await h.profile()

    expect(profile).to.have.all.keys('authority', 'features', 'groups', 'preferences', 'userid')
    expect(profile.authority).to.be.a('string')
    expectToBeAnContainerOf(profile.features, 'boolean')
    for (let k in profile.groups) {
      expectToBeAGroup(profile.groups[k])
    }
    expectToBeAnContainerOf(profile.preferences, 'boolean')
    if (profile.userid !== null) {
      expect(profile.userid).to.be.a('string')
    }
  })

  it('should read an annotation', async () => {
    const annotation: API.Annotation = await h.annotation('c5AeVv0pEeaWu_f_2ojWhw')

    expectToBeAnAnnotation(annotation)
  })

  it('should search annotations', async () => {
    const searchResult: API.SearchResult<API.Annotation> = await h.search({ any: 'hypothesis' })

    expect(searchResult.total).to.be.a('number')
    for (let ann of searchResult.rows) {
      expectToBeAnAnnotation(ann)
    }
  })

  it('should fetch links', async () => {
    const links: API.OtherLinks = await h.links()

    expectToBeAnContainerOf(links, 'string')
  }).timeout(TIME_OUT)
})
