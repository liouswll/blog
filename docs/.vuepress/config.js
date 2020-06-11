module.exports = {
  title: 'lious的博客',
  description: '前端开发空间站',
  base: "/Blog/",
  themeConfig:{
    nav: [{text: "主页", link: "/"      },
        { text: "JavaScript", link: "/JavaScript/" },
        { text: "Vue", link: "/vue/"},
        { text: "React", link: "/react/"},
        { text: "Flutter", link: "/flutter/"},
        { text: "WebPack", link: "/webpack/"},
        { text: "Git", link: "/git/"},
        { text: "面试问题", link: "/interview/" },
        { text: "前端难点集中", 
        items: [ 
          { text: "html", link:"/web/html/"},
          { text: "css", link:"/web/css/"},
          ]
        },
      ],
    sidebar:{
      "/JavaScript/":[
        ["", "JavaScript目录"],
        {
          title: "基础API",
          name: "基础API",
          collabsable: false,
          children: [
            ["jsAPI/grammarStatements", "语法语句"],
            ['jsAPI/type', "类型"]
          ]
        },
        ["function", "函数"],
        ["form", "表单"]
      ],
    }
  },
}