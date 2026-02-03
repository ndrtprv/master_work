export function cipherData(data, type) {
    if (!data) return data;

    switch(type) {
        case 'login':
            const [localPart, domain] = data.split('@');
            return localPart[0] + '*'.repeat(localPart.length - 1) + '@' + domain;
        case 'phone_num':
            return data[0] + data[1] + '*'.repeat(data.length - 3) + data.slice(-2);
        case 'name':
        case 'surname':
            return data[0] + '*'.repeat(data.length - 1);
        default:
            return data;
    }
}