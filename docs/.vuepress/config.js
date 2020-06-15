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
        {
          text: "前端算法", link: "/Algorithm/"
        }
      ],
    sidebar:{
      "/JavaScript/":[
        ["", "JavaScript"],
        {
          title: "基本知识",
          name: "基本知识",
          collabsable: false,
          children: [
            ["jsAPI/grammarStatements", "输出语句or流程控制语句"],
            ["jsAPI/grammar", "语法or运算符（赋值）"],
            ['jsAPI/type', "类型"]
          ]
        },
        
        
        // {
        //   title: "函数",
        //   name: "函数",
        //   collabsable: false,
        //   children: [
        //     ["function/function", "函数"],
        //   ]
        // }
        ["function", "函数"],
        ["form", "表单"],
        {
          title: "对象",
          name: "对象",
          collabsable: false,
          children: [
            ["object/builtInObjects", "内置对象"],
          ]
        }
      ],

      "/Algorithm/":[
        ["", "Algorithm"],
        ["Algorithm01", "链表"],

      ],
    }
  },
}