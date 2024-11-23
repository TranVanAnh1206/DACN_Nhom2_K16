// import { Buffer } from 'buffer';

export const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });
};

// export const convertBufferToBase64 = (buffer = '') => {
//     if (buffer) {
//         return new Buffer(buffer, 'base64').toString('binary');
//     } else {
//         return '';
//     }
// };

export const formatPrice = (price, style) => {
    switch (style) {
        case 'VND':
            return Number(price)?.toLocaleString('it-IT', { style: 'currency', currency: 'VND' });
        case 'USD':
            return Number(price)?.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
        default:
            return Number(price);
    }
};

export const secondsConvertHoursAndMinutesAndSeconds = (seconds) => {
    const h = (seconds - (seconds % 3600)) / 3600;
    const m = (seconds - h * 3600 - ((seconds - h * 3600) % 60)) / 60;
    const s = seconds % 60;
    return { h, m, s };
};

export const totalPayment = (payment, voucher = { type: '', value: 0 }) => {
    if (voucher?.type === '%') {
        return (Number(payment) * (100 - Number(voucher?.value))) / 100;
    } else if (voucher?.type === 'VND') {
        return Number(payment) - Number(voucher?.value);
    }
};

export const formatDateTime = (isoDateStr) => {
    const dateObj = new Date(isoDateStr);

    const day = String(dateObj.getDate()).padStart(2, '0');
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const year = dateObj.getFullYear();

    // Định dạng ngày tháng năm
    const formattedDate = `${day}/${month}/${year}`;

    // Lấy giờ phút
    const hours = String(dateObj.getHours()).padStart(2, '0');
    const minutes = String(dateObj.getMinutes()).padStart(2, '0');
    const time = `${hours}:${minutes}`;

    return `${time}, ${formattedDate}`;
};

export const formatCurrency = (value) => {
    if (!value) return '';
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    }).format(value);
};
