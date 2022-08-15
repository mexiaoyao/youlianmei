<template>
    <a-carousel autoplay>
        <div :key="index" v-for="(item,index) in imgUrlList">
            <img :src="item" height="460px" width="100%" />
        </div>
    </a-carousel>
</template>
<script>
import img1 from "@/assets/images/banner.png";
export default {
    name: "carouselCont",
    components: {},
    data() {
        return {
            imgUrlList: [img1, img1, img1, img1, img1, img1]
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
.ant-carousel :deep(.slick-slide) {
    text-align: center;
    height: 460px;
    line-height: 460px;
    overflow: hidden;
}

.ant-carousel :deep(.slick-slide h3) {
    color: #fff;
}
</style>