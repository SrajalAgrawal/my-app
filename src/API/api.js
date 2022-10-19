import axios from "axios";
// import moment from "moment";

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
                // role: 1,
            },
        };

        try {
            const res = await axios.post(api_url + "register", data, config);
            if (res.data.access_token) {
                localStorage.setItem("user", JSON.stringify(res.data));
            }
            return res;
        } catch (err) {
            console.log(err.response);
            // console.log(JSON.stringify(err))
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
                localStorage.setItem("user", JSON.stringify(res.data));
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
        let token = JSON.parse(localStorage.getItem("user")).access_token;
        let data = null;
        let config = {
          params: {},
          headers: {
            Authorization: "Bearer " + token,
          },
        };
        try {
          const res = await axios.post(api_url + "logout", data, config);
          localStorage.removeItem("user");
          return res;
        } catch (err) {
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
        let token = JSON.parse(localStorage.getItem("user")).access_token;
        // console.log(token);
        let data = null;
        let config = {
          params: {},
          headers: {
            Authorization: "Bearer " + token,
          },
        };
        try {
          const res = await axios.post(
            "http://localhost:8000/email/request-verification",
            data,
            config
          );
          console.log(res);
          return res;
        } catch (err) {
          console.log(err);
        }
    }

    async resetpasswordrequest() {
        let Email = JSON.parse(localStorage.getItem("user")).user.email;
        console.log(Email);
        let data = null;
        let config = {
          params: {
            email: Email,
          },
          headers: {
            // Authorization: "Bearer " + token,
          },
        };
        try {
          const res = await axios.post(
            "http://localhost:8000/password/reset-request",
            data,
            config
          );
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
          console.log(JSON.stringify(err))
        }
    }
});

