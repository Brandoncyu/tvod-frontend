export const date_sort_asc_episode_last = (date1, date2) => {
  let thedate1 = new Date(date1.last.airstamp)
  let thedate2 = new Date(date2.last.airstamp)
  if (thedate1 > thedate2) return 1;
  if (thedate1 < thedate2) return -1;
  return 0;
};

export const date_sort_asc_episode_upcoming = (date1, date2) => {
  let thedate1 = new Date(date1.upcoming.airstamp)
  let thedate2 = new Date(date2.upcoming.airstamp)
  if (thedate1 > thedate2) return 1;
  if (thedate1 < thedate2) return -1;
  return 0;
};
