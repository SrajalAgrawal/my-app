import axios from "axios";
import moment from "moment";

const api_url = "http://localhost:8000/";
export default new (class AuthService {
    async register(event) {
        let n = event.target[0].value;
        let e = event.target[1].value;
        let p = event.target[2].value;

        let data = null;
        let config = {
            params: {
                name: n,
                email: e,
                password: p,
            },
        };

        try {
            const res = await axios.post(api_url + "register", data, config);
            if (res.data.access_token) {
                localStorage.setItem("user", JSON.stringify(res.data.access_token));
            }
            return res;
        } catch (err) {
            console.log(err.response);
        }
    }

    async login(event) {
        let e = event.target[0].value;
        let p = event.target[1].value;

        let data = null;
        let config = {
            params: {
                email: e,
                password: p,
            },
        };
        try {
            const res = await axios.post(api_url + "login", data, config);
            if (res.data.access_token) {
                localStorage.setItem("user", JSON.stringify(res.data.access_token));
            }
            return res;
        } catch (err) {
            console.log(err);
        }
    }

    async gcaptcha(token) {
        let data = null;
        let config = {
          params: {
            token,
          },
          headers: {
            Authorization: "Bearer ",
          },
        };
        try {
          const res = await axios.post(api_url + "captcha", data, config);
          return res;
        } catch (err) {
          console.log(err);
            console.log(JSON.stringify(err))
        }
    }

    async logout() {
        let Token = JSON.parse(localStorage.getItem("user"));
        console.log(Token);
        let data = null;
        let config = {
          params: {
            token: Token
          },
          headers: {
          },
        };
        try {
          const res = await axios.post(api_url + "logout", data, config);
          localStorage.removeItem("user");
          return res;
        } catch (err) {
            console.log(JSON.stringify(err))
            console.log(err);
        }
    }

    async verifyEmail(token) {
        
        let t = token;
        // console.log(token);
        let data = null;
        let config = {
            params: {
                token: t,
            },
            headers: {},
        };
        try {
            const res = await axios.post(api_url + "email/verify", data, config);
            return res;
        } catch (err) {
            console.log(err);
            console.log(JSON.stringify(err))
        }
    }

    async resendemail() {
        let token = JSON.parse(localStorage.getItem("user"));
        // console.log(token);
        let data = null;
        let config = {
          params: {},
          headers: {
            Authorization: "Bearer " + token,
          },
        };
        try {
          const res = await axios.post(api_url + "email/request-verification", data, config );
          console.log(res);
          return res;
        } catch (err) {
          console.log(err);
        }
    }

    async resetpasswordrequest(email) {
        console.log(email);
        let data = null;
        let config = {
          params: {
            email: email,
          },
          headers: {
          },
        };
        try {
          const res = await axios.post(api_url + "/password/reset-request", data, config );
          return res;
        } catch (err) {
          console.log(err);
        }
    }
    async resetPassword(email,password,password_confirmation,Token) {
    
        const urlToken = new URL(window.location.href);
        const token = urlToken.searchParams.get("token");
    
        let data = null;
        let config = {
          params: {
            email,
            password,
            password_confirmation,
            token:token,
          },
    
          headers: {
            Authorization: "Bearer " + token,
          },
        };
        try {
          const res = await axios.post(api_url + "password/reset", data, config);
          return res;
        } catch (err) {
          console.log(err);
          // console.log(JSON.stringify(err))
        }
    }



    async me() {
      let token = JSON.parse(localStorage.getItem("user"));
      let data = null;
      let config = {
        params: {},
        headers: {
          Authorization: "Bearer " + token,
        },
      };    
      const res = await axios.post(api_url + "user", data, config);
      return res;
    }

    async getAllUsers(page,search) {
      let token = JSON.parse(localStorage.getItem("user"));
      let data = null;
      let config = {
        params: {
          page,
          search
        },
        headers: {
          Authorization: "Bearer " + token,
        },
      };    
      const res = await axios.post(api_url + "users", data, config);
      return res;
    }

    async createTask(title,due_date,desc, to) {
      let token = JSON.parse(localStorage.getItem("user"));
      let data = null;
      let config = {
        params: {
          title,
          due_date: moment(due_date).utc().format("YYYY-MM-DD HH:mm:ss"),
          desc,
          assigned_to: to,
        },
        headers: {
          Authorization: "Bearer " + token,
        },
      };
      try {
        const res = await axios.post(api_url + "createTask", data, config);
        return res;
      } catch (err) {
        console.log(err);
      }
    }

    async getTasks(page,search,sort) {
      let token = JSON.parse(localStorage.getItem("user"));
  
      let data = null;
      let config = {
        params: {
          page,
          search,
          sort,
        },
        headers: {
          Authorization: "Bearer " + token,
        },
      };
      const res = await axios.post(api_url + "showTasks", data, config);
      return res;
    }

    async getAllTasks(page,search,sort) {
      let token = JSON.parse(localStorage.getItem("user"));
  
      let data = null;
      let config = {
        params: {
          page,
          search,
          sort,
        },
        headers: {
          Authorization: "Bearer " + token,
        },
      };
        let res = await axios.post(api_url + "showAllTasks", data, config);
        return res;
    }

    async stats(type) {
      let token = JSON.parse(localStorage.getItem("user"));
  
  
      let data = null;
      let config = {
        params: {
          type
        },
        headers: {
          Authorization: "Bearer " + token,
        },
      };
  
      try {
        const res = await axios.post(api_url + "stats", data, config);
        return res;
      } catch (err) {
        console.log(err);
      }
    }

    async changeStatus(task, stat) {
      let token = JSON.parse(localStorage.getItem("user"));
      let data = null;
      let config = {
        params: {
          task: task.id,
          status_change_to: stat,
        },
        headers: {
          Authorization: "Bearer " + token,
        },
      };
      try {
        const res = await axios.post(api_url + "changeStatus", data, config);
        return res;
      } catch (err) {
        console.log(err);
      }
    }

    async changeTaskStatusBulk(idArr,bulkAction) {
      let token = JSON.parse(localStorage.getItem("user"));
      let data = null;
      let config = {
        params: {
          idArr,
          bulkAction
        },
        headers: {
          Authorization: "Bearer " + token,
        },
      };
      try {
        const res = await axios.post( api_url + "changeTaskStatusBulk", data, config);
        console.log(res);
        return res;
  
      } catch (err) {
        console.log(err);
      }
    }

});

