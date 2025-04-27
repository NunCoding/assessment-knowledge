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
}