import Vue from 'vue'

const FbAuth = 'https://identitytoolkit.googleapis.com/identitytoolkit/v3/relyingparty'
const FbApiKey = 'AIzaSyBH2fB5qec7MiW9CaoZNPxOyDLkIjGA45Y'

// :signInWithPassword?key=AIzaSyBH2fB5qec7MiW9CaoZNPxOyDLkIjGA45Y
const admin = {
    namespaced : true,

    state:{
        token: null,
        refresh: null,
        authFailed: false
    },
    getters:{

    },
    mutations:{
        authUser(state, authData) {
            state.token = authData.idToken,
            state.refresh = authData.refreshToken
        },
        authFailed(state, type){
            if (type === 'reset') {
                state.authFailed = false;
            } else {
                state.authFailed = true;
            }
        }
    },
    actions: {
        signIn({commit},payload){
           Vue.http.post(`${FbAuth}/verifyPassword?key=${FbApiKey}`,{
               ...payload,
               returnSecureToken: true 
           })
           .then( response => response.json())
           .then( authData => {
              
              commit("authUser",{
                  ...authData,
                  type: 'signin'
              });
              localStorage.setItem("token",authData.idToken)
              localStorage.setItem("refresh",authData.refreshToken)
           })
           .catch( error => {
                commit("authFailed")
           })
        }
    }
}

export default admin 