<template>
    <ul class="linkUrl">
        <li>优联美</li>
        <li>CCTV</li>
        <li>人民银行</li>
    </ul>
    
</template>
<script>
export default {
    name: "linkUrl",
    components: {},
    data() {
        return {
            id: 123
        };
    },
    watch: {},
    created() {
        this.init();
    },
    methods: {
        init() {}
    }
};
</script>
<style scoped>
.linkUrl {
}
.linkUrl li {
    list-style: none;
    float: left;
    padding-right: 15px;
}
</style>