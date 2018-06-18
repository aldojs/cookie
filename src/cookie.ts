
import { FIELD_CONTENT_RE } from './_constants'

export class Cookie {
  /**
   * The cookie name
   * 
   * @private
   */
  private _name: string

  /**
   * The cookie value
   * 
   * @private
   */
  private _value: string

  /**
   * The `SameSite` attribute
   * 
   * @private
   */
  private _sameSite?: string | boolean

  private _expires?: Date

  /**
   * Initialize a new `Cookie` instance
   * 
   * @param name 
   * @param value
   * @constructor
   * @public 
   */
  public constructor (name: string, value: string) {
    this._name = name
    this._value = value
  }

  /**
   * Set the same site property
   * 
   * @param value 
   */
  public sameSite (value: string | boolean = true): this {
    // TODO: check the value validity
    this._sameSite = value
    return this
  }

  /**
   * 
   */
  public toString (): string {
    return `${this._name}=${this._value}`
  }

  public toHeader () {
    let header = this.toString()

    
  }
}
