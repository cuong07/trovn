export const options = {
    animations: {
        radius: {
            duration: 400,
            easing: "linear",
            loop: (context) => context.active,
        },
    },
    hoverRadius: 12,
    hoverBackgroundColor: "yellow",
    responsive: true,
    bezierCurve: true,
    // interaction: {
    //     mode: "nearest",
    //     intersect: false,
    //     axis: "x",
    // },
    elements: {
        line: {
            tension: 0.4, // smooth lines
        },
    },
    plugins: {
        // legend: {
        //     position: "left",
        //     easing: "easeInBounce",
        // },
        title: {
            display: true,
            text: "Danh sách số phòng được thêm mới trong 30 ngày qua",
            fontSize: 40,
        },
    },
};

export const optionsPieChart = {
    responsive: true,

    plugins: {
        legend: {
            position: "left",
            easing: "easeInBounce",
        },
        title: {
            display: true,
            text: "Số phòng hiện có trên địa chỉ",
            fontSize: 25,
        },
    },
};
