export default {
    getAPI: async function() {
        let imported
        if (process.env.NODE_ENV == 'production') {
            imported = await import(/* webpackMode: "eager" */ './api-production.js')
        } else if (process.env.NODE_ENV == 'development') {
            imported = await import(/* webpackMode: "eager" */ './api-dev.js')
        } else {
            imported =  await import(/* webpackMode: "eager" */ './api-local.js')
        }
        return imported.default

    }
}
