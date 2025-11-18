<template>
  <div class="calendar">
    <header>
      <button @click="prevMonth">Previous</button>
      <h2>{{ monthYear }}</h2>
      <button @click="nextMonth">Next</button>
    </header>
    <div class="days">
      <div class="day" v-for="day in days" :key="day">{{ day }}</div>
    </div>
    <div class="dates">
      <div
        class="date"
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
        alert(`Selected date: ${date}`);
      }
    },
  },
};
</script>

<style scoped>
.calendar {
  width: 300px;
  border: 1px solid #ccc;
  padding: 10px;
}
.header {
  display: flex;
  justify-content: space-between;
}
.days,
.dates {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
}
.day,
.date {
  padding: 10px;
  text-align: center;
}
.date:hover {
  background-color: #f0f0f0;
  cursor: pointer;
}
</style>
