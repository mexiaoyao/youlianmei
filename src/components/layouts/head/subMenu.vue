<template functional>
    <a-sub-menu :key="props.menuInfo.key">
        <span slot="title">
            <span>{{ props.menuInfo.meta.title }}</span>
        </span>
        <template v-for="item in props.menuInfo.children">
            <a-menu-item :key="item.key" @click="parent.menuClick(item.path)" v-if="!item.children">
                <span>{{ item.meta.title }}</span>
            </a-menu-item>
            <sub-menu :key="item.key+'sub'" :menu-info="item" v-else />
        </template>
    </a-sub-menu>
</template>

<script>
export default {
    props: ["menuInfo"],
};
</script>
