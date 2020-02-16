let getCookieObject = async function(){
    const { default: Cookie } = await import(/* webpackChunkName: "js-cookie" */ 'js-cookie');
    return Cookie
}

export default {
    get: async function(name) {
        const Cookie = await getCookieObject()
        return Cookie.get(name)
    },
    set: async function(name, value) {
        const Cookie = await getCookieObject()
        return Cookie.set(name, value)
    },
    remove: async function(name) {
        const Cookie = await getCookieObject()
        return Cookie.remove(name)
    }
}
