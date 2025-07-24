export const formatDateTime = (isoString: string) : string =>  {
  const date = new Date(isoString);

  // Date 객체가 유효한지 확인
  if (isNaN(date.getTime())) {
    console.warn(`Invalid date string provided: ${isoString}`);
    return ''; // 유효하지 않은 날짜인 경우 빈 문자열 반환
  }

  // 각 부분을 가져와서 두 자릿수로 패딩 (예: 7 -> 07)
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // getMonth()는 0부터 시작하므로 +1
  const day = date.getDate().toString().padStart(2, '0');
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');

  // 최종 형식으로 조합
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}