
'use strict'

const { Cookie } = require('./cookie')
const { FIELD_CONTENT_RE, COOKIE_SPLIT_RE, COOKIE_PAIR_SPLIT_RE } = require('./constants')


exports.Cookies = class {
  /**
   * 
   * @param {Object} incoming The request `Cookie` header, or simply a plain object of cookies
   * @param {Cookie[]} outgoing The outgoing cookies container
   */
  constructor (incoming = {}, outgoing = []) {
    this._incoming = _isString(incoming) ? this._parse(incoming) : incoming
    this._outgoing = outgoing
  }

  /**
   * Get the incoming cookie
   * 
   * @param {string} name The cookie name
   * @public
   */
  get (name) {
    return Reflect.get(this._incoming, name)
  }

  /**
   * Set a cookie
   * 
   * @param {string} name The cookie name
   * @param {string} [value] The cookie value
   * @throws if the name or the value are invalid
   * @public
   */
  set (name, value = '') {
    if (!FIELD_CONTENT_RE.test(name)) {
      throw new TypeError('The name is invalid')
    }

    if (value && FIELD_CONTENT_RE.test(value) === false) {
      throw new TypeError('The value is invalid')
    }

    let cookie = new Cookie(name, value)

    this._outgoing.push(cookie)

    return cookie
  }

  /**
   * Clear the given cookie name
   * 
   * @param {string} name 
   * @throws if the name is invalid
   * @public
   */
  unset (name) {
    return this.set(name).expires(new Date(0))
  }

  /**
   * Serialise the outgoing cookies
   * 
   * @public
   */
  toHeader () {
    if (!this._outgoing.length) return ''

    if (this._outgoing.length === 1) {
      return this._outgoing[0].toHeader()
    }

    return this._outgoing.map((c) => c.toHeader())
  }

  /**
   * Parse the request `Cookie` header value.
   * 
   * @param cookies 
   * @private
   */
  _parse (cookies) {
    if (! cookies) return {}

    return cookies.split(COOKIE_SPLIT_RE).reduce((map, cookie) => {
      let [name, value] = cookie.split(COOKIE_PAIR_SPLIT_RE)

      // quoted values
      if (value[0] === '"') value = value.slice(1, -1)

      // only assign once
      if (map[name] == null) map[name] = value

      return map
    }, {})
  }
}

/**
 * Determines whether the given value is a string
 * 
 * @param {any} value 
 * @private
 */
function _isString (value) {
  return typeof value === 'string'
}
