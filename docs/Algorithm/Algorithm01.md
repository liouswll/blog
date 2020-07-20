## 递归
- 递归，其实就是自己调用自己。
- 递归步骤：1. 寻找出口，递归一定有一个出口，锁定出口，保证不会死循环。2. 递归条件，符合递归条件，自己调用自己

## 斐波那契数列
1. 方法一： 递归实现
```
function fibonacci(n){
        if(n < 0) throw new Error('输入的数字不能小于0');
        if(n==1 || n==2){
            return 1;
        }else{
            return fibonacci1(n-1) + fibonacci1(n-2);
        }
    }

优点：代码比较简洁易懂；
缺点：当数字太大时，会变得特别慢，原因是在计算F(9)时需要计算F(8)和F(7)，但是在计算F(8)时要计算F(7)和F(6)，这里面就会重复计算F(7)，每次都重复计算会造成不必要的浪费，所以这种方法并不是很好。
```

2. 方法二： 使用闭包保存每次的递归值
```
function fibonacci(n){
        if(n < 0) throw new Error('输入的数字不能小于0');
        let arr = [0,1];//在外部函数中定义数组，内部函数给数组添加值
        function calc(n){
            if(n<2){
                return arr[n];
            }
            if(arr[n] != undefined){
                return arr[n];
            }
            let data = calc(n-1) + calc(n-2);//使用data将每次递归得到的值保存起来
            arr[n] = data;//将每次递归得到的值放到数组中保存
            return data;
        }
        return calc(n);
    }
```

3. 方法三： 直接使用数组实现（动态规划）
```
function fibonacci(n){
        var a = [0,1,1];
        if(n < 0) throw new Error('输入的数字不能小于0');
        if(n >= 3){
            for(var i=3;i<=n;i++){
                a[i] = a[i-1]+a[i-2];
            }
        }
        return a[n];
    }
```


