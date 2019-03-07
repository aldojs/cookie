
'use strict'

const { FIELD_CONTENT_RE } = require('./constants')


exports.Cookie = class {
  /**
   * 
   * @param {string} name 
   * @param {string} value 
   */
  constructor (name, value) {
    this._httpOnly = true
    this._secure = false
    this._value = value
    this._name = name
    this._path = '/'
  }

  /**
   * Set the `SameSite` attribute
   * 
   * @param {"strict" | "lax" | boolean} [value] 
   * @throws if `value` is invalid
   * @public
   */
  sameSite (value = true) {
    switch (value) {
      case true:
        value = 'strict'

      case 'lax':
      case 'strict':
        this._sameSite = value
        break

      case false:
        this._sameSite = undefined
        break

      default:
        throw new TypeError('The `SameSite` value is invalid')
    }

    return this
  }

  /**
   * Set the cookie's expiry time
   * 
   * @param {number} time The number of milliseconds from `Date.now()` for expiry.
   * @public
   */
  maxAge (time) {
    return this.expires(new Date(Date.now() + time))
  }

  /**
   * Set the cookie's expiration date
   * 
   * @param {Date} value
   * @public
   */
  expires (value) {
    this._expires = value
    return this
  }

  /**
   * Set the cookie's path
   * 
   * @param {string} value
   * @throws if the path is invalid
   * @public
   */
  path (value) {
    if (!FIELD_CONTENT_RE.test(value)) {
      throw new TypeError('The path is invalid')
    }

    this._path = value
    return this
  }

  /**
   * Indicate whether the cookie is only to be sent over HTTP(S)
   * 
   * @param {boolean} [flag] 
   * @public
   */
  httpOnly (flag = true) {
    this._httpOnly = flag
    return this
  }

  /**
   * Set the cookie's `Domain` attribute
   * 
   * @param {string} name The domain name
   * @throws if the domain is invalid
   * @public
   */
  domain (name) {
    if (!FIELD_CONTENT_RE.test(name)) {
      throw new TypeError('The domain name is invalid')
    }

    this._domain = name
    return this
  }

  /**
   * Set the cookie's `Secure` attribute
   * 
   * @param {boolean} [flag] 
   * @public
   */
  secure (flag = true) {
    this._secure = flag
    return this
  }

  /**
   * Get the `Set-Cookie` header value
   * 
   * @public
   */
  toHeader () {
    let header = this.toString()

    if (this._expires) header += `; expires=${this._expires.toUTCString()}`
    if (this._sameSite) header += `; samesite=${this.sameSite}`
    if (this._domain) header += `; domain=${this._domain}`
    if (this._path) header += `; path=${this._path}`
    if (this._httpOnly) header += "; httponly"
    if (this._secure) header += "; secure"

    return header
  }

  /**
   * Basic string presntation of the cookie object
   * 
   * @public
   */
  toString () {
    return `${this._name}=${this._value}`
  }
}
