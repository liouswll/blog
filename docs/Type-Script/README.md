## TypeScript

## TypeScript简单示例
```
npm install -g typescript

function getter(person: string){
    return 'hello' + person;
}
let user = "z"
document.body.innerHTML = getter(user);

编译：
tsc getter.js
```