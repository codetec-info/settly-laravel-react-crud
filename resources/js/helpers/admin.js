class Admin {

    constructor() {
        this.init()
    }

    init() {
        this.id = Number(localStorage.getItem('adminId'))
        this.name = localStorage.getItem('adminName')
        this.email = localStorage.getItem('adminEmail')
        this.loggedIn = localStorage.getItem('adminLoggedIn')
    }

    /**
     *
     * @param data object
     * @param data.name string
     * @param data.email string
     * @param callback function
     */
    authenticated(data, callback) {
        localStorage.setItem('adminId', data.id)
        localStorage.setItem('adminName', data.name)
        localStorage.setItem('adminEmail', data.email)
        localStorage.setItem('adminLoggedIn', true)

        this.init()

        callback()
    }

    /**
     *
     * @return {boolean}
     */
    isLoggedIn() {
        return Boolean(this.loggedIn) === true
    }

    /**
     * Remove all admins data from local storage
     */
    destroy() {
        localStorage.removeItem('adminId')
        localStorage.removeItem('adminName')
        localStorage.removeItem('adminEmail')
        localStorage.removeItem('adminLoggedIn')
    }

    /**
     *
     * @param callback function
     */
    logout(callback) {
        this.destroy()

        callback()
    }
}

export default new Admin()
