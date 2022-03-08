/** date */
export default function date() {
    const current_datetime = new Date();
    const hours = current_datetime.getHours();
    const minutes = current_datetime.getMinutes();

    return `${hours}:${minutes}`
}