import { defineStore } from "pinia";

// 定义记录状态 store
export const useRecordsStore = defineStore("records", {
  state: () => ({
    records: [
      // 示例数据
      {
        id: 1,
        date: "2024-08-08",
        time: "08:00",
        category: "刷牙",
        amount: -300,
        type: "expense",
        color: "#FFD700",
      },
      {
        id: 2,
        date: "2024-08-08",
        time: "08:20",
        category: "泡奶粉",
        amount: -300,
        type: "expense",
        color: "#FFD700",
      },
      {
        id: 3,
        date: "2024-08-08",
        time: "11:00",
        category: "更换新的尿不湿",
        amount: -300,
        type: "expense",
        color: "#FF6B6B",
      },
      {
        id: 4,
        date: "2024-08-08",
        time: "16:30",
        category: "出门带大人去医院体检",
        amount: -300,
        type: "expense",
        color: "#9B59B6",
      },
      {
        id: 5,
        date: "2024-08-08",
        time: "18:00",
        category: "给火火背准甲",
        amount: -300,
        type: "expense",
        color: "#3498DB",
      },
    ],
    categories: {
      expense: [
        { name: "玩具", color: "#FF6B6B", amount: 105 },
        { name: "奶粉", color: "#FFD700", amount: 330 },
        { name: "水果零食", color: "#FF8C00", amount: 150 },
        { name: "药片", color: "#32CD32", amount: 125 },
        { name: "洗护", color: "#87CEEB", amount: 63 },
      ],
      income: [
        { name: "工资", color: "#4CAF50", amount: 0 },
        { name: "奖金", color: "#2196F3", amount: 0 },
        { name: "其他收入", color: "#9C27B0", amount: 0 },
      ],
    },
    selectedDate: new Date(),
    currentTab: "records", // records 或 statistics
  }),

  getters: {
    // 获取选中日期的记录
    getRecordsByDate: (state) => (date) => {
      const dateStr = typeof date === "string" ? date : formatDate(date);
      return state.records.filter((record) => record.date === dateStr);
    },

    // 获取当前月份的记录
    getCurrentMonthRecords: (state) => {
      const currentMonth = state.selectedDate.getMonth();
      const currentYear = state.selectedDate.getFullYear();

      return state.records.filter((record) => {
        const recordDate = new Date(record.date);
        return (
          recordDate.getMonth() === currentMonth &&
          recordDate.getFullYear() === currentYear
        );
      });
    },

    // 计算当日收支
    getTodayStats: (state) => {
      const today = formatDate(state.selectedDate);
      const todayRecords = state.records.filter(
        (record) => record.date === today
      );

      const income = todayRecords
        .filter((record) => record.type === "income")
        .reduce((sum, record) => sum + record.amount, 0);

      const expense = todayRecords
        .filter((record) => record.type === "expense")
        .reduce((sum, record) => sum + Math.abs(record.amount), 0);

      return { income, expense };
    },

    // 计算月度统计
    getMonthlyStats: (state) => {
      const currentMonth = state.selectedDate.getMonth();
      const currentYear = state.selectedDate.getFullYear();

      const monthlyRecords = state.records.filter((record) => {
        const recordDate = new Date(record.date);
        return (
          recordDate.getMonth() === currentMonth &&
          recordDate.getFullYear() === currentYear
        );
      });

      const income = monthlyRecords
        .filter((record) => record.type === "income")
        .reduce((sum, record) => sum + record.amount, 0);

      const expense = monthlyRecords
        .filter((record) => record.type === "expense")
        .reduce((sum, record) => sum + Math.abs(record.amount), 0);

      // 按分类统计
      const categoryStats = {};
      monthlyRecords.forEach((record) => {
        const category = record.category;
        if (!categoryStats[category]) {
          categoryStats[category] = {
            name: category,
            amount: 0,
            color: record.color || "#999",
          };
        }
        categoryStats[category].amount += Math.abs(record.amount);
      });

      return {
        income,
        expense,
        total: expense + income,
        categories: Object.values(categoryStats),
      };
    },

    // 获取预测数据（示例）
    getPredictionData: () => {
      return {
        childExpense: [
          { year: 2024, amount: 30000 },
          { year: 2026, amount: 45000 },
          { year: 2028, amount: 60000 },
          { year: 2030, amount: 75000 },
          { year: 2032, amount: 85000 },
          { year: 2034, amount: 95000 },
        ],
        savings: [
          { year: 2024, amount: 25000 },
          { year: 2026, amount: 55000 },
          { year: 2028, amount: 85000 },
          { year: 2030, amount: 120000 },
          { year: 2032, amount: 160000 },
          { year: 2034, amount: 210000 },
        ],
      };
    },
  },

  actions: {
    // 添加记录
    addRecord(record) {
      const newRecord = {
        id: Date.now(),
        date: formatDate(record.date || new Date()),
        time: record.time || getCurrentTime(),
        category: record.category,
        amount: record.amount,
        type: record.type || (record.amount > 0 ? "income" : "expense"),
        color: record.color || "#999",
        ...record,
      };
      this.records.push(newRecord);
    },

    // 删除记录
    deleteRecord(id) {
      this.records = this.records.filter((record) => record.id !== id);
    },

    // 更新记录
    updateRecord(id, updates) {
      const index = this.records.findIndex((record) => record.id === id);
      if (index !== -1) {
        this.records[index] = { ...this.records[index], ...updates };
      }
    },

    // 设置选中日期
    setSelectedDate(date) {
      this.selectedDate = new Date(date);
    },

    // 设置当前tab
    setCurrentTab(tab) {
      this.currentTab = tab;
    },

    // 从服务器加载记录
    async loadRecords() {
      try {
        // 这里调用API获取记录
        console.log("加载记录数据...");
      } catch (error) {
        console.error("加载记录失败:", error);
      }
    },
  },
});

// 辅助函数
function formatDate(date) {
  const d = new Date(date);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(
    2,
    "0"
  )}-${String(d.getDate()).padStart(2, "0")}`;
}

function getCurrentTime() {
  const now = new Date();
  return `${String(now.getHours()).padStart(2, "0")}:${String(
    now.getMinutes()
  ).padStart(2, "0")}`;
}
