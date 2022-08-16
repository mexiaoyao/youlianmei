<template functional>
    <div class="titleName">{{ props.info}}</div>
</template>
<script>
export default {
    props: ["info"]
};
</script>
<!-- //<script>
// export default {
//     name: "titleName",
//     props: {
//         titleName: {
//             type: String,
//             default: ""
//         }
//     }
// };
//
</script> -->
<style scoped>
.titleName {
    margin: 16px;
    padding-left: 15px;
    position: relative;
}
.titleName::before {
    content: "";
    width: 4px;
    height: 80%;
    display: inline-block;
    position: absolute;
    left: 0;
    top: 2px;
    background: #40a0ce;
}
</style>