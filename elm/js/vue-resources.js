/*!
 * vue-resource v1.2.1
 * https://github.com/pagekit/vue-resource
 * Released under the MIT License.
 */

!function (t, e) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define(e) : t.VueResource = e()
}(this, function () {
    "use strict";

    function t(t) {
        this.state = J, this.value = void 0, this.deferred = [];
        var e = this;
        try {
            t(function (t) {
                e.resolve(t)
            }, function (t) {
                e.reject(t)
            })
        } catch (t) {
            e.reject(t)
        }
    }

    function e(t, e) {
        t instanceof Promise ? this.promise = t : this.promise = new Promise(t.bind(e)), this.context = e
    }

    function n(t) {
        "undefined" != typeof console && Q && console.warn("[VueResource warn]: " + t)
    }

    function o(t) {
        "undefined" != typeof console && console.error(t)
    }

    function r(t, e) {
        return G(t, e)
    }

    function i(t) {
        return t ? t.replace(/^\s*|\s*$/g, "") : ""
    }

    function u(t) {
        return t ? t.toLowerCase() : ""
    }

    function s(t) {
        return t ? t.toUpperCase() : ""
    }

    function a(t) {
        return "string" == typeof t
    }

    function c(t) {
        return "function" == typeof t
    }

    function f(t) {
        return null !== t && "object" == typeof t
    }

    function h(t) {
        return f(t) && Object.getPrototypeOf(t) == Object.prototype
    }

    function p(t) {
        return "undefined" != typeof Blob && t instanceof Blob
    }

    function d(t) {
        return "undefined" != typeof FormData && t instanceof FormData
    }

    function l(t, n, o) {
        var r = e.resolve(t);
        return arguments.length < 2 ? r : r.then(n, o)
    }

    function m(t, e, n) {
        return n = n || {}, c(n) && (n = n.call(e)), v(t.bind({$vm: e, $options: n}), t, {$options: n})
    }

    function y(t, e) {
        var n, o;
        if (tt(t)) for (n = 0; n < t.length; n++) e.call(t[n], t[n], n); else if (f(t)) for (o in t) _.call(t, o) && e.call(t[o], t[o], o);
        return t
    }

    function v(t) {
        var e = K.call(arguments, 1);
        return e.forEach(function (e) {
            w(t, e, !0)
        }), t
    }

    function b(t) {
        var e = K.call(arguments, 1);
        return e.forEach(function (e) {
            for (var n in e) void 0 === t[n] && (t[n] = e[n])
        }), t
    }

    function g(t) {
        var e = K.call(arguments, 1);
        return e.forEach(function (e) {
            w(t, e)
        }), t
    }

    function w(t, e, n) {
        for (var o in e) n && (h(e[o]) || tt(e[o])) ? (h(e[o]) && !h(t[o]) && (t[o] = {}), tt(e[o]) && !tt(t[o]) && (t[o] = []), w(t[o], e[o], n)) : void 0 !== e[o] && (t[o] = e[o])
    }

    function T(t, e, n) {
        var o = x(t), r = o.expand(e);
        return n && n.push.apply(n, o.vars), r
    }

    function x(t) {
        var e = ["+", "#", ".", "/", ";", "?", "&"], n = [];
        return {
            vars: n, expand: function (o) {
                return t.replace(/\{([^\{\}]+)\}|([^\{\}]+)/g, function (t, r, i) {
                    if (r) {
                        var u = null, s = [];
                        if (e.indexOf(r.charAt(0)) !== -1 && (u = r.charAt(0), r = r.substr(1)), r.split(/,/g).forEach(function (t) {
                            var e = /([^:\*]*)(?::(\d+)|(\*))?/.exec(t);
                            s.push.apply(s, j(o, u, e[1], e[2] || e[3])), n.push(e[1])
                        }), u && "+" !== u) {
                            var a = ",";
                            return "?" === u ? a = "&" : "#" !== u && (a = u), (0 !== s.length ? u : "") + s.join(a)
                        }
                        return s.join(",")
                    }
                    return C(i)
                })
            }
        }
    }

    function j(t, e, n, o) {
        var r = t[n], i = [];
        if (E(r) && "" !== r) if ("string" == typeof r || "number" == typeof r || "boolean" == typeof r) r = r.toString(), o && "*" !== o && (r = r.substring(0, parseInt(o, 10))), i.push(P(e, r, O(e) ? n : null)); else if ("*" === o) Array.isArray(r) ? r.filter(E).forEach(function (t) {
            i.push(P(e, t, O(e) ? n : null))
        }) : Object.keys(r).forEach(function (t) {
            E(r[t]) && i.push(P(e, r[t], t))
        }); else {
            var u = [];
            Array.isArray(r) ? r.filter(E).forEach(function (t) {
                u.push(P(e, t))
            }) : Object.keys(r).forEach(function (t) {
                E(r[t]) && (u.push(encodeURIComponent(t)), u.push(P(e, r[t].toString())))
            }), O(e) ? i.push(encodeURIComponent(n) + "=" + u.join(",")) : 0 !== u.length && i.push(u.join(","))
        } else ";" === e ? i.push(encodeURIComponent(n)) : "" !== r || "&" !== e && "?" !== e ? "" === r && i.push("") : i.push(encodeURIComponent(n) + "=");
        return i
    }

    function E(t) {
        return void 0 !== t && null !== t
    }

    function O(t) {
        return ";" === t || "&" === t || "?" === t
    }

    function P(t, e, n) {
        return e = "+" === t || "#" === t ? C(e) : encodeURIComponent(e), n ? encodeURIComponent(n) + "=" + e : e
    }

    function C(t) {
        return t.split(/(%[0-9A-Fa-f]{2})/g).map(function (t) {
            return /%[0-9A-Fa-f]/.test(t) || (t = encodeURI(t)), t
        }).join("")
    }

    function $(t, e) {
        var n, o = this || {}, r = t;
        return a(t) && (r = {
            url: t,
            params: e
        }), r = v({}, $.options, o.$options, r), $.transforms.forEach(function (t) {
            n = U(t, n, o.$vm)
        }), n(r)
    }

    function U(t, e, n) {
        return function (o) {
            return t.call(n, o, e)
        }
    }

    function R(t, e, n) {
        var o, r = tt(e), i = h(e);
        y(e, function (e, u) {
            o = f(e) || tt(e), n && (u = n + "[" + (i || o ? u : "") + "]"), !n && r ? t.add(e.name, e.value) : o ? R(t, e, u) : t.add(u, e)
        })
    }

    function A(t) {
        var e = t.match(/^\[|^\{(?!\{)/), n = {"[": /]$/, "{": /}$/};
        return e && n[e[0]].test(t)
    }

    function S(t, e) {
        var n = t.client || (Y ? mt : yt);
        e(n(t))
    }

    function k(t, e) {
        return Object.keys(t).reduce(function (t, n) {
            return u(e) === u(n) ? n : t
        }, null)
    }

    function I(t) {
        if (/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(t)) throw new TypeError("Invalid character in header field name");
        return i(t)
    }

    function H(t) {
        return new e(function (e) {
            var n = new FileReader;
            n.readAsText(t), n.onload = function () {
                e(n.result)
            }
        })
    }

    function B(t) {
        return 0 === t.type.indexOf("text") || t.type.indexOf("json") !== -1
    }

    function L(t) {
        var n = this || {}, r = vt(n.$vm);
        return b(t || {}, n.$options, L.options), L.interceptors.forEach(function (t) {
            r.use(t)
        }), r(new wt(t)).then(function (t) {
            return t.ok ? t : e.reject(t)
        }, function (t) {
            return t instanceof Error && o(t), e.reject(t)
        })
    }

    function q(t, e, n, o) {
        var r = this || {}, i = {};
        return n = et({}, q.actions, n), y(n, function (n, u) {
            n = v({url: t, params: et({}, e)}, o, n), i[u] = function () {
                return (r.$http || L)(M(n, arguments))
            }
        }), i
    }

    function M(t, e) {
        var n, o = et({}, t), r = {};
        switch (e.length) {
            case 2:
                r = e[0], n = e[1];
                break;
            case 1:
                /^(POST|PUT|PATCH)$/i.test(o.method) ? n = e[0] : r = e[0];
                break;
            case 0:
                break;
            default:
                throw"Expected up to 2 arguments [params, body], got " + e.length + " arguments"
        }
        return o.body = n, o.params = et({}, o.params, r), o
    }

    function N(t) {
        N.installed || (Z(t), t.url = $, t.http = L, t.resource = q, t.Promise = e, Object.defineProperties(t.prototype, {
            $url: {
                get: function () {
                    return m(t.url, this, this.$options.url)
                }
            }, $http: {
                get: function () {
                    return m(t.http, this, this.$options.http)
                }
            }, $resource: {
                get: function () {
                    return t.resource.bind(this)
                }
            }, $promise: {
                get: function () {
                    var e = this;
                    return function (n) {
                        return new t.Promise(n, e)
                    }
                }
            }
        }))
    }

    var D = 0, F = 1, J = 2;
    t.reject = function (e) {
        return new t(function (t, n) {
            n(e)
        })
    }, t.resolve = function (e) {
        return new t(function (t, n) {
            t(e)
        })
    }, t.all = function (e) {
        return new t(function (n, o) {
            function r(t) {
                return function (o) {
                    u[t] = o, i += 1, i === e.length && n(u)
                }
            }

            var i = 0, u = [];
            0 === e.length && n(u);
            for (var s = 0; s < e.length; s += 1) t.resolve(e[s]).then(r(s), o)
        })
    }, t.race = function (e) {
        return new t(function (n, o) {
            for (var r = 0; r < e.length; r += 1) t.resolve(e[r]).then(n, o)
        })
    };
    var W = t.prototype;
    W.resolve = function (t) {
        var e = this;
        if (e.state === J) {
            if (t === e) throw new TypeError("Promise settled with itself.");
            var n = !1;
            try {
                var o = t && t.then;
                if (null !== t && "object" == typeof t && "function" == typeof o) return void o.call(t, function (t) {
                    n || e.resolve(t), n = !0
                }, function (t) {
                    n || e.reject(t), n = !0
                })
            } catch (t) {
                return void (n || e.reject(t))
            }
            e.state = D, e.value = t, e.notify()
        }
    }, W.reject = function (t) {
        var e = this;
        if (e.state === J) {
            if (t === e) throw new TypeError("Promise settled with itself.");
            e.state = F, e.value = t, e.notify()
        }
    }, W.notify = function () {
        var t = this;
        r(function () {
            if (t.state !== J) for (; t.deferred.length;) {
                var e = t.deferred.shift(), n = e[0], o = e[1], r = e[2], i = e[3];
                try {
                    t.state === D ? r("function" == typeof n ? n.call(void 0, t.value) : t.value) : t.state === F && ("function" == typeof o ? r(o.call(void 0, t.value)) : i(t.value))
                } catch (t) {
                    i(t)
                }
            }
        })
    }, W.then = function (e, n) {
        var o = this;
        return new t(function (t, r) {
            o.deferred.push([e, n, t, r]), o.notify()
        })
    }, W.catch = function (t) {
        return this.then(void 0, t)
    }, "undefined" == typeof Promise && (window.Promise = t), e.all = function (t, n) {
        return new e(Promise.all(t), n)
    }, e.resolve = function (t, n) {
        return new e(Promise.resolve(t), n)
    }, e.reject = function (t, n) {
        return new e(Promise.reject(t), n)
    }, e.race = function (t, n) {
        return new e(Promise.race(t), n)
    };
    var X = e.prototype;
    X.bind = function (t) {
        return this.context = t, this
    }, X.then = function (t, n) {
        return t && t.bind && this.context && (t = t.bind(this.context)), n && n.bind && this.context && (n = n.bind(this.context)), new e(this.promise.then(t, n), this.context)
    }, X.catch = function (t) {
        return t && t.bind && this.context && (t = t.bind(this.context)), new e(this.promise.catch(t), this.context)
    }, X.finally = function (t) {
        return this.then(function (e) {
            return t.call(this), e
        }, function (e) {
            return t.call(this), Promise.reject(e)
        })
    };
    var G, V = {}, _ = V.hasOwnProperty, z = [], K = z.slice, Q = !1, Y = "undefined" != typeof window,
        Z = function (t) {
            var e = t.config, n = t.nextTick;
            G = n, Q = e.debug || !e.silent
        }, tt = Array.isArray, et = Object.assign || g, nt = function (t, e) {
            var n = e(t);
            return a(t.root) && !n.match(/^(https?:)?\//) && (n = t.root + "/" + n), n
        }, ot = function (t, e) {
            var n = Object.keys($.options.params), o = {}, r = e(t);
            return y(t.params, function (t, e) {
                n.indexOf(e) === -1 && (o[e] = t)
            }), o = $.params(o), o && (r += (r.indexOf("?") == -1 ? "?" : "&") + o), r
        }, rt = function (t) {
            var e = [], n = T(t.url, t.params, e);
            return e.forEach(function (e) {
                delete t.params[e]
            }), n
        };
    $.options = {url: "", root: null, params: {}}, $.transforms = [rt, ot, nt], $.params = function (t) {
        var e = [], n = encodeURIComponent;
        return e.add = function (t, e) {
            c(e) && (e = e()), null === e && (e = ""), this.push(n(t) + "=" + n(e))
        }, R(e, t), e.join("&").replace(/%20/g, "+")
    }, $.parse = function (t) {
        var e = document.createElement("a");
        return document.documentMode && (e.href = t, t = e.href), e.href = t, {
            href: e.href,
            protocol: e.protocol ? e.protocol.replace(/:$/, "") : "",
            port: e.port,
            host: e.host,
            hostname: e.hostname,
            pathname: "/" === e.pathname.charAt(0) ? e.pathname : "/" + e.pathname,
            search: e.search ? e.search.replace(/^\?/, "") : "",
            hash: e.hash ? e.hash.replace(/^#/, "") : ""
        }
    };
    var it = function (t) {
        return new e(function (e) {
            var n = new XDomainRequest, o = function (o) {
                var r = o.type, i = 0;
                "load" === r ? i = 200 : "error" === r && (i = 500), e(t.respondWith(n.responseText, {status: i}))
            };
            t.abort = function () {
                return n.abort()
            }, n.open(t.method, t.getUrl()), t.timeout && (n.timeout = t.timeout), n.onload = o, n.onabort = o, n.onerror = o, n.ontimeout = o, n.onprogress = function () {
            }, n.send(t.getBody())
        })
    }, ut = Y && "withCredentials" in new XMLHttpRequest, st = function (t, e) {
        if (Y) {
            var n = $.parse(location.href), o = $.parse(t.getUrl());
            o.protocol === n.protocol && o.host === n.host || (t.crossOrigin = !0, t.emulateHTTP = !1, ut || (t.client = it))
        }
        e()
    }, at = function (t, e) {
        d(t.body) ? t.headers.delete("Content-Type") : (f(t.body) || tt(t.body)) && (t.emulateJSON ? (t.body = $.params(t.body), t.headers.set("Content-Type", "application/x-www-form-urlencoded")) : t.body = JSON.stringify(t.body)), e(function (t) {
            return Object.defineProperty(t, "data", {
                get: function () {
                    return this.body
                }, set: function (t) {
                    this.body = t
                }
            }), t.bodyText ? l(t.text(), function (e) {
                var n = t.headers.get("Content-Type") || "";
                if (0 === n.indexOf("application/json") || A(e)) try {
                    t.body = JSON.parse(e)
                } catch (e) {
                    t.body = null
                } else t.body = e;
                return t
            }) : t
        })
    }, ct = function (t) {
        return new e(function (e) {
            var n, o, r = t.jsonp || "callback", i = t.jsonpCallback || "_jsonp" + Math.random().toString(36).substr(2),
                u = null;
            n = function (n) {
                var r = n.type, s = 0;
                "load" === r && null !== u ? s = 200 : "error" === r && (s = 500), s && window[i] && (delete window[i], document.body.removeChild(o)), e(t.respondWith(u, {status: s}))
            }, window[i] = function (t) {
                u = JSON.stringify(t)
            }, t.abort = function () {
                n({type: "abort"})
            }, t.params[r] = i, t.timeout && setTimeout(t.abort, t.timeout), o = document.createElement("script"), o.src = t.getUrl(), o.type = "text/javascript", o.async = !0, o.onload = n, o.onerror = n, document.body.appendChild(o)
        })
    }, ft = function (t, e) {
        "JSONP" == t.method && (t.client = ct), e()
    }, ht = function (t, e) {
        c(t.before) && t.before.call(this, t), e()
    }, pt = function (t, e) {
        t.emulateHTTP && /^(PUT|PATCH|DELETE)$/i.test(t.method) && (t.headers.set("X-HTTP-Method-Override", t.method), t.method = "POST"), e()
    }, dt = function (t, e) {
        var n = et({}, L.headers.common, t.crossOrigin ? {} : L.headers.custom, L.headers[u(t.method)]);
        y(n, function (e, n) {
            t.headers.has(n) || t.headers.set(n, e)
        }), e()
    }, lt = "undefined" != typeof Blob && "undefined" != typeof FileReader, mt = function (t) {
        return new e(function (e) {
            var n = new XMLHttpRequest, o = function (o) {
                var r = t.respondWith("response" in n ? n.response : n.responseText, {
                    status: 1223 === n.status ? 204 : n.status,
                    statusText: 1223 === n.status ? "No Content" : i(n.statusText)
                });
                y(i(n.getAllResponseHeaders()).split("\n"), function (t) {
                    r.headers.append(t.slice(0, t.indexOf(":")), t.slice(t.indexOf(":") + 1))
                }), e(r)
            };
            t.abort = function () {
                return n.abort()
            }, t.progress && ("GET" === t.method ? n.addEventListener("progress", t.progress) : /^(POST|PUT)$/i.test(t.method) && n.upload.addEventListener("progress", t.progress)), n.open(t.method, t.getUrl(), !0), t.timeout && (n.timeout = t.timeout), t.credentials === !0 && (n.withCredentials = !0), t.crossOrigin || t.headers.set("X-Requested-With", "XMLHttpRequest"), "responseType" in n && lt && (n.responseType = "blob"), t.headers.forEach(function (t, e) {
                n.setRequestHeader(e, t)
            }), n.onload = o, n.onabort = o, n.onerror = o, n.ontimeout = o, n.send(t.getBody())
        })
    }, yt = function (t) {
        var n = require("got");
        return new e(function (e) {
            var o, r = t.getUrl(), u = t.getBody(), s = t.method, a = {};
            t.headers.forEach(function (t, e) {
                a[e] = t
            }), n(r, {body: u, method: s, headers: a}).then(o = function (n) {
                var o = t.respondWith(n.body, {status: n.statusCode, statusText: i(n.statusMessage)});
                y(n.headers, function (t, e) {
                    o.headers.set(e, t)
                }), e(o)
            }, function (t) {
                return o(t.response)
            })
        })
    }, vt = function (t) {
        function o(o) {
            return new e(function (e) {
                function s() {
                    r = i.pop(), c(r) ? r.call(t, o, a) : (n("Invalid interceptor of type " + typeof r + ", must be a function"), a())
                }

                function a(n) {
                    if (c(n)) u.unshift(n); else if (f(n)) return u.forEach(function (e) {
                        n = l(n, function (n) {
                            return e.call(t, n) || n
                        })
                    }), void l(n, e);
                    s()
                }

                s()
            }, t)
        }

        var r, i = [S], u = [];
        return f(t) || (t = null), o.use = function (t) {
            i.push(t)
        }, o
    }, bt = function (t) {
        var e = this;
        this.map = {}, y(t, function (t, n) {
            return e.append(n, t)
        })
    };
    bt.prototype.has = function (t) {
        return null !== k(this.map, t)
    }, bt.prototype.get = function (t) {
        var e = this.map[k(this.map, t)];
        return e ? e.join() : null
    }, bt.prototype.getAll = function (t) {
        return this.map[k(this.map, t)] || []
    }, bt.prototype.set = function (t, e) {
        this.map[I(k(this.map, t) || t)] = [i(e)]
    }, bt.prototype.append = function (t, e) {
        var n = this.map[k(this.map, t)];
        n ? n.push(i(e)) : this.set(t, e)
    }, bt.prototype.delete = function (t) {
        delete this.map[k(this.map, t)]
    }, bt.prototype.deleteAll = function () {
        this.map = {}
    }, bt.prototype.forEach = function (t, e) {
        var n = this;
        y(this.map, function (o, r) {
            y(o, function (o) {
                return t.call(e, o, r, n)
            })
        })
    };
    var gt = function (t, e) {
        var n = e.url, o = e.headers, r = e.status, i = e.statusText;
        this.url = n, this.ok = r >= 200 && r < 300, this.status = r || 0, this.statusText = i || "", this.headers = new bt(o), this.body = t, a(t) ? this.bodyText = t : p(t) && (this.bodyBlob = t, B(t) && (this.bodyText = H(t)))
    };
    gt.prototype.blob = function () {
        return l(this.bodyBlob)
    }, gt.prototype.text = function () {
        return l(this.bodyText)
    }, gt.prototype.json = function () {
        return l(this.text(), function (t) {
            return JSON.parse(t)
        })
    };
    var wt = function (t) {
        this.body = null, this.params = {}, et(this, t, {method: s(t.method || "GET")}), this.headers instanceof bt || (this.headers = new bt(this.headers))
    };
    wt.prototype.getUrl = function () {
        return $(this)
    }, wt.prototype.getBody = function () {
        return this.body
    }, wt.prototype.respondWith = function (t, e) {
        return new gt(t, et(e || {}, {url: this.getUrl()}))
    };
    var Tt = {Accept: "application/json, text/plain, */*"}, xt = {"Content-Type": "application/json;charset=utf-8"};
    return L.options = {}, L.headers = {
        put: xt,
        post: xt,
        patch: xt,
        delete: xt,
        common: Tt,
        custom: {}
    }, L.interceptors = [ht, pt, at, ft, dt, st], ["get", "delete", "head", "jsonp"].forEach(function (t) {
        L[t] = function (e, n) {
            return this(et(n || {}, {url: e, method: t}))
        }
    }), ["post", "put", "patch"].forEach(function (t) {
        L[t] = function (e, n, o) {
            return this(et(o || {}, {url: e, method: t, body: n}))
        }
    }), q.actions = {
        get: {method: "GET"},
        save: {method: "POST"},
        query: {method: "GET"},
        update: {method: "PUT"},
        remove: {method: "DELETE"},
        delete: {method: "DELETE"}
    }, "undefined" != typeof window && window.Vue && window.Vue.use(N), N
});