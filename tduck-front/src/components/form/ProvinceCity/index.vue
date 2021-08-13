<template>
    <div>
        <el-cascader
            v-model="value"
            style="width: 100%"
            :options="options"
            :props="props"
            clearable
            @change="changeHandle"
        />
    </div>
</template>

<script>
import city from './level.min.json'
export default {
    name: 'ProvinceCity',
    data() {
        return {
            value: '',
            options: city,
            props: {
                label: 'n',
                value: 'n',
                children: 'd'
            }
        }
    }, methods: {
        changeHandle(val) {
            this.$emit('input', val)
        }
    }
}
</script>

