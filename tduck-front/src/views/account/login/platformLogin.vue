<template>
    <div />
</template>

<script>
import { getQueryString} from '@/utils'

export default {
    name: 'PlatformLogin',
    data() {
        return {}
    },
    created() {
        this.platformLoginHandle()
    },
    methods: {
        platformLoginHandle() {
            let platform = getQueryString('platform')
            let account = getQueryString('account')
            if (platform && account) {
                this.$api.post('/login/platform', {platform: platform, account: account}).then(res => {
                    if (res.data) {
                        this.loginSuccessHandle(res.data)
                    } else {
                        this.msgError('调查/问卷打开失败')
                    }
                })
            }
        },
        loginSuccessHandle(data) {
            this.$store.dispatch('user/login', data).then(() => {
                // 重置状态
                this.$store.dispatch('global/loginExpired', false).then(() => {
                })
                // 登录成功后路由跳回
                if (this.$route.query.redirect) {
                    this.$router.replace({
                        path: this.$route.query.redirect
                    })
                } else {
                    if (window.history.length <= 1) {
                        this.$router.push({path: '/home'})
                    } else {
                        this.$router.push({path: '/home'})
                    }
                }
            })
        }

    }
}
</script>

