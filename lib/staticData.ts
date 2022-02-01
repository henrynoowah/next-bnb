export const monthList = [
  "1월",
  "2월",
  "3월",
  "4월",
  "5월",
  "6월",
  "7월",
  "8월",
  "9월",
  "10월",
  "11월",
  "12월",
]

// 1 ~ 31
export const dayList = Array.from(Array(31), (_, i) => String(i + 1));

// 1990 ~ 2022
export const yearList = Array.from(Array(123), (_, i) => String(2022 - i));

export const largeBuildingTypeList = [
  "아파트",
  "주택",
  "별체",
  "톡특한 숙소",
  "B&B",
  "부티크호텔"
]