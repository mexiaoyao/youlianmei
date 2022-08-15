<template functional>
    <h3 :style="{ margin: '16px 0', paddingLeft:'15px' }">{{ props.info}}</h3>
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
</style>