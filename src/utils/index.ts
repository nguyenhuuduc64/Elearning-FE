import dayjs from "dayjs";

export const createSlug = (text: string) => {
  return text
    .toLowerCase()
    .normalize("NFD")       
    .replace(/[\u0300-\u036f]/g, "") // bỏ dấu tiếng Việt
    .replace(/[^a-z0-9\s-]/g, "")    // bỏ ký tự đặc biệt
    .trim()
    .replace(/\s+/g, "-");           // space => -
};


export const formatDayTime = (date: string) => {
  return dayjs(date).format("DD/MM/YYYY HH:mm");
}