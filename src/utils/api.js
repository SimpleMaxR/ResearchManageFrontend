const baseURL = "http://localhost:8080"

const api= {
    login: baseURL + "/login",

    overview: baseURL + "/overview",

    // Lab 相关接口
    listLabAll: baseURL + "/listLabAll",
    listLabByLabID: baseURL + "/listLabByLabID",
    createLab: baseURL + "/createLab",
    deleteLab: baseURL + "/deleteLab",
    updateLab: baseURL + "/updateLab",
    listLabByName: baseURL + "/listLabByName",

    // Researcher 相关接口
    listResearcherAll: baseURL + "/listResearcherAll",
    createResearcher: baseURL + "/createResearcher",
    deleteResearcher: baseURL + "/deleteResearcher",
    updateResearcher: baseURL + "/updateResearcher",
    listResearcherByLabID: baseURL + "/listResearcherByLabID",
    listResearcherByID: baseURL + "/listResearcherByID",

    // Secretary 相关接口
    createSecretary: baseURL + "/createSecretary",
    setSecretary: baseURL + "/setSecretary",
    deleteSecretary: baseURL + "/deleteSecretary",
    listSecretaryByLabID: baseURL + "/listSecretaryByLabID",
    listSecretaryAll: baseURL + "/listSecretaryAll",
    listSecretaryServiceByLabID: baseURL + "/listSecretaryServiceByLabID",

    // Office 相关接口
    listOfficeAll: baseURL + "/listOfficeAll",
    createOffice: baseURL + "/createOffice",
    deleteOffice: baseURL + "/deleteOffice",
    updateOffice: baseURL + "/updateOffice",
    listOfficeByLabID: baseURL + "/listOfficeByLabID",

    // Project 相关接口
    listProjectAll: baseURL + "/listProjectAll",
    createProject: baseURL + "/createProject",
    deleteProject: baseURL + "/deleteProject",
    updateProject: baseURL + "/updateProject",
    linkProjectPartner: baseURL + "/linkProjectPartner",
    listProjectResearcher: baseURL + "/listProjectResearcher",
    listProjectByName: baseURL + "/listProjectByName",

    // Partner 相关接口
    createPartner: baseURL + "/createPartner",
    listPartnerAll: baseURL + "/listPartnerAll",
    getPartnerByProjectID: baseURL + "/getPartnerByProjectID",

    // Leader 相关接口
    createLeader: baseURL + "/createLeader",
    getLeaderById: baseURL + "/getLeaderById",

    // QM 相关接口
    createQM: baseURL + "/createQM",
    getQMByProjectID: baseURL + "/getQMByProjectID",
    setQMContact: baseURL + "/setQMContact",
    listQMAll: baseURL + "/listQMAll",

    // Client 相关接口
    createClient: baseURL + "/createClient",
    updateClient: baseURL + "/updateClient",
    createClientContact: baseURL + "/createClientContact",
    getClientByProjectID: baseURL + "/getClientByProjectID",

    // Achievement 相关接口
    createAchievement: baseURL + "/createAchievement",
    deleteAchievement: baseURL + "/deleteAchievement",
    listAchievementByProject: baseURL + "/listAchievementByProject",
    listAchievementBySubtopic: baseURL + "/listAchievementBySubtopic",
};

export default api
