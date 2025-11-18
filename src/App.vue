<script>
export default {
  onLaunch: function () {
    console.log("App Launch");
  },
  onShow: function () {
    console.log("App Show");
  },
  onHide: function () {
    console.log("App Hide");
  },
};
</script>

<style lang="scss">
@use "tailwindcss/base";
@use "tailwindcss/utilities";
@use "tailwindcss/components";
.container {
  @apply flex flex-col items-center justify-center h-full;
}

page {
  background: linear-gradient(to bottom right, #fff8e8, #ffe8d8, #fff8e8);
}
</style>
