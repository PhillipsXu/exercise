<template>
    <el-row class="min-h-screen" :class="[bgFlag ? 'blackbg' : 'whitebg']">
        <div class="mask"></div>
        <div class="mask2"></div>
        <el-col :lg="16" :md="12" class="left"
            :style="[windowWidth > 1200 ? 'background-position: 50% 0;' : 'background-position: 50% 20%;']">
            <div class="titleBox" :class="[windowWidth > 980 ? 'pr-60' : '']"
                :style="[windowWidth > 1200 ? 'display: block' : 'display: none']">
                <div class="title">WebsiteManagementSystem</div>
                <div class="text-gray-400">
                    <a href="https://cn.vuejs.org/" target="_blank" rel="noopener noreferrer"
                        :class="[bgFlag ? 'hover:(text-gray-300)' : 'hover:(text-gray-600)']">此站点为实战训练，仅供参考</a>
                </div>
            </div>
        </el-col>
        <el-col :lg="8" :md="12" class="right text-neutral-800">
            <h1 class="title">Welcome Back</h1>
            <div class="form">
                <el-switch v-model="bgFlag" :active-icon="Moon" :inactive-icon="Sunny" @change="switchChange"
                    inline-prompt :disabled="swFlag"
                    style="position: absolute; right: 3vh; top: 1vh; --el-switch-on-color: #ccc; --el-switch-off-color: #000" />
                <span class="h-[1px] w-12 bg-gray-300"></span>
                <span>Please Login</span>
                <span class="h-[1px] w-12 bg-gray-300"></span>
            </div>
            <el-form :model="ruleForm" class="ruleForm w-[15rem]" :rules="rules" ref="ruleFormRef">
                <el-form-item prop="username">
                    <el-input v-model="ruleForm.username" placeholder="uesername">
                        <template #prefix>
                            <el-icon class="el-input__icon">
                                <User />
                            </el-icon>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input v-model="ruleForm.password" placeholder="password" type="password" show-password>
                        <template #prefix>
                            <el-icon class="el-input__icon">
                                <Key />
                            </el-icon>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item style="display: flex;">
                    <el-button :disabled="flag" class="w-[15rem]" style="margin: auto;" color="#626aef" round
                        type="primary" @click="submitForm(ruleFormRef)">{{ flag? count + '秒后重试': 'Login' }}</el-button>
                    <el-button class="w-[15rem]" style="margin: auto; margin-top: 0.5rem; color: white;" color="#fcd34d"
                        round type="primary" @click="resetForm(ruleFormRef)">Reset</el-button>
                </el-form-item>
            </el-form>
        </el-col>
    </el-row>
</template>

<script setup lang='ts'>
import { ref, reactive } from 'vue';
import { User, Key, Sunny, Moon } from '@element-plus/icons-vue';
import { ElNotification, FormInstance, FormRules } from 'element-plus';
import { login } from '../requests/api';
import { useCookies } from '@vueuse/integrations/useCookies';
import { useRouter } from 'vue-router';

const cookie = useCookies();
const router = useRouter();

const ruleFormRef = ref<FormInstance>();
const rules = reactive<FormRules>({
    username: [
        { required: true, message: 'Please input username!', trigger: 'blur' }
    ],
    password: [
        { required: true, message: 'Please input password!', trigger: 'blur' }
    ]
})
const ruleForm = reactive({
    username: '',
    password: ''
})
const submitForm = async (formElement: FormInstance | undefined) => {
    if (!formElement) return
    await formElement.validate(async (valid, fields) => {
        if (valid) {
            login(ruleForm.username, ruleForm.password)
            const res = await login(ruleForm.username, ruleForm.password);
            if (res.status == 200) {
                ElNotification({
                    message: "登录成功！",
                    type: 'success',
                    duration: 1500
                })
                cookie.set(ruleForm.username + '_token', res.data.data.token);
                router.push("/");
            } else {
                ElNotification({
                    message: res.response.data.msg,
                    type: 'error',
                    duration: 3000
                })
            }
        } else {
            console.log(fields);
        }
    })
}
const resetForm = (formElement: FormInstance | undefined) => {
    if (!formElement) return
    formElement.resetFields();
}

// 测试
const flag = ref<boolean>(false);
const count = ref<number>(60);

const windowWidth = ref<number>(window.innerWidth);
onMounted(() => {
    window.onresize = function () {
        windowWidth.value = window.innerWidth;
    }
})

const bgFlag = ref<boolean>(false);
const swFlag = ref<boolean>(false);
onBeforeMount(() => {
    if (localStorage.getItem('bgFlag')) {
        bgFlag.value = true;
    }
})
const switchChange = (val: boolean) => {
    swFlag.value = true;
    if (val) {
        localStorage.setItem('bgFlag', 'true');
    } else {
        localStorage.removeItem('bgFlag');
    }
    setTimeout(() => {
        swFlag.value = false;
    }, 1000);
}



</script>

<style scoped lang="scss">
.blackbg {
    transition: background-color .5s linear;
    z-index: 0;
    overflow: hidden;

    .mask {
        position: absolute;
        right: 0;
        top: 0;
        width: 0;
        height: 0;
        background-color: #4a4a4a;
        animation: bg 1s cubic-bezier(0.075, 0.82, 0.165, 1) forwards;
        z-index: 2;
        border-radius: 100%;
    }

    @keyframes bg {
        0% {
            width: 0;
            height: 0;
            border-radius: 100% 0 100% 100%;
        }

        100% {
            width: 100vw;
            height: 100vh;
            border-radius: 0;
        }
    }

    .left {
        @apply flex justify-center items-center bg-light-50;
        // background-image: url('../assets/sign_bg.47eec442.png');
        // transition: background-color .5s linear;

        .titleBox {
            @apply bg-dark-50 rounded-3xl shadow-xl p-4;
            // transition: background-color .5s linear;
            z-index: 5;

            .title {
                @apply font-bold text-5xl mb-8 text-light-100;
                // transition: background-color .5s linear;
                z-index: 5;
            }
        }

    }

    .right {
        @apply bg-light-50 flex justify-center items-center flex-col;
        // transition: background-color .5s linear;

        .title {
            @apply font-bold text-3xl text-light-100 py-4;
            z-index: 5;
        }

        .form {
            @apply flex justify-center items-center space-x-4 text-2xl text-gray-300 py-4;
            z-index: 5;
        }

        .ruleForm {
            z-index: 5;
        }
    }
}

.whitebg {
    transition: background-color .5s linear;
    z-index: 0;
    overflow: hidden;

    .mask2 {
        position: absolute;
        left: 0;
        bottom: 0;
        width: 0;
        height: 0;
        background-color: #fdfdfd;
        animation: bg2 1s cubic-bezier(0.075, 0.82, 0.165, 1) forwards;
        z-index: 2;
        border-radius: 100%;
    }

    @keyframes bg2 {
        0% {
            width: 0;
            height: 0;
            border-radius: 100% 100% 100% 0;
        }

        100% {
            width: 100vw;
            height: 100vh;
            border-radius: 0;
        }
    }

    .left {
        @apply flex justify-center items-center bg-dark-50;
        // background-image: url('../assets/sign_bg.47eec442.png');
        // transition: background-color .5s linear;

        .titleBox {
            @apply bg-light-50 rounded-3xl shadow-xl p-4;
            z-index: 5;
            // transition: background-color .5s linear;

            .title {
                @apply font-bold text-5xl mb-8 text-indigo-500;
                // transition: background-color .5s linear;
            }
        }
    }

    .right {
        @apply bg-dark-50 flex justify-center items-center flex-col;
        // transition: background-color .5s linear;

        .title {
            @apply font-bold text-3xl text-gray-600 py-4;
            // transition: background-color .5s linear;
            z-index: 5;
        }

        .form {
            @apply flex justify-center items-center space-x-4 text-2xl text-gray-300 py-4;
            z-index: 5;
        }

        .ruleForm {
            z-index: 5;
        }
    }
}
</style>