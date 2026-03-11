document.addEventListener("DOMContentLoaded", function () {

  const MAX_POINTS = 20;
  const MAX_LOGS = 12;

  const state = {
    cpu: 34,
    memory: 46,
    disk: 57,
    streamOn: true,
  };

  const refs = {
    cpuValue: document.getElementById("cpuValue"),
    memoryValue: document.getElementById("memoryValue"),
    diskValue: document.getElementById("diskValue"),
    healthScore: document.getElementById("healthScore"),
    logBody: document.getElementById("logBody"),
    toggleStreamBtn: document.getElementById("toggleStreamBtn"),
    clearLogBtn: document.getElementById("clearLogBtn"),
  };

  /* ------------------ UTIL FUNCTIONS ------------------ */

  function randomBetween(min, max) {
    return Number((Math.random() * (max - min) + min).toFixed(1));
  }

  function clamp(v, min, max) {
    return Math.min(max, Math.max(min, v));
  }

  function nextValue(current, step, min, max) {
    const delta = (Math.random() * 2 - 1) * step;
    return clamp(current + delta, min, max);
  }

  /* ------------------ CHART DATA ------------------ */

  const cpuData = Array.from({ length: MAX_POINTS }, () => randomBetween(30, 58));
  const memoryData = Array.from({ length: MAX_POINTS }, () => randomBetween(40, 68));
  const serviceData = [42, 35, 28, 31];

  /* ------------------ LINE CHART ------------------ */

  const lineChart = new Chart(
    document.getElementById("lineChart"),
    {
      type: "line",
      data: {
        labels: Array.from({ length: MAX_POINTS }, (_, i) => i + 1),
        datasets: [
          {
            label: "CPU %",
            data: cpuData,
            borderColor: "#7dd3fc",
            borderWidth: 2,
            tension: 0.4,
          },
          {
            label: "Memory %",
            data: memoryData,
            borderColor: "#34d399",
            borderWidth: 2,
            tension: 0.4,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: { min: 0, max: 100 },
        },
      },
    }
  );

  /* ------------------ DOUGHNUT CHART ------------------ */

  const doughnutChart = new Chart(
    document.getElementById("doughnutChart"),
    {
      type: "doughnut",
      data: {
        labels: ["CPU", "Memory", "Disk"],
        datasets: [
          {
            data: [state.cpu, state.memory, state.disk],
            backgroundColor: ["#38bdf8", "#34d399", "#fbbf24"],
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
    }
  );

  /* ------------------ BAR CHART ------------------ */

  const barChart = new Chart(
    document.getElementById("barChart"),
    {
      type: "bar",
      data: {
        labels: ["API Server", "Database", "Cache", "Worker"],
        datasets: [
          {
            label: "Load %",
            data: serviceData,
            backgroundColor: ["#38bdf8", "#34d399", "#fbbf24", "#fb7185"],
            borderRadius: 8,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: { min: 0, max: 100 },
        },
        plugins: {
          legend: { display: false },
        },
      },
    }
  );

  /* ------------------ UPDATE UI ------------------ */

  function updateUI() {
    refs.cpuValue.textContent = `${state.cpu.toFixed(1)}%`;
    refs.memoryValue.textContent = `${state.memory.toFixed(1)}%`;
    refs.diskValue.textContent = `${state.disk.toFixed(1)}%`;

    const health = Math.max(
      0,
      100 - Math.round((state.cpu + state.memory + state.disk) / 3)
    );
    refs.healthScore.textContent = health;
  }

  function pushPoint(arr, value) {
    arr.push(value);
    if (arr.length > MAX_POINTS) arr.shift();
  }

  /* ------------------ LOGGING ------------------ */

  function addLog(metric, value, severity) {
    const row = document.createElement("tr");
    const time = new Date().toLocaleTimeString();

    let sevClass = "";
    if (severity === "Critical") sevClass = "sev-critical";
    else if (severity === "Warning") sevClass = "sev-warn";
    else sevClass = "sev-good";

    row.innerHTML = `
      <td>${time}</td>
      <td>${metric}</td>
      <td>${value}</td>
      <td class="${sevClass}">${severity}</td>
    `;

    refs.logBody.insertBefore(row, refs.logBody.firstChild);

    while (refs.logBody.children.length > MAX_LOGS) {
      refs.logBody.removeChild(refs.logBody.lastChild);
    }
  }

  /* ------------------ AUTO UPDATE ------------------ */

  setInterval(() => {
    if (!state.streamOn) return;

    state.cpu = nextValue(state.cpu, 5, 10, 95);
    state.memory = nextValue(state.memory, 4, 20, 95);
    state.disk = nextValue(state.disk, 2, 30, 95);

    pushPoint(cpuData, state.cpu);
    pushPoint(memoryData, state.memory);

    lineChart.update();

    doughnutChart.data.datasets[0].data = [
      state.cpu,
      state.memory,
      state.disk,
    ];
    doughnutChart.update();

    serviceData[0] = Number((state.cpu * 0.7 + randomBetween(8, 22)).toFixed(1));
    serviceData[1] = Number((state.memory * 0.75 + randomBetween(5, 18)).toFixed(1));
    serviceData[2] = Number((state.memory * 0.45 + randomBetween(4, 15)).toFixed(1));
    serviceData[3] = Number(((state.cpu + state.memory) * 0.3 + randomBetween(4, 16)).toFixed(1));
    for (let i = 0; i < serviceData.length; i++) {
      serviceData[i] = clamp(serviceData[i], 5, 100);
    }
    barChart.update();

    updateUI();
  }, 1500);

  /* ------------------ BUTTONS ------------------ */

  refs.toggleStreamBtn.addEventListener("click", () => {
    state.streamOn = !state.streamOn;
    refs.toggleStreamBtn.textContent = state.streamOn
      ? "Pause Live Feed"
      : "Resume Live Feed";
  });

  refs.clearLogBtn.addEventListener("click", () => {
    refs.logBody.innerHTML = "";
  });

  /* ------------------ MOCK LOGS ------------------ */

  function loadMockLogs() {
    const mockLogs = [
      ["System", "Monitoring Started", "Good"],
      ["CPU", "72.4%", "Warning"],
      ["Memory", "68.9%", "Warning"],
      ["CPU", "86.3%", "Critical"],
      ["Disk", "76.8%", "Warning"],
    ];

    mockLogs.forEach((log) => addLog(log[0], log[1], log[2]));
  }

  loadMockLogs();
  updateUI();
});
