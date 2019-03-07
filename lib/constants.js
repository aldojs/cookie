
'use strict'

/**
 * Cookies splitter RegExp
 * 
 * @constant
 */
exports.COOKIE_SPLIT_RE = /\s*;\s*/

/**
 * Cookie name/value splitter RegExp
 * 
 * @constant
 */
exports.COOKIE_PAIR_SPLIT_RE = /\s*=\s*/

/**
 * RegExp to match field-content in RFC 7230 sec 3.2
 *
 * field-content = field-vchar [ 1*( SP / HTAB ) field-vchar ]
 * field-vchar   = VCHAR / obs-text
 * obs-text      = %x80-FF
 * 
 * @constant
 */
exports.FIELD_CONTENT_RE = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/
