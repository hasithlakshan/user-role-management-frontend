import axios from "axios";
class ManagementService {
    async getUsers(headers = {}) {
        try {
            const { data: response } = await axios({
                url:"http://localhost:3000/api/management/user",
                method: "GET",
                cache: "no-cache",
                headers: {
                    "Content-Type": "application/json",
                    ...headers
                },
                timeout: 60000
            })
            return response
        }
        catch (error) {
            console.log("error", error)
            return new Error('Something wrong in get users');
        }
    }

    async addTasks(object) {
        try {
            const { data: response } = await axios({
                url:"http://localhost:3000/api/management/user",
                method: "POST",
                cache: "no-cache",
                headers: {
                    "Content-Type": "application/json",
                    "token": object.token
                },
                data: object.task,
                timeout: 60000
            })
            return response
        }
        catch (error) {
            console.log("error", error)
            return new Error('Something wrong in add tasks');
        }
    }
    async updateUser(object) {
        try {
            const { data: response } = await axios({
                url:`http://localhost:3000/api/management/user/${object.userId}`,
                method: "PUT",
                cache: "no-cache",
                headers: {
                    "Content-Type": "application/json",
                    "token": object.token
                },
                data: object.user,
                timeout: 60000
            })
            return response
        }
        catch (error) {
            console.log("error", error)
            return new Error('Something wrong in add tasks');
        }
    }

    async deleteUser(object) {
        try {
            const { data: response } = await axios({
                url:`http://localhost:3000/api/management/user/${object.taskId}`,
                method: "DELETE",
                cache: "no-cache",
                headers: {
                    "Content-Type": "application/json",
                    "token": object.token
                },
                timeout: 60000
            })
            return response
        }
        catch (error) {
            console.log("error", error)
            return new Error('Something wrong in add tasks');
        }
    }
}
const managementService = new ManagementService()
export default managementService