self.onmessage = function(event) {
    const { type, data } = event.data;
    let result;

    switch(type) {
        case 'processDataB':
            result = processDataB(data);
            break;
        // Thêm các trường hợp khác nếu cần
    }

    self.postMessage({ type: 'resultB', result });
};

function processDataB(data) {
    // Xử lý dữ liệu B
    // Ví dụ: tính toán hoặc xử lý dữ liệu
    return data.map(item => item * 2); // Ví dụ xử lý dữ liệu
}
