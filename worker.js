self.onmessage = function(event) {
    const { type, data } = event.data;
    let result;

    switch(type) {
        case 'processDataA':
            result = processDataA(data);
            break;
        // Thêm các trường hợp khác nếu cần
    }

    self.postMessage({ type: 'resultA', result });
};

function processDataA(data) {
    // Xử lý dữ liệu A
    // Ví dụ: tính toán hoặc xử lý dữ liệu
    return data.map(item => item * 3); // Ví dụ xử lý dữ liệu
}
