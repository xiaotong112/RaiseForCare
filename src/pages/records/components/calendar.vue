<template>
  <div class="border-card mb-4">
    <header>
      <h2 class="flex items-center w-full justify-center font-bold">
        {{ monthYear }}
      </h2>
    </header>
    <div class="grid grid-cols-7 gap-2 text-center">
      <div class="p-3 text-center" v-for="day in days" :key="day">
        {{ day }}
      </div>
    </div>
    <div class="grid grid-cols-7 gap-2 text-center">
      <div
        class="p-2 text-center date rounded-lg"
        v-for="date in monthDates"
        :key="date"
        @click="selectDate(date)"
      >
        {{ date }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentDate: new Date(),
    };
  },
  computed: {
    monthYear() {
      return this.currentDate.toLocaleString("default", {
        month: "long",
        year: "numeric",
      });
    },
    days() {
      return ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    },
    monthDates() {
      const year = this.currentDate.getFullYear();
      const month = this.currentDate.getMonth();
      const firstDay = new Date(year, month, 1).getDay();
      const lastDate = new Date(year, month + 1, 0).getDate();
      const dates = [];

      for (let i = 0; i < firstDay; i++) {
        dates.push("");
      }
      for (let date = 1; date <= lastDate; date++) {
        dates.push(date);
      }
      return dates;
    },
  },
  methods: {
    prevMonth() {
      this.currentDate.setMonth(this.currentDate.getMonth() - 1);
    },
    nextMonth() {
      this.currentDate.setMonth(this.currentDate.getMonth() + 1);
    },
    selectDate(date) {
      if (date) {
        console.log(`Selected date: ${date} ${this.monthYear}`);
      }
    },
  },
};
</script>

<style scoped>
.date:hover {
  background-color: #ff9d8f;
  color: white;
  cursor: pointer;
}
</style>
