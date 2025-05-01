export const api = {
    test:"api/test",
    upload:'api/upload',

    // assessment
    assessment:"api/assessments",
    popularAssessment:"api/assessments/popular",
    getAssessment:"api/assessments/$id",
    listAssessment:"api/assessments/list",
    assessmentCategory:"api/assessment/category",
    taskAssessment:"api/assessment/$id/task",

    // user assessment
    submitAssessment:"api/user-assessment/submit",

    // category
    category:"api/category",

    // user
    login:"api/login",
    register:"api/register",
    updateUser:"api/user/$id",
    createUser:"api/users",

    // question
    createQuestion:"api/questions",
    getQuestion:"api/assessment/$id/question",
    listQuestion:"api/questions/list",
    update:"api/questions/$id",
    delete:"api/questions/$id/delete",

    // stats
    stats:"api/statistics",
    dashboardStats:"api/dashboard/stats",
    dashboardPopularAssessment:"api/dashboard/popular-assessments",
    dashboardRecentActivity:"api/dashboard/activity",
    dashboardUser:"api/dashboard/users",

    // user profile
    userProfile:"api/profile/user/$id",
    userSkills:"api/profile/skill-proficient/$id",
    userTakenAssessment:"api/profile/user-assessments/$id",
    userRecentActivity:"api/profile/user-activity/$id",
}