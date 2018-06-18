
import { Cookie } from './cookie'
import { FIELD_CONTENT_RE } from './_constants'

export interface IRequest {
  headers: {
    [key: string]: string | string[] | undefined
  }
}

export class Store {
  private _in: { [name: string]: any } = {}
  private _out: { [name: string]: Cookie } = {}
  /**
   * Initialize a cookie store
   * 
   * @constructor
   * @public
   */
  public constructor (request: IRequest, options = {}) {
    // 
  }

  /**
   * Serialise the outgoing cookies
   * 
   * @public
   */
  public serialize (): string {
    return ''
  }

  /**
   * Get the incoming cookie
   * 
   * @param name The cookie name
   * @public
   */
  public get (name: string): string {
    return ''
  }

  /**
   * Create a new cookie
   * 
   * @param name 
   * @param value
   * @throws `TypeError` is the name is invalid
   * @public
   */
  public set (name: string, value: string) {
    // if (!FIELD_CONTENT_RE.test(name)) {
    //   throw new TypeError('The cookie name is invalid')
    // }

    // if (!FIELD_CONTENT_RE.test(value)) {
    //   throw new TypeError('The cookie value is invalid')
    // }

    // TODO: set default fields

    return this._out[name] = new Cookie(name, value)
  }

  public unset (name: string) {
    // if (!FIELD_CONTENT_RE.test(name)) {
    //   throw new TypeError('The cookie name is invalid')
    // }

    // return this._out[name] = new Cookie(name, "").expires(new Date(0))
  }
}
