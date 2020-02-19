# Learning notes of Week 6

## 2.19 Wed.

+ [**单例（Singleton）**](<https://github.com/CyC2018/CS-Notes/blob/master/notes/%E8%AE%BE%E8%AE%A1%E6%A8%A1%E5%BC%8F%20%20-%20%E5%8D%95%E4%BE%8B.md>)：私有构造函数，私有静态变量，公有静态函数

+ [**简单工厂（Simple Factory）**](<https://github.com/CyC2018/CS-Notes/blob/master/notes/%E8%AE%BE%E8%AE%A1%E6%A8%A1%E5%BC%8F%20-%20%E7%AE%80%E5%8D%95%E5%B7%A5%E5%8E%82.md>)：把实例化的操作放到单独的类中，让这个类来决定如何实例化（例如用哪个子类）

+ [**工厂方法（Factory Method）**](<https://github.com/CyC2018/CS-Notes/blob/master/notes/%E8%AE%BE%E8%AE%A1%E6%A8%A1%E5%BC%8F%20-%20%E5%B7%A5%E5%8E%82%E6%96%B9%E6%B3%95.md>)：在简单工厂中，创建对象的是另一个类，而在工厂方法中，是由子类来创建对象。

+ [**抽象工厂（Abstract Factory）**](<https://github.com/CyC2018/CS-Notes/blob/master/notes/%E8%AE%BE%E8%AE%A1%E6%A8%A1%E5%BC%8F%20-%20%E6%8A%BD%E8%B1%A1%E5%B7%A5%E5%8E%82.md>)：抽象工厂模式创建的是对象家族，也就是很多对象而不是一个对象，并且这些对象是相关的，也就是说必须一起创建出来。而工厂方法模式只是用于创建一个对象。

  可以这么理解以上三者的关系：简单工厂只有一个工厂类，用户类需要**传一个参数**进去告诉工厂类如何实例化；工厂方法有许多工厂子类，用户类调用**不同子类**的方法来进行不同的实例化；抽象工厂不仅有许多工厂子类，每个子类还有许多工厂方法，调用不同子类的**不同方法**，可以实例化不同的对象：

  ```java
  // 简单工厂
  SimpleFactory simpleFactory = new SimpleFactory();
  Product product = simpleFactory.createProduct(1);
  
  // 工厂方法
  ConcreteFactory concreteFactory = new ConcreteFactory1();
  ConcreteProduct product = concreteFactory.createProduct();
  
  // 抽象工厂
  AbstractFactory abstractFactory = new ConcreteFactory1();
  AbstractProductA productA = abstractFactory.createProductA();
  AbstractProductB productB = abstractFactory.createProductB();
  ```

+ [**生成器（Builder）**](<https://github.com/CyC2018/CS-Notes/blob/master/notes/%E8%AE%BE%E8%AE%A1%E6%A8%A1%E5%BC%8F%20-%20%E7%94%9F%E6%88%90%E5%99%A8.md>)：封装一个对象的构造过程。即想要构造一个对象的时候，不再是直接 new，而是调一个函数。

+ [**原型模式（Prototype）**](<https://github.com/CyC2018/CS-Notes/blob/master/notes/%E8%AE%BE%E8%AE%A1%E6%A8%A1%E5%BC%8F%20-%20%E5%8E%9F%E5%9E%8B%E6%A8%A1%E5%BC%8F.md>)：通过复制原型来构造新对象。

+ [**责任链（Chain Of Responsibility）**](<https://github.com/CyC2018/CS-Notes/blob/master/notes/%E8%AE%BE%E8%AE%A1%E6%A8%A1%E5%BC%8F%20-%20%E8%B4%A3%E4%BB%BB%E9%93%BE.md>)：将多个 Request Handler 组织成链的形式，request 在链上传递，而不是使用类似 switch 语句那样直接发给对应的 handler，好处在于新加一个 handler 直接加在链的最后就行了，改动的代码很少。

+ [**命令（Command）**](<https://github.com/CyC2018/CS-Notes/blob/master/notes/%E8%AE%BE%E8%AE%A1%E6%A8%A1%E5%BC%8F%20-%20%E5%91%BD%E4%BB%A4.md>)：在调用某个对象的方法时，不直接调用，而是调用一个 Command 类的 execute 方法，相当于包了一层，好处在于用户发出的命令（即调用对象的方法）被统一成了 Command 类的方法。

+ [**解释器（Interpreter）**](<https://github.com/CyC2018/CS-Notes/blob/master/notes/%E8%AE%BE%E8%AE%A1%E6%A8%A1%E5%BC%8F%20-%20%E8%A7%A3%E9%87%8A%E5%99%A8.md>)：有点像 compiler

+ [**迭代器（Iterator）**](<https://github.com/CyC2018/CS-Notes/blob/master/notes/%E8%AE%BE%E8%AE%A1%E6%A8%A1%E5%BC%8F%20-%20%E8%BF%AD%E4%BB%A3%E5%99%A8.md>)：字面意思，iterator，提供一种顺序访问聚合对象的元素的方法，并且不暴露聚合对象的内部表示。

+ [**中介者（Mediator）**](<https://github.com/CyC2018/CS-Notes/blob/master/notes/%E8%AE%BE%E8%AE%A1%E6%A8%A1%E5%BC%8F%20-%20%E4%B8%AD%E4%BB%8B%E8%80%85.md>)：将相关对象之间复杂的依赖关系变成星系结构，有点像消息队列

+ [**备忘录（Memento）**](<https://github.com/CyC2018/CS-Notes/blob/master/notes/%E8%AE%BE%E8%AE%A1%E6%A8%A1%E5%BC%8F%20-%20%E5%A4%87%E5%BF%98%E5%BD%95.md>)：如果某个类应支持备忘录的功能，需要加上 backup 和 restore 两个方法。

+ [**观察者（Observer）**](<https://github.com/CyC2018/CS-Notes/blob/master/notes/%E8%AE%BE%E8%AE%A1%E6%A8%A1%E5%BC%8F%20-%20%E8%A7%82%E5%AF%9F%E8%80%85.md>)：Observers 订阅 Subject，每当 Subject 更新时，notify 所有订阅了该 Subject 的 Observers

+ [**状态（State）**](<https://github.com/CyC2018/CS-Notes/blob/master/notes/%E8%AE%BE%E8%AE%A1%E6%A8%A1%E5%BC%8F%20-%20%E7%8A%B6%E6%80%81.md>)：允许对象在内部状态改变时改变他的行为，有点像状态机。某个类可以持有许多状态类，以及一个当前状态指向某一状态类，这些状态类实现同一个接口，这样当前状态的变化就会带来当前状态对象的方法有不同表现。

+ [**策略（Strategy）**](<https://github.com/CyC2018/CS-Notes/blob/master/notes/%E8%AE%BE%E8%AE%A1%E6%A8%A1%E5%BC%8F%20-%20%E7%AD%96%E7%95%A5.md>)：和状态类似，也是允许对象改变自己的行为，但是感觉上有点像状态的子集。因为策略设计模式中，各个状态都是地位对等的策略，改变状态是通过 set 方法直接改变；而状态设计模式中，状态是真正的表示不同的状态，对于不同状态而言，相同的方法可能导致变到不同的状态（状态机）

+ [**模板方法（Template Method）**](<https://github.com/CyC2018/CS-Notes/blob/master/notes/%E8%AE%BE%E8%AE%A1%E6%A8%A1%E5%BC%8F%20-%20%E6%A8%A1%E6%9D%BF%E6%96%B9%E6%B3%95.md>)：定义算法框架，并将一些步骤的实现延迟到子类。

+ [**访问者（Visitor）**](<https://github.com/CyC2018/CS-Notes/blob/master/notes/%E8%AE%BE%E8%AE%A1%E6%A8%A1%E5%BC%8F%20-%20%E8%AE%BF%E9%97%AE%E8%80%85.md>)：为一个包含许多对象的复杂结构提供新功能，大致思路是从这个复杂结构的根开始，为所有对象定义 accept 方法，以及它们之间的调用关系，这样用户只需要在复杂结构的根对象上调用 accept 方法，就可以将该结构中每个对象的 accept 方法都调用一遍，而 accept 方法的实现中，就可以加上新功能。

+ [**空对象（Null）**](<https://github.com/CyC2018/CS-Notes/blob/master/notes/%E8%AE%BE%E8%AE%A1%E6%A8%A1%E5%BC%8F%20-%20%E7%A9%BA%E5%AF%B9%E8%B1%A1.md>)：当返回值为某个对象的函数有可能返回 null 时，改为返回一个空对象（与其他可能的返回对象继承自同一类），这样即使不做检查也不会出现空指针异常。

+ [**适配器（Adapter）**](<https://github.com/CyC2018/CS-Notes/blob/master/notes/%E8%AE%BE%E8%AE%A1%E6%A8%A1%E5%BC%8F%20-%20%E9%80%82%E9%85%8D%E5%99%A8.md>)：把一个类接口转换成另一个用户需要的接口。

+ [**桥接（Bridge）**](<https://github.com/CyC2018/CS-Notes/blob/master/notes/%E8%AE%BE%E8%AE%A1%E6%A8%A1%E5%BC%8F%20-%20%E6%A1%A5%E6%8E%A5.md>)：如果两个类有关联，并且它们又有许多子类，桥接模式可以将 a*b 的类的数量变为 a+b，本质是将一个类拆成两个可以独立变化的类。

+ [**组合（Composite）**](<https://github.com/CyC2018/CS-Notes/blob/master/notes/%E8%AE%BE%E8%AE%A1%E6%A8%A1%E5%BC%8F%20-%20%E7%BB%84%E5%90%88.md>)：允许用户以相同的方式处理单独对象和组合对象，类比目录结构。

+ [**装饰器（Decorator）**](<https://github.com/CyC2018/CS-Notes/blob/master/notes/%E8%AE%BE%E8%AE%A1%E6%A8%A1%E5%BC%8F%20-%20%E8%A3%85%E9%A5%B0.md>)：装饰器和被装饰的对象继承自同一类，可以理解成装饰器模式运用了每个组合对象只包含一个对象的组合模式。（开放封闭原则）

+ [**外观（Facade）**](<https://github.com/CyC2018/CS-Notes/blob/master/notes/%E8%AE%BE%E8%AE%A1%E6%A8%A1%E5%BC%8F%20-%20%E5%A4%96%E8%A7%82.md>)：提供一个统一的接口，用来访问子系统中的一群接口，从而让子系统更容易使用。（最少知识原则）

+ [**享元（Flyweight）**](<https://github.com/CyC2018/CS-Notes/blob/master/notes/%E8%AE%BE%E8%AE%A1%E6%A8%A1%E5%BC%8F%20-%20%E4%BA%AB%E5%85%83.md>)：利用共享的方式来支持大量细粒度的对象，这些对象一部分内部状态是相同的。类比单例模式。

+ [**代理（Proxy）**](<https://github.com/CyC2018/CS-Notes/blob/master/notes/%E8%AE%BE%E8%AE%A1%E6%A8%A1%E5%BC%8F%20-%20%E4%BB%A3%E7%90%86.md>)：控制对其他对象的访问，将被代理的对象的方法包了一层，和命令模式不同的是，命令模式的主要目的是将对象的方法统一成 Command 类的方法，而代理模式更多地是在调用被代理对象的方法前做一些处理。尽管两者都会持有子对象。

##### Last-modified date: 2020.2.19, 6 p.m.