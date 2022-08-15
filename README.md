### 开发踩坑
1. 写入ThunkAction后如果出现以下报错：

   (alias) delTodo(id: number): RootThunkAction import delTodo 类型“RootThunkAction”的参数不能赋给类型“AnyAction”的参数。 类型 "RootThunkAction" 中缺少属性 "type"，但类型 "AnyAction" 中需要该属性

   原因：react-redux版本高了

   解决办法：需要把react-redux版本降到@7版本

   yarn add react-redux@7
   ————————————————
   版权声明：本文为CSDN博主「Nikki_u」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
   原文链接：https://blog.csdn.net/nikki_u/article/details/125132995

2. 使用Toast组件 发现 报错 这是正常的
  react_devtools_backend.js:4026 Warning: ReactDOM.render is no longer supported in React 18. Use createRoot instead. Until you switch to the new API, your app will behave as if it's running React 17. Learn more: 