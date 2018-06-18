
/**
 * RegExp to match field-content in RFC 7230 sec 3.2
 *
 * field-content = field-vchar [ 1*( SP / HTAB ) field-vchar ]
 * field-vchar   = VCHAR / obs-text
 * obs-text      = %x80-FF
 * 
 * @constant
 */
export const FIELD_CONTENT_RE = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/

/**
 * RegExp to match Same-Site cookie attribute value.
 * 
 * @constant
 */
export const SAME_SITE_RE = /^(?:lax|strict)$/i
