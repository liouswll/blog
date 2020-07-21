## 二叉树和二叉查找树
## 二叉树和二叉查找树
## 树的基本概念
- 一棵树最上面的几点称为根节点，如果一个节点下面连接多个节点，那么该节点成为父节点，它下面的节点称为子节点，一个节点可以有0个、1个或更多节点，没有子节点的节点叫叶子节点。
![erchashu](../.vuepress/public/erchashu.png)

## 二叉树
- 一种特殊的树，即子节点最多只有两个，这个限制可以使得写出高效的插入、删除、和查找数据。在二叉树中，子节点分别叫左节点和右节点。
![erchashuu](../.vuepress/public/erchashuu.png)

## 二叉查找树
- 二叉查找树是一种特殊的二叉树，相对较小的值保存在左节点中，较大的值保存在右节点中，这一特性使得查找的效率很高，对于数值型和非数值型数据，比如字母和字符串，都是如此。现在通过JS实现一个二叉查找树。

## 定义节点（实现）
```
function Node(data,left,right) {
    this.left = left;
    this.right = right;
    this.data = data;
    this.show = () => {return this.data}
}
```
## 二叉树（实现）
```
function BST() {
    this.root = null //初始化,root为null
}
```