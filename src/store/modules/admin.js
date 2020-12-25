import Vue from 'vue'
import router from '../../routes'

const FbAuth = 'https://identitytoolkit.googleapis.com/identitytoolkit/v3/relyingparty'
const FbApiKey = 'AIzaSyBH2fB5qec7MiW9CaoZNPxOyDLkIjGA45Y'

const admin = {
    namespaced : true,

    state:{
        token: null,
        refresh: null,
        authFailed: false,
        refreshLoading: true,
        addpost: false
    },
    getters:{
        isAuth(state) {
            if(state.token) {
                return true;
            }else{
                return false;
            }
        },
        refreshLoading(state) {
            return state.refreshLoading
        },
        addPostStatus(state) {
            return state.addpost
        }
    },
    mutations:{
        authUser(state, authData) {
            state.token = authData.idToken,
            state.refresh = authData.refreshToken

            if(authData.type === 'signin') {
                router.push('/dashboard')
            }

        },
        authFailed(state, type){
            if (type === 'reset') {
                state.authFailed = false;
            } else {
                state.authFailed = true;
            }
        },
        logoutUser(state){
            state.token = null;
            state.refresh = null;
            localStorage.removeItem('token');
            localStorage.removeItem('refresh');

            router.push('/')
        },
        refreshLoading(state) {
            state.refreshLoading = false;
        },
        addPost(state) {
            state.addpost = true;
        },
        clearAddPost(state) {
            state.addpost = false;
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
        },
        refreshToken({commit}) {
            const refreshToken = localStorage.getItem("refresh");

            if(refreshToken) {
                Vue.http.post(`https://securetoken.googleapis.com/v1/token?key=${FbApiKey}`,{
                    grant_type:'refresh_token',
                    refresh_token: refreshToken
                })
                .then(response => response.json())
                .then(authData => {
                    commit("authUser",{
                        idToken: authData.id_token,
                        refreshToken: authData.refresh_token,
                        type: 'refresh'
                    });
                    commit("refreshLoading")
                    localStorage.setItem("token",authData.id_token)
                    localStorage.setItem("refresh",authData.refresh_token)
                })
            } else {
                commit("refreshLoading")
            }
        },
        addPost({commit,state}, payload){
            Vue.http.post(`posts.json?auth=${state.token}`,payload)
            .then( response => response.json() )
            .then( response => {
                commit("addPost")
                setTimeout(() => {
                    commit("clearAddPost")
                },3000)
            })
        }
    }
}

export default admin 