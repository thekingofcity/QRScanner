# 项目报告

QRScanner 是一款扫描二维码的安卓端实用工具，是使用Ionic+Cordova+Android Sutdio开发的混合应用(Hybrid APP)。

[TOC]

## 背景

* 混合应用(Hybrid APP)
  Hybrid App是介于Native App和Web App之间的一种应用开发方式
  ![三种应用开发方式比较](http://images2015.cnblogs.com/blog/977542/201606/977542-20160615145356995-91223952.png)

* 为什么要选择混合应用
  混合应用(Hybrid APP) 主要以JS+Native两者相互调用为主，从开发层面实现“一次开发，多处运行”的机制，成为真正适合跨平台的开发。Hybrid App兼具了Native App良好用户体验的优势，也兼具了Web App使用HTML5跨平台开发低成本的优势。
  目前已经有众多Hybrid App开发成功应用，比如美团、爱奇艺、微信、手机淘宝等知名移动应用，都是采用Hybrid App开发模式。

* 如何开发混合应用

  * Ionic
      Ionic一款开源的Html5移动App开发框架，主要关注外观和体验，以及和你的应用程序的 UI 交互，特别适合用于基于 Hybird 模式的 HTML5 移动应用程序开发，具有速度快，界面现代化、美观等特点。Ionic 是AngularJS移动端解决方案，利用Angular实现了很多符合移动端应用的组件，并搭建了很完善的样式库，是对Angular最成功的应用样例。

  * Cordova
      Apache Cordova提供用javascript访问移动平台的API。Cordova 是用于使用HTML，CSS和JS构建移动应用的平台。我们可以认为Cordova是一个容器，用于将我们的网络应用程序与本机移动功能连接。默认情况下，Web应用程序不能使用本机移动功能。这就是Cordova进来的地方。它为网络应用和移动设备之间的连接提供了桥梁。 通过使用cordova，我们可以使混合移动应用程序，可以使用摄像头，地理位置，文件系统和其他本地移动功能。

  * Android Sutdio
      Android Studio 是谷歌推出一个Android集成开发工具，基于IntelliJ IDEA。类似 Eclipse ADT，Android Studio 提供了集成的 Android 开发工具用于开发和调试。作为新一代的安卓开发IDE，Android Studio 相比 Esclipse 具有更好的官方支持，更方便地开发环境，更便捷的调试方法。相信能在不远的将来成为安卓开发的最佳选择。

  有了这三大利器，在不同移动平台上开发应用变得方便了许多，我们不需在意不同平台内同样功能的不同的实现，大大减少了对于某一特定平台才需要的workaround。在对性能没有苛刻要求的场景，混合应用是小规模开发成本下最好的开发选择。

  也正因为Ionic以流行的跨平台移动app开发框架Cordova为蓝本，他们的无缝结合让开发应用的体验变得前所未有的方便与简单。只需调用一行CLI命令，整个项目会被解析并编译成Android Sutdio项目，之后在Android Sutdio点击调试便可轻松调试。

## 环境搭建

  1. 用你喜欢的工具git或者解压缩整个项目到本地全英文目录

  2. 根据官方教程安装Ionic及配套环境 [official installation guide](https://ionicframework.com/docs/intro/installation/)

      1. 安装[Node.js](https://nodejs.org/)

      2. 安装Ionic ```npm install -g ionic cordova```

  3. 修改 ```node_modules\@zxing\library\esm5\core\Result.d.ts``` 中的 ```Result.text``` 和 ```Result.timestamp``` 到 ```public```

  4. 在根目录下执行 ```ionic cordova prepare android```

  5. 打开 Android Studio 并导入```platforms\android```下的项目

  6. 添加如下行至**build.gradle (Module: app)**的结尾来解决多版本冲突问题

      ```
          configurations.all {
          resolutionStrategy.eachDependency { DependencyResolveDetails details ->
              def requested = details.requested
              if (requested.group == 'com.android.support') {
              if (!requested.name.startsWith("multidex")) {
                  details.useVersion '25.4.0'
              }
              }
          }
          }
      ```

  7. 在```platforms\android\app\src\main\java\com\cordovaplugincamerapreview\CameraActivity.java```添加代码```mCamera.startPreview();```在行554后 后来解决的native插件```incamerapreview```的bug

  8. 现在就可以在Android Studio中运行程序了

## 实验流程

  1. 创建一个新的Ionic项目

      ```ionic start QRScanner tabs```

      ```QRScanner```是项目的名字，```tabs```是用三页面的模板来生成

  2. 添加[zxing二维码扫描库](https://github.com/zxing-js/library)

      zxing二维码扫描库是一个移植到typescript的版本，符合typescript的所需特性，能为我们的项目所用。

      1. 安装

          ```npm i @zxing/library --save```

      2. 添加引用

          在```contacts```Tab中添加```import { BrowserQRCodeReader, VideoInputDevice } from '@zxing/library';```引用

      3. 在页面上显示时时扫描窗口

          在html页面上添加```<video id="video" width="100%" height="100%"></video>```

      4. 最后在Tab的代码中定义开启相机和扫描到后的执行函数就可以了
          注意函数需要添加在```ionViewWillEnter```内，因为这样我们就可以在进入页面的时候开启相机和添加回调函数，如果我们直接省力添加在默认的构造函数中的话，那么当之后再切换回页面时，代码不能正确被执行。
          同理，如果需要离开页面时关闭摄像头的话，就需要在```ionViewWillLeave```中添加库提供的关闭摄像头代码。

          > ionViewWillEnter和ionViewWillLeave为Ionic框架所提供的7种生命周期事件的两种，它们分别会在页面生命周期的各个阶段被触发。

          具体代码详见```src\pages\contact\contact.ts```的20-53行

  3. 添加储存库

      我们需要实现将扫描到的内容保存在本地，供以后查询和调用。Ionic框架提供了Storge库，它会根据当前环境确定最合适的底层实现方法，包括了SQLite,localstorage,IndexedDB合WebSQL等。

      1. 安装

          ```bash
          ionic cordova plugin add cordova-sqlite-storage
          npm install --save @ionic/storage
          ```

      2. 调用

          注入```NgModule```中，代码详见```src\app\app.module.ts```32行

          在需要的页面中```import { Storage } from '@ionic/storage';```并在构造函数中添加引用```constructor(private storage: Storage) { }```

      3. 使用

          在```ionViewWillEnter```内添加初始化读取的代码

          ```typescript
          this.storage.get('results').then((val) => {
            if (val) {
              this.results = val
            } else {
              this.results = new Array<Result>();
            }
          })
          ```

          扫描到内容时将新内容push到数组内

          ```typescript
          this.results.push(result)
          this.storage.set('results', this.results)
          ```

  4. 添加历史界面

      当用户扫描出一个二维码后，工具会自动切换到历史界面，这里显示了所有扫描到的内容。

      * 当用户点击列表中的某一项，会显示复制/在浏览器中打开和扫描的日期，帮助用户更好的管理列表。

      * 用户还应能删除所有历史记录，帮助用户更好的保护隐私。

      ![点击网页链接的情况](https://wx3.sinaimg.cn/mw690/a0487556ly1fyfmtcet6qj20u01o0whm.jpg)
      > 点击网页链接的情况

      ![点击文字的情况](https://wx2.sinaimg.cn/mw690/a0487556ly1fyfmtcejy5j20u01o0dj9.jpg)
      > 点击文字的情况

      1. 读取本地储存

          读取和之前添加一个新扫描条目类似，在此不再重复。重点在如何在页面上显示读取到的内容，得益于Ionic/angularJS的双向数据绑定，我们只需在模板中添加需要显示的数据就可以了，框架还有非常好用的列表功能，无需我们手动实现循环显示数组内容。具体操作为在html模板中添加如下片段。

          ```html
          <ion-list>
            <button ion-item *ngFor="let result of results" (click)="presentPopover($event, result)">
              {{ result.text }}
            </button>
          </ion-list>
          ```

      2. 点击列表中的某一项弹出操作框

          这一块基本就是复刻官方demo中的内容，注意官方文档中的内容非常简单，需要仔细理解github的源码才可正确实现。

          [官方例程](https://ionicframework.com/docs/components/#popovers)

          [No component factory found for PopoverPage](https://forum.ionicframework.com/t/ionviewpreload-error-no-component-factory-found/73015)

          [Component is not part of any NgModule or the module has not been imported into your module](https://stackoverflow.com/questions/44827999/component-is-not-part-of-any-ngmodule-or-the-module-has-not-been-imported-into-y)

          这里给出PopoverPage类的部分代码。注意到html模板直接内嵌在代码中，是因为内容较少，无需另建模板文件

          ```typescript
          @Component({
            template: `
              <ion-list>
                <ion-list-header>Options</ion-list-header>
                <button ion-item *ngIf="link" (click)="openInBrowser()">Open in browser</button>
                <button ion-item *ngIf="!link" (click)="copy()">Copy it</button>
                <button ion-item (click)="close()">{{ result.timestamp }}</button>
              </ion-list>
            `
          })
          export class PopoverPage {
            result: Result
            link: boolean
            constructor(public viewCtrl: ViewController, private navParams: NavParams,
              private iab: InAppBrowser, private clipboard: Clipboard,
              private toast: Toast) { }

            close() {
              this.viewCtrl.dismiss();
            }

            ngOnInit() {
              if (this.navParams.data) {
                this.result = this.navParams.data;

                let newDate: Date = new Date();
                newDate.setTime(this.result.timestamp);
                // Wed Jun 18 2014 
                this.result.timestamp = newDate.toDateString()

                this.link = this.result.text.indexOf('http') == 0 ? true : false;
              }
            }

            ...
          }
          ```

          以及Histroy页面的调用代码
          ```typescript
          presentPopover(myEvent, result) {
            let popover = this.popoverCtrl.create(PopoverPage, result);
            popover.present({
              ev: myEvent
            });
          }
          ```

      3. 复制文字内容并显示Toast

          如果用户点击的项目为文字，那么当用户点击复制时，最下方会提示已复制内容

          ![提示已复制内容](https://wx1.sinaimg.cn/mw690/a0487556ly1fyfmxah9byj20u01o041x.jpg)

          > 注意最下方的提示

          这里只需要调用插件```Clipboard```和```Toast```即可，之前已有调用示例，不再重复。

          注意框架提供的```ToastController```部件不能正确显示，会造成假死，调用原生插件Toast即可解决。

          ```typescript
          copy() {
            this.clipboard.copy(this.result.text);
            // const toast = this.toastCtrl.create({
            //   message: 'Copied to clipboard',
            //   duration: 3000
            // });
            // toast.present();
            this.toast.show(`Copied to clipboard`, '3000', 'bottom').subscribe(
              toast => {
                console.log(toast);
              }
            );
            this.viewCtrl.dismiss();
          }
          ```

      4. 清空历史纪录

        这里也是简单的调用框架部件，再调用储存控件清空即可。

        ![删除历史纪录预览](https://wx4.sinaimg.cn/mw690/a0487556ly1fyfmxvob08j20u01o042q.jpg)

        > 删除历史纪录预览

        ```typescript
        clearHistory() {
          const confirm = this.alertCtrl.create({
            title: 'Clear the history?',
            message: 'Do you really want to clear all the history?',
            buttons: [
              {
                text: 'Nope',
                handler: () => {
                  console.log('Nope clicked');
                }
              },
              {
                text: 'Sure',
                handler: () => {
                  this.storage.set('results', null)
                  this.results = null
                  console.log('Sure clicked');
                }
              }
            ]
          });
          confirm.present();
        }
        ```

        当没有历史记录时，工具会提示去随便扫描什么吧。这里用到了Ionic框架的特性，根据变量来决定元素的显示与否，大大的方便了开发，无需手动操作DOM。

        ![提示随便扫描什么](https://wx2.sinaimg.cn/mw690/a0487556ly1fyfnkgvxfuj20u01o0gn2.jpg)

        ```html
        <p *ngIf="!results">Nothing in here!</p>
        <p *ngIf="!results">Try scan something!</p>
        ```

  5. 关于界面

      这里只是简单的显示了项目地址。

      ![关于界面](https://wx1.sinaimg.cn/mw690/a0487556ly1fyfnkgw61kj20u01o0abd.jpg)

## 遇到的问题

* [忘记在全局注入第三方库provider](https://stackoverflow.com/questions/46048904/no-provider-for-camera-injectionerror)

  Ionic/AngualrJS需要在项目初始化阶段注入所有需要用到的库。

* [Chrome远程调试](https://medium.com/@coderonfleek/debugging-an-ionic-android-app-using-chrome-dev-tools-6e139b79e8d2)

  因为应用内部启动了浏览器，所以可以用桌面端的Chrome开发者工具远程调试，大大方便了调试出错的问题。
  这次遇到的问题就是Ionic/AngularJS的回调函数定义域与初始不同，解决方法为=>即可，这样外层的this会在函数异步返回时赋值给内部this。

* [第三方库定义的android sdk版本和项目不一致](https://forum.ionicframework.com/t/manifest-merger-failed-attribute-meta-data-android-support-version-value-value-26-1-0-from-com-android-support-support-v13-26-1-0-androidmanifest-xml-28-13-35/113022/2)

  在gradle中定义使用的版本即可。官方论坛给出的方法实践后也也没用，因为是第三方库定义的，在/platforms/android/project.properties直接修改是没用的。

* [参照的教程是ionic 2的，3已经换调用库的方式了](https://stackoverflow.com/questions/43583032/cannot-find-module-ionic-native)

* [java中相机要先startpreview才能takepicture](https://stackoverflow.com/questions/21723557/java-lang-runtimeexception-takepicture-failed)

* [第三方库camera-preview的readme，算是很有帮助，但是跑通也费了不少功夫](https://ionicframework.com/docs/native/camera-preview/)

* [页面跳转与参数传递](https://blog.csdn.net/gent__chen/article/details/78690877)

* [异步加载数据后刷新页面](https://blog.csdn.net/u010564430/article/details/55214010)

  通过IonView*生命周期事件解决，没有用此方法。

* [默认cordova插件inappbrowser不显示，改成this.iab.create(url, "_system");](https://www.techiediaries.com/inappbrowser-ionic-v3/)

## 结语

使用Ionic+Cordova+Android Sutdio开发的混合应用具有以下的特点：

* 开发时可能不采用或者大部分不采用原生语言，但是却有所有原生应用的特性；
* 架构方案会和原生有出入，基本由工具而定；
* 具有跨平台特性；
* 一般开发相对原生开发的方式要简单。

本项目通过将大部分功能转为前端来实现，绕过了大部分涉及到底层/Java的部分，为界面/业务开发提供了另一种选择。即无需考虑Native的实现，也可以用现有的网页端逻辑直接同步至移动端，同时享受了一份代码，Web/Android/IOS多处运用。在使用了CodePush功能后，还可热更新程序，无需提交商店审核，大大加快软件的迭代，同时还享受了独立应用在应用商店可以上架，调用原生API（如通知，摄像头，加速器等）的好处，真正实现了**一次开发，多处运行**。
