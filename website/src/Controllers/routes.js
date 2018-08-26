const routes = {
  getSeasonActive: ["/Season/Active", "GET"],
  getSeason: ["/Season/Number", "GET"],
  getSeasonList: ["/Season/List", "GET"],
  postSeasonCreate: ["/Season/Create", "POST"],
  postSeasonUpdate: ["/Season/Update", "POST"],
  postSeasonDelete: ["/Season/Delete", "POST"],
  postWeekCreate: ["/Season/Week/Create", "POST"],
  postWeekDelete: ["/Season/Week/Delete", "POST"],
  postChallengeCreate: ["/Challenge/Create", "POST"],
  postChallengeUpdate: ["/Challenge/Update", "POST"],
  getImageType: ["/Image/Type", "GET"],
  postImageCreate: ["/Image/Create", "POST"],
  postImageUpdate: ["/Image/Update", "POST"],
  postImageDelete: ["/Image/Delete", "POST"],
  postLocationCreate: ["/Challenge/Location/Create", "POST"],
  postLocationUpdate: ["/Challenge/Location/Update", "POST"],
  postLocationDelete: ["/Challenge/Location/Delete", "POST"]
};
export default routes;
