export const formateDate = (date) => {
    const parsedDate = new Date(date);

    if (isNaN(parsedDate)) {
        return 'Invalid date';
    }

    const day = String(parsedDate.getDate()).padStart(2, '0');
    const month = String(parsedDate.getMonth() + 1).padStart(2, '0');
    const year = parsedDate.getFullYear();

    let hours = parsedDate.getHours();
    const minutes = String(parsedDate.getMinutes()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = String(hours % 12 || 12).padStart(2, '0');

    return `${day}-${month}-${year} ${hours}:${minutes} ${ampm}`;
}
