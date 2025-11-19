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
  @apply flex flex-col items-center justify-center h-full w-full p-4;
}

:root,
page {
  background-color: #fff5f0;
  min-height: 100vh;
  --wot-color-theme: #ff9d8f;
}

page-body {
  background-color: #fff5f0;
}
</style>
