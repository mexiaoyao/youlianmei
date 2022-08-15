<template>
    <div style="padding:15px;">
        <a-row :gutter="16">
            <carousel-cont />
        </a-row>
        <a-row :gutter="16">
            <title-name :info="'新闻采集'" />
        </a-row>
        <a-row :gutter="16">
            <a-col :span="8">
                <real-time-news />
            </a-col>
            <a-col :span="8">
                <real-time-news />
            </a-col>
            <a-col :span="8">
                <real-time-news />
            </a-col>
        </a-row>
        <a-row :gutter="16">
            <title-name :info="'更新通知'" />
        </a-row>
        <a-row :gutter="16">
            <a-col :span="8">
                <real-time-news />
            </a-col>
            <a-col :span="8">
                <real-time-news />
            </a-col>
            <a-col :span="8">
                <real-time-news />
            </a-col>
        </a-row>
    </div>
</template>

<script>
import CarouselCont from "@/components/home/carouselCont.vue";
import RealTimeNews from "@/components/home/realTimeNews.vue";
import TitleName from "@/components/home/titleName.vue";

export default {
    name: "home",
    components: {
        CarouselCont,
        RealTimeNews,
        TitleName
    }
};
</script>
