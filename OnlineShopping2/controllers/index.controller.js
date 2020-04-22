const http = require("http")

exports.homepage = function (req, res) {

    console.log('Cookies: ', req.cookies)

    var promises = []
    var data = {}
    if (req.cookies.authorization) {
        var userPromise = new Promise((resolve, reject) => {
            // Create options
            const options = {
                hostname: req.hostname,
                port: 3000,
                path: "/users",
                method: "GET",
                headers: { authorization: req.cookies.authorization }
            }

            // Make http request
            const httpReq = http.request(options, httpRes => {
                var buff = ""
                httpRes.on("data", chunks => {
                    buff += chunks
                })

                httpRes.on("end", () => {
                    if (httpRes.statusCode === 200) {
                        data.user = JSON.parse(buff)
                        resolve()
                    }
                    else {
                        reject(JSON.parse(buff))
                    }

                })
            })

            httpReq.on("error", error => {
                reject(error)
            })

            httpReq.end()
        })
        promises.push(userPromise)
    }


    var productsPromise = new Promise((resolve, reject) => {
        // Create options
        const options = {
            hostname: req.hostname,
            port: 3000,
            path: "/products",
            method: "GET"
        }

        // Make http request
        const httpReq = http.request(options, httpRes => {
            var buff = ""
            httpRes.on("data", chunks => {
                buff += chunks
            })

            httpRes.on("end", () => {
                if (httpRes.statusCode === 200) {
                    data.products = JSON.parse(buff)
                    resolve()
                }
                else {
                    reject(JSON.parse(buff))
                }
            })
        })

        httpReq.on("error", error => {
            reject(error)
        })

        httpReq.end()
    })

    promises.push(productsPromise)
    Promise.all(promises).then(() => {
        console.log(data)
        res.render("index", data)
    }).catch(error => {
        console.log(error)
        res.render("error", error)
    })
}

exports.signinpage = function (req, res) {
    res.render("signin", { isUser: true })
}

exports.signuppage = function (req, res) {
    res.render("signup")
}



