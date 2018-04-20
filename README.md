# feedback-platform
反馈平台 （技术栈： react、redux、react-router、typescript、ant.design、less、node、webpack）

反馈平台分为用户反馈平台以及管理员管理平台，后端使用node、mongodb，整体架构为两个项目，管理员管理平台为主服务器（数据库操作、请求处理），用户反馈平台为辅服务器，通过代理向主服务器请求。

后端采用MVC方式，前端采用react作为view。 
