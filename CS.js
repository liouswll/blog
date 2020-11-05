// 深克隆数组
// function deepClone(target){
//     if(target instanceof Object){
//         let dist ;
//         if(target instanceof Array){
//           // 如果是数组，就创建一个[]
//           dist = []
//         }else{
//           dist = {};
//         }
//         for(let key in target){
//             dist[key] = deepClone(target[key]);
//         }
//         return dist;
//     }else{
//         return target;
//     }
//   }
//   const a = [[11,12],[21,22]];
//   const a2 = deepClone(a);
//   console.log('........:',a2); //{ '0': { '0': 11, '1': 12 }, '1': { '0': 21, '1': 22 } }
// ————————————————————————————————————————————————————————————————————————————————————————————————————

// call 改变this
// function Animal(name){      
//     this.name = name;      
//     this.showName = function(){      
//         console.log(this.name);      
//     }      
// }      
// function Cat(name){    
//     Animal.call(this, name);    
// }      
// var cat = new Cat("Black Cat");     
// cat.showName();
// —————————————————————————————————————————————————————————————————————————————————————————————————————

// 深克隆正则
function deepClone(target){
    if(target instanceof Object){
        let dist ;
        if(target instanceof Array){
          // 拷贝数组
          dist = [];
        }else if(target instanceof Function){
          // 拷贝函数
          dist = function () {
            return target.call(this, ...arguments);
          };
        }else if(target instanceof RegExp){
          // 拷贝正则表达式
         dist = new RegExp(target.source,target.flags);
        }else{
          // 拷贝普通对象
          dist = {};
        }
        for(let key in target){
            dist[key] = deepClone(target[key]);
        }
        return dist;
    }else{
        return target;
    }
  }
const a = /hi\d/ig;
console.log(a.source);   //   hi\d
console.log(a.flags)    // ig
const b = deepClone(a);
console.log(b)
// —————————————————————————————————————————————————————————————————————————————————————————————————————
