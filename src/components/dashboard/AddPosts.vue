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
    </div>
</template>

<script>

import {required,maxLength} from 'vuelidate/lib/validators'

export default {

    data() {
        return {
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
    methods: {
        submitHandler() {

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