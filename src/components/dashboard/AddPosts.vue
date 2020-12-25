<template>
    <div class="dasboard_form">
        <h1>Add posts</h1>
        <form @submit.prevent="submitHandler">
         
            <div class="input_field" :class="{invalid: $v.formdata.title.$error}">
                <label>Title</label>
                <input 
                    type="text"
                    @blur ="$v.formdata.title.$error"
                    v-model="formdata.title"
                >
                <p class="error_label" v-if="$v.formdata.title.$error">
                    This input is required
                </p>
            </div>

            <div class="input_field" :class="{invalid: $v.formdata.desc.$error}">
                <label>Description</label>
                <input 
                    type="text"
                    @blur ="$v.formdata.desc.$error"
                    v-model="formdata.desc"
                >
                <p class="error_label" v-if="$v.formdata.desc.$error">
                    This input is required
                </p>
                <p class="error_label" v-if="!$v.formdata.desc.maxLength">
                    Must not be greater than {{ $v.formdata.desc.$params.maxLength.max }} charaters
                </p>
            </div>

            <div class="input_field">
                <wysiwyg v-model="formdata.content" />
            </div>

            <div class="input_field" :class="{invalid: $v.formdata.rating.$error}">
                <label>Rating</label>
                <select 
                    @blur="$v.formdata.rating.$touch()"
                    v-model="formdata.rating"
                >
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                </select>
                  <p class="error_label" v-if="$v.formdata.rating.$error">
                    Select one
                </p>
            </div>
            <button type="submit">Add post</button>
        </form>

        <md-dialog :md-active="dialog">
            <p>
                Your post has no content, are you sure you want to post this?
            </p>
            <md-dialog-actions>
                <md-button class="md-primary" @click="dialogOnCancel">Oops, i want to add it.</md-button>
                <md-button class="md-primary" @click="dialogOnConfirm" >Yes i am sure.</md-button>
            </md-dialog-actions>
        </md-dialog>

        <div v-if="addpost" class="post_succesfull">
            Posted successfully
        </div>

    </div>
</template>

<script>

import {required,maxLength} from 'vuelidate/lib/validators'

export default {

    data() {
        return {
            dialog:false,
            formdata:{
                title:'',
                desc:'',
                content:'',
                rating:''
            }
        }
    },
    validations:{
        formdata:{
            title:{
                required
            },
            desc:{
                required,
                maxLength: maxLength(100)
            },
            rating:{
                required
            }
        }
    },
    computed: {
        addpost() {
            let status = this.$store.getters['admin/addPostStatus'];
            if(status) {
                this.clearPost()
            }
            return status;
        }
    },
    methods: {
        clearPost() {
            this.$nextTick(() => { this.$v.$reset() })
            this.formdata = {
                title:'',
                desc:'',
                content:'',
                rating:''
            }
        },
        submitHandler() {
            if(!this.$v.$invalid) {
                if(this.formdata.content === '') {
                    this.dialog = true;
                } else {
                    this.addPost()
                }
            } else {
                alert('something is wrong')
            }
        },
        dialogOnCancel() {
            this.dialog = false
        },
        dialogOnConfirm() {
            this.dialog = false;
            this.addPost()
        },
        addPost() {
            this.$store.dispatch('admin/addPost', this.formdata)
        }
    }
}
</script>

<style scoped> 
@import "~vue-wysiwyg/dist/vueWysiwyg.css";

.input_field.invalid input,
.input_field.invalid select {
    border: 1px solid red;
}


</style>