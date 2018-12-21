# Iconic + Cordova + AS

## How to compile it

  1. clone the git

  2. install through [official installation guide](https://ionicframework.com/docs/intro/installation/)

  3. run ```ionic cordova prepare android``` in root directory

  4. open Android Studio and import project at ```..\platforms\android```

  5. add

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

  at the end of **build.gradle (Module: app)** in Android Studio to resolve multiple version prompt

  6. Add ```mCamera.startPreview();``` after line:554 at ```..\platforms\android\app\src\main\java\com\cordovaplugincamerapreview\CameraActivity.java``` to resolve native camera plugin bug

  7. change ```Result.text``` and ```Result.timestamp``` to ```public``` at  ```..\node_modules\@zxing\library\esm5\core\Result.d.ts```

  8. run

## Remark/备注

深坑 我已经被弄到不知道说什么好了 太多坑了

记一下用到的连接

* [参照的入门教程](https://code.tutsplus.com/tutorials/how-to-create-a-camera-app-with-ionic-2--cms-28205)

* [忘记在全局注入第三方库provider](https://stackoverflow.com/questions/46048904/no-provider-for-camera-injectionerror)

* [要不是Chrome远程调试，我就在回调函数不在框架内这去年遇到的深坑中一蹶不起了，Chrome大法好](https://medium.com/@coderonfleek/debugging-an-ionic-android-app-using-chrome-dev-tools-6e139b79e8d2)

* [第三方库定义的android sdk版本和项目不一致，在gradle中定义使用的版本即可。要不是搜到ionic相关的帖子我早就搞定了233，官方论坛说的也没用，因为是第三方库定义的，在/platforms/android/project.properties修改没用](https://forum.ionicframework.com/t/manifest-merger-failed-attribute-meta-data-android-support-version-value-value-26-1-0-from-com-android-support-support-v13-26-1-0-androidmanifest-xml-28-13-35/113022/2)

* [参照的教程是ionic 2的，3已经换调用库的方式了](https://stackoverflow.com/questions/43583032/cannot-find-module-ionic-native)

* [java中相机要先startpreview才能takepicture，改是改过了，也不知道和这个到底有没有关系](https://stackoverflow.com/questions/21723557/java-lang-runtimeexception-takepicture-failed)

* [第三方库的readme，算是很有帮助，但是跑通也费了不少功夫](https://ionicframework.com/docs/native/camera-preview/)

* [环境配置教程](https://www.jianshu.com/p/f301567378c5)

* [页面跳转与参数传递](https://blog.csdn.net/gent__chen/article/details/78690877)

* [异步加载数据后刷新页面](https://blog.csdn.net/u010564430/article/details/55214010)

* 弹出页面 直接根据官方教程根本没法复现，点开源代码才知道加了好多别的，以及app.moudle.ts也有不少

    [官方例程](https://ionicframework.com/docs/components/#popovers)

    [No component factory found for PopoverPage](https://forum.ionicframework.com/t/ionviewpreload-error-no-component-factory-found/73015)

    [Component is not part of any NgModule or the module has not been imported into your module](https://stackoverflow.com/questions/44827999/component-is-not-part-of-any-ngmodule-or-the-module-has-not-been-imported-into-y)

* [默认cordova插件inappbrowser不显示，改成this.iab.create(url, "_system");](https://www.techiediaries.com/inappbrowser-ionic-v3/)

* 官方自带的toast controller有毒，需要用native下的toast
