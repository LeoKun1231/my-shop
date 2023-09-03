'use strict'
var e,
	t = (e = require('crypto')) && 'object' == typeof e && 'default' in e ? e.default : e
const n = {
	TOKEN_EXPIRED: 'uni-id-token-expired',
	CHECK_TOKEN_FAILED: 'uni-id-check-token-failed',
	PARAM_REQUIRED: 'uni-id-param-required',
	ACCOUNT_EXISTS: 'uni-id-account-exists',
	ACCOUNT_NOT_EXISTS: 'uni-id-account-not-exists',
	ACCOUNT_CONFLICT: 'uni-id-account-conflict',
	ACCOUNT_BANNED: 'uni-id-account-banned',
	ACCOUNT_AUDITING: 'uni-id-account-auditing',
	ACCOUNT_AUDIT_FAILED: 'uni-id-account-audit-failed',
	ACCOUNT_CLOSED: 'uni-id-account-closed'
}
function i(e) {
	return !!e && ('object' == typeof e || 'function' == typeof e) && 'function' == typeof e.then
}
function r(e) {
	if (!e) return
	const t = e.match(/^(\d+).(\d+).(\d+)/)
	return t ? t.slice(1, 4).map((e) => parseInt(e)) : void 0
}
function o(e, t) {
	const n = r(e),
		i = r(t)
	return n
		? i
			? (function (e, t) {
					const n = Math.max(e.length, t.length)
					for (let i = 0; i < n; i++) {
						const n = e[i],
							r = t[i]
						if (n > r) return 1
						if (n < r) return -1
					}
					return 0
			  })(n, i)
			: 1
		: i
		? -1
		: 0
}
const s = { 'uni-id-token-expired': 30203, 'uni-id-check-token-failed': 30202 }
function c(e) {
	const { errCode: t, errMsgValue: n } = e
	;(e.errMsg = this._t(t, n)), t in s && (e.code = s[t]), delete e.errMsgValue
}
function a(e) {
	return (
		'object' === ((i = e), Object.prototype.toString.call(i).slice(8, -1).toLowerCase()) &&
		e.errCode &&
		((t = e.errCode), Object.values(n).includes(t)) &&
		!!e.errCode
	)
	var t, i
}
let u = {
	'zh-Hans': {
		'uni-id-token-expired': '登录状态失效，token已过期',
		'uni-id-check-token-failed': 'token校验未通过',
		'uni-id-param-required': '缺少参数: {param}',
		'uni-id-account-exists': '此账号已注册',
		'uni-id-account-not-exists': '此账号未注册',
		'uni-id-account-conflict': '用户账号冲突',
		'uni-id-account-banned': '从账号已封禁',
		'uni-id-account-auditing': '此账号正在审核中',
		'uni-id-account-audit-failed': '此账号审核失败',
		'uni-id-account-closed': '此账号已注销'
	},
	en: {
		'uni-id-token-expired': 'The login status is invalid, token has expired',
		'uni-id-check-token-failed': 'Check token failed',
		'uni-id-param-required': 'Parameter required: {param}',
		'uni-id-account-exists': 'Account exists',
		'uni-id-account-not-exists': 'Account does not exists',
		'uni-id-account-conflict': 'User account conflict',
		'uni-id-account-banned': 'Account has been banned',
		'uni-id-account-auditing': 'Account audit in progress',
		'uni-id-account-audit-failed': 'Account audit failed',
		'uni-id-account-closed': 'Account has been closed'
	}
}
try {
	const e = require.resolve('uni-config-center/uni-id/lang/index.js')
	u = (function (e, t) {
		const n = Object.keys(e)
		n.push(...Object.keys(t))
		const i = {}
		for (let r = 0; r < n.length; r++) {
			const o = n[r]
			i[o] = Object.assign({}, e[o], t[o])
		}
		return i
	})(u, require(e))
} catch (e) {}
var d = u
function l(e) {
	return e.replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_')
}
function h(e) {
	return JSON.parse(
		((t = (function (e) {
			var t = 4 - ((e = e.toString()).length % 4)
			if (4 !== t) for (var n = 0; n < t; ++n) e += '='
			return e.replace(/-/g, '+').replace(/_/g, '/')
		})(e)),
		Buffer.from(t, 'base64').toString('utf-8'))
	)
	var t
}
function f(e) {
	return l(((t = JSON.stringify(e)), Buffer.from(t, 'utf-8').toString('base64')))
	var t
}
function p(e, n) {
	return l(t.createHmac('sha256', n).update(e).digest('base64'))
}
const k = function (e, t) {
		if ('string' != typeof e) throw new Error('Invalid token')
		const n = e.split('.')
		if (3 !== n.length) throw new Error('Invalid token')
		const [i, r, o] = n
		if (p(i + '.' + r, t) !== o) throw new Error('Invalid token')
		const s = h(i)
		if ('HS256' !== s.alg || 'JWT' !== s.typ) throw new Error('Invalid token')
		const c = h(r)
		if (1e3 * c.exp < Date.now()) {
			const e = new Error('Token expired')
			throw ((e.name = 'TokenExpiredError'), e)
		}
		return c
	},
	g = function (e, t, n = {}) {
		const { expiresIn: i } = n
		if (!i) throw new Error('expiresIn is required')
		const r = parseInt(Date.now() / 1e3),
			o = { ...e, iat: r, exp: r + n.expiresIn },
			s = f({ alg: 'HS256', typ: 'JWT' }) + '.' + f(o)
		return s + '.' + p(s, t)
	},
	I = uniCloud.database(),
	_ = I.command,
	C = I.collection('uni-id-users'),
	T = I.collection('uni-id-roles')
class m {
	constructor({ uniId: e } = {}) {
		;(this.uid = null),
			(this.userRecord = null),
			(this.userPermission = null),
			(this.oldToken = null),
			(this.oldTokenPayload = null),
			(this.uniId = e),
			(this.config = this.uniId._getConfig()),
			(this.clientInfo = this.uniId._clientInfo),
			this.checkConfig()
	}
	checkConfig() {
		const { tokenExpiresIn: e, tokenExpiresThreshold: t } = this.config
		if (t >= e) throw new Error('Config error, tokenExpiresThreshold should be less than tokenExpiresIn')
		t > e / 2 &&
			console.warn(
				`Please check whether the tokenExpiresThreshold configuration is set too large, tokenExpiresThreshold: ${t}, tokenExpiresIn: ${e}`
			)
	}
	get customToken() {
		return this.uniId.interceptorMap.get('customToken')
	}
	isTokenInDb(e) {
		return o(e, '1.0.10') >= 0
	}
	async getUserRecord() {
		if (this.userRecord) return this.userRecord
		const e = await C.doc(this.uid).get()
		if (((this.userRecord = e.data[0]), !this.userRecord)) throw { errCode: n.ACCOUNT_NOT_EXISTS }
		switch (this.userRecord.status) {
			case void 0:
			case 0:
				break
			case 1:
				throw { errCode: n.ACCOUNT_BANNED }
			case 2:
				throw { errCode: n.ACCOUNT_AUDITING }
			case 3:
				throw { errCode: n.ACCOUNT_AUDIT_FAILED }
			case 4:
				throw { errCode: n.ACCOUNT_CLOSED }
		}
		if (this.oldTokenPayload) {
			if (this.isTokenInDb(this.oldTokenPayload.uniIdVersion)) {
				if (-1 === (this.userRecord.token || []).indexOf(this.oldToken)) throw { errCode: n.CHECK_TOKEN_FAILED }
			}
			if (this.userRecord.valid_token_date && this.userRecord.valid_token_date > 1e3 * this.oldTokenPayload.iat)
				throw { errCode: n.TOKEN_EXPIRED }
		}
		return this.userRecord
	}
	async updateUserRecord(e) {
		await C.doc(this.uid).update(e)
	}
	async getUserPermission() {
		if (this.userPermission) return this.userPermission
		const e = (await this.getUserRecord()).role || []
		if (0 === e.length) return (this.userPermission = { role: [], permission: [] }), this.userPermission
		if (e.includes('admin')) return (this.userPermission = { role: e, permission: [] }), this.userPermission
		const t = await T.where({ role_id: _.in(e) }).get(),
			n = ((i = t.data.reduce((e, t) => (t.permission && e.push(...t.permission), e), [])), Array.from(new Set(i)))
		var i
		return (this.userPermission = { role: e, permission: n }), this.userPermission
	}
	async _createToken({ uid: e, role: t, permission: i } = {}) {
		if (!t || !i) {
			const e = await this.getUserPermission()
			;(t = e.role), (i = e.permission)
		}
		let r = { uid: e, role: t, permission: i }
		if (this.uniId.interceptorMap.has('customToken')) {
			const n = this.uniId.interceptorMap.get('customToken')
			if ('function' != typeof n) throw new Error('Invalid custom token file')
			r = await n({ uid: e, role: t, permission: i })
		}
		const o = Date.now(),
			{ tokenSecret: s, tokenExpiresIn: c, maxTokenLength: a = 10 } = this.config,
			u = g({ ...r, uniIdVersion: '1.0.16' }, s, { expiresIn: c }),
			d = await this.getUserRecord(),
			l = (d.token || []).filter((e) => {
				try {
					const t = this._checkToken(e)
					if (d.valid_token_date && d.valid_token_date > 1e3 * t.iat) return !1
				} catch (e) {
					if (e.errCode === n.TOKEN_EXPIRED) return !1
				}
				return !0
			})
		return (
			l.push(u),
			l.length > a && l.splice(0, l.length - a),
			await this.updateUserRecord({ last_login_ip: this.clientInfo.clientIP, last_login_date: o, token: l }),
			{ token: u, tokenExpired: o + 1e3 * c }
		)
	}
	async createToken({ uid: e, role: t, permission: i } = {}) {
		if (!e) throw { errCode: n.PARAM_REQUIRED, errMsgValue: { param: 'uid' } }
		this.uid = e
		const { token: r, tokenExpired: o } = await this._createToken({ uid: e, role: t, permission: i })
		return { errCode: 0, token: r, tokenExpired: o }
	}
	async refreshToken({ token: e } = {}) {
		if (!e) throw { errCode: n.PARAM_REQUIRED, errMsgValue: { param: 'token' } }
		this.oldToken = e
		const t = this._checkToken(e)
		;(this.uid = t.uid), (this.oldTokenPayload = t)
		const { uid: i } = t,
			{ role: r, permission: o } = await this.getUserPermission(),
			{ token: s, tokenExpired: c } = await this._createToken({ uid: i, role: r, permission: o })
		return { errCode: 0, token: s, tokenExpired: c }
	}
	_checkToken(e) {
		const { tokenSecret: t } = this.config
		let i
		try {
			i = k(e, t)
		} catch (e) {
			if ('TokenExpiredError' === e.name) throw { errCode: n.TOKEN_EXPIRED }
			throw { errCode: n.CHECK_TOKEN_FAILED }
		}
		return i
	}
	async checkToken(e, { autoRefresh: t = !0 } = {}) {
		if (!e) throw { errCode: n.PARAM_REQUIRED, errMsgValue: { param: 'token' } }
		this.oldToken = e
		const i = this._checkToken(e)
		;(this.uid = i.uid), (this.oldTokenPayload = i)
		const { tokenExpiresThreshold: r } = this.config,
			{ uid: o, role: s, permission: c } = i,
			a = { role: s, permission: c }
		if (!s && !c) {
			const { role: e, permission: t } = await this.getUserPermission()
			;(a.role = e), (a.permission = t)
		}
		if (!r || !t) {
			const e = { code: 0, errCode: 0, ...i, ...a }
			return delete e.uniIdVersion, e
		}
		const u = Date.now()
		let d = {}
		1e3 * i.exp - u < 1e3 * r && (d = await this._createToken({ uid: o }))
		const l = { code: 0, errCode: 0, ...i, ...a, ...d }
		return delete l.uniIdVersion, l
	}
}
var E = Object.freeze({
	__proto__: null,
	checkToken: async function (e, { autoRefresh: t = !0 } = {}) {
		return new m({ uniId: this }).checkToken(e, { autoRefresh: t })
	},
	createToken: async function ({ uid: e, role: t, permission: n } = {}) {
		return new m({ uniId: this }).createToken({ uid: e, role: t, permission: n })
	},
	refreshToken: async function ({ token: e } = {}) {
		return new m({ uniId: this }).refreshToken({ token: e })
	}
})
const w = require('uni-config-center')({ pluginId: 'uni-id' })
class x {
	constructor({ context: e, clientInfo: t, config: n } = {}) {
		;(this._clientInfo = e
			? (function (e) {
					return { appId: e.APPID, platform: e.PLATFORM, locale: e.LOCALE, clientIP: e.CLIENTIP, deviceId: e.DEVICEID }
			  })(e)
			: t),
			(this.config = n || this._getOriginConfig()),
			(this.interceptorMap = new Map()),
			w.hasFile('custom-token.js') && this.setInterceptor('customToken', require(w.resolve('custom-token.js')))
		;(this._i18n = uniCloud.initI18n({
			locale: this._clientInfo.locale,
			fallbackLocale: 'zh-Hans',
			messages: JSON.parse(JSON.stringify(d))
		})),
			d[this._i18n.locale] || this._i18n.setLocale('zh-Hans')
	}
	setInterceptor(e, t) {
		this.interceptorMap.set(e, t)
	}
	_t(...e) {
		return this._i18n.t(...e)
	}
	_parseOriginConfig(e) {
		return Array.isArray(e) ? e : e[0] ? Object.values(e) : e
	}
	_getOriginConfig() {
		if (w.hasFile('config.json')) {
			let e
			try {
				e = w.config()
			} catch (e) {
				throw new Error('Invalid uni-id config file\n' + e.message)
			}
			return this._parseOriginConfig(e)
		}
		try {
			return this._parseOriginConfig(require('uni-id/config.json'))
		} catch (e) {
			throw new Error('Invalid uni-id config file')
		}
	}
	_getAppConfig() {
		const e = this._getOriginConfig()
		return Array.isArray(e) ? e.find((e) => e.dcloudAppid === this._clientInfo.appId) || e.find((e) => e.isDefaultConfig) : e
	}
	_getPlatformConfig() {
		const e = this._getAppConfig()
		if (!e)
			throw new Error(`Config for current app (${this._clientInfo.appId}) was not found, please check your config file or client appId`)
		let t
		switch (
			('app-plus' === this._clientInfo.platform && (this._clientInfo.platform = 'app'),
			'h5' === this._clientInfo.platform && (this._clientInfo.platform = 'web'),
			this._clientInfo.platform)
		) {
			case 'web':
				t = 'h5'
				break
			case 'app':
				t = 'app-plus'
		}
		const n = [{ tokenExpiresIn: 7200, tokenExpiresThreshold: 1200, passwordErrorLimit: 6, passwordErrorRetryTime: 3600 }, e]
		t && e[t] && n.push(e[t]), n.push(e[this._clientInfo.platform])
		const i = Object.assign(...n)
		return (
			['tokenSecret', 'tokenExpiresIn'].forEach((e) => {
				if (!i || !i[e]) throw new Error(`Config parameter missing, ${e} is required`)
			}),
			i
		)
	}
	_getConfig() {
		return this._getPlatformConfig()
	}
}
for (const e in E) x.prototype[e] = E[e]
function y(e) {
	const t = new x(e)
	return new Proxy(t, {
		get(e, t) {
			if (t in e && 0 !== t.indexOf('_')) {
				if ('function' == typeof e[t])
					return ((n = e[t]),
					function () {
						let e
						try {
							e = n.apply(this, arguments)
						} catch (e) {
							if (a(e)) return c.call(this, e), e
							throw e
						}
						return i(e)
							? e.then(
									(e) => (a(e) && c.call(this, e), e),
									(e) => {
										if (a(e)) return c.call(this, e), e
										throw e
									}
							  )
							: (a(e) && c.call(this, e), e)
					}).bind(e)
				if ('context' !== t && 'config' !== t) return e[t]
			}
			var n
		}
	})
}
x.prototype.createInstance = y
const A = { createInstance: y }
module.exports = A
