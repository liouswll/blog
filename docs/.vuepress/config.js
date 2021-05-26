module.exports = {
  title: 'lious的博客',
  description: '前端开发空间站',
  base: "/Blog/",
  themeConfig: {
    nav: [{
        text: "主页",
        link: "/"
      },
      {
        text: "JavaScript",
        link: "/JavaScript/"
      },
      {
        text: "ES6",
        link: "/es6/"
      },
      {
        text: "Vue",
        link: "/Vue/"
      },
      {
        text: "React",
        link: "/React/"
      },
      // { text: "Flutter", link: "/flutter/"},
      {
        text: "Webpack",
        link: "/Webpack/"
      },
      {
        text: "Git",
        link: "/git/"
      },
      {
        text: "Websocket",
        link: "/Websocket/"
      },
      {
        text: "HTTP",
        link: "/Http/"
      },
      // { text: "前端难点集中", 
      // items: [ 
      //   { text: "html", link:"/web/html/"},
      //   { text: "css", link:"/web/css/"},
      //   ]
      // },
      {
        text: "前端难点集中",
        link: "/Difficulties/"
      },
      {
        text: "前端算法",
        link: "/Algorithm/"
      },

      {
        text: "Node",
        link: "/Node/"
      },

      {
        text: "PLAN",
        link: "/Plan/"
      },
      {
        text: "Type-Script",
        link: "/Type-Script/"
      },
      {
        text: "GU",
        link: "/Gu/"
      },
    ],
    sidebar: {
      "/JavaScript/": [
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
            ["object/objects", "对象"],
            ["object/dataType", "数据类型和内存分析"],
            ["object/builtInObjects", "内置对象"],
            ["object/globalObjects", "全局对象"],
          ]
        },



        {
          title: "面向对象",
          name: "面向对象",
          collabsable: false,
          children: [
            ["orientedObjects/orientedObjects", "创建对象模式"],
            ["orientedObjects/inheritance", "继承"],
          ]
        },


        ["DOM", "DOM"],
        ["BOM", "BOM"],
        ["Reg", "Reg"],
        ["JSDesignMode", "JS设计模式"],
      ],



      "/Es6/": [
        ["", "Es6"]
      ],

      "/Algorithm/": [
        ["", "排序"],
        ["Algorithm01", "递归"],
        ["Algorithm02", "二叉树和二叉查找树"],
        ["Algorithm03", "数组结构介绍"],
      ],

      "/Git/": [
        ["", "Git"]
      ],

      "/Websocket/": [
        ["", "Websocket"]
      ],
      "/React/": [
        ["", "基础概念"],
        ["LifeCycle", "生命周期"],
        ["Router", "路由"],
        ["Redux", "Redux"],
        ["Guidance", "高级指引"],
        ["Hook", "HooK"],
      ],

      "/Vue/": [
        ["", "基础概念"],
        ["AllLife", "生命周期"],
        ["Router", "路由"],
        ["Vue3", "Vue3"],
        ["vueX", "vueX"],
      ],

      "/Webpack/": [
        ["", "概念"]
      ],

      "/Http/": [
        ["", "Http"]
      ],

      "/Difficulties/": [
        ["", "JS注意点-难点"],
        ["Vue", "Vue注意点-难点"],
        ["React", "React注意点-难点"],
        ["nolo", "nolo"]
      ],

      "/Node/": [
        ["", "Node"]
      ],

      "/Type-Script/": [
        ["", "TypeScript"]
      ],

      "/Plan/": [
        ["", "计划"],
      ],

      "/Gu/": [
        ["", "粗略知识图"],
        ["Knowledge", "知识点"],
      ]
    }
  },
}