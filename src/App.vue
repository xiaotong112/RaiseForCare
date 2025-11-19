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

page {
  background-color: #FFF5F0;
  min-height: 100vh;
}

page-body {
  background-color: #FFF5F0;
}
</style>
