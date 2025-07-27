export const api = {
  test: "api/test",
  upload: "api/upload",
  listFeedback: "api/feedback/user",

  // assessment
  assessment: "api/assessments",
  updateAssessment: "api/assessments/$id",
  popularAssessment: "api/assessments/popular",
  getAssessment: "api/assessments/$id",
  listAssessment: "api/assessments/list",
  assessmentCategory: "api/assessment/category",
  taskAssessment: "api/assessment/$id/task",
  assessmentStats: "api/assessment/stats",

  // user assessment
  submitAssessment: "api/user-assessment/submit",

  // category
  category: "api/category",

  // user
  login: "api/login",
  register: "api/register",
  resetPassword: "api/reset-password",
  updateUser: "api/user/$id",
  createUser: "api/users",
  recommend: "api/recommendations/$id/recommend",
  feedback: "api/user/feedback",
  feedbackCheck: "api/user/feedback/$id",
  deleteUser:'api/delete/$id/user',

  // question
  createQuestion: "api/questions",
  getQuestion: "api/assessment/$id/question",
  listQuestion: "api/questions/list",
  update: "api/questions/$id",
  delete: "api/questions/$id/delete",

  // dashboard
  stats: "api/statistics",
  dashboardStats: "api/dashboard/stats",
  dashboardPopularAssessment: "api/dashboard/popular-assessments",
  dashboardRecentActivity: "api/dashboard/activity",
  dashboardUser: "api/dashboard/users",
  completeAssessmentChart: "api/analytics/weekly-assessments",
  assessmentCompletionRate: "api/analytics/average-assessments",
  userRegister: "api/analytics/user-register",
  userPerformance: "api/dashboard/userPerformance",

  // user profile
  userProfile: "api/profile/user/$id",
  userSkills: "api/profile/skill-proficient/$id",
  userTakenAssessment: "api/profile/user-assessments/$id",
  userRecentActivity: "api/profile/user-activity/$id",
  showMessage: "api/student/messages/$id",

  // instructor
  studentTake: "api/take-assessment/$slug",
  studentResult: "api/student/result",
  sendMessage: "api/student/submitResult",
};
