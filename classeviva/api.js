const axios = require('axios').default
const _ = require('lodash')
const moment = require('moment')
const db = require('../dbHandler')

const endpoints = require('./endpoints.json')

const secrets = require('./secrets.json')

axios.defaults.baseURL = endpoints.base_url
axios.defaults.headers['User-Agent'] = 'zorro/1.0'
axios.defaults.headers['Z-Dev-Apikey'] = '+zorro+'
axios.interceptors.request.use(
    config => {
        db.get('token')
            .then((token) => {
                if (token) {
                    config.headers['Z-Auth-Token'] = token
                }
            })
        return config
    },
    error => {
        Promise.reject(error)
    })


axios.interceptors.response.use(
    (response) => {
        return response
    },
    (error) => {
        var originalRequest = error.config
        const errorCode = error.response.data.error.split(':')[0]
        console.log(errorCode)
        if (errorCode == '253' || errorCode == '252') { // Expired token
            console.log('Invald or expired token.')
            return axios.post(endpoints.auth.login, { pass: secrets.pass, uid: secrets.uid })
                .then(({ data }) => {
                    return db.set('token', data.token, 'string', 'set')
                        .then((result) => {
                            originalRequest.headers['Z-Auth-Token'] = data.token
                            delete originalRequest.data
                            return axios(originalRequest)
                        })
                })

        } else {
            return Promise.reject(error)
        }
    }
)

module.exports.getNoticeboard = async (number = 5) => {
    response = await axios.get(endpoints.noticeboard.replace('{{studentId}}', secrets.uid.slice(1, 8)))
    var items = response.data.items
    var lastDocuments = _.reverse(_.sortBy(items, (value) => { return new Date(value.pubDT) }))
        .filter((value) => { return value.cntCategory.includes('Circolare') || value.cntCategory.includes('Documenti - Segreteria Digitale') }).slice(0, number)
    return lastDocuments

}