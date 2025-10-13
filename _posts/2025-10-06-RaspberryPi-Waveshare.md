---
layout: post
author: Shao Zelian
title: RaspberryPi Zero 2w + Waveshare 4.26inch HAT
excerpt: 初次体验使用树莓派电脑和电子墨水屏搭建小应用。
category: Smart-Device
---

## 1. 硬件准备

| 设备名称                                                                    | 数量 | 价格（大致） | 购买渠道 | 图片                                                                                                                                                                                                                          |
| --------------------------------------------------------------------------- | ---- | ------------ | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| RaspberryPi Zero 2w（带焊接排针）<br/>32G MicroSD 卡+读卡器<br/>HDMI 转换头 | 套餐 | 150.00 元    | 咸鱼     | <img src="/assets/images/blog/raspberrypi-zero-2w.png" height="50px"/>&nbsp;<img src="/assets/images/blog/rasperberrypi-accessories.png" height="50px"/>&nbsp;<img src="/assets/images/blog/microsd-card.png" height="50px"/> |
| Waveshare e-Paper 4.26inch HAT（带驱动板）                                  | \* 1 | 180.00 元    | 淘宝     | <img src="/assets/images/blog/waveshare-epaper1.avif" height="50px"/>&nbsp;<img src="/assets/images/blog/waveshare-epaper2.avif" height="50px"/>                                                                              |
| Micro-USB 充电线                                                            | \* 1 | 0.00 元      | 自备     | <img src="/assets/images/blog/usb-microusb.png" height="50px"/>                                                                                                                                                               |

其它说明：

- 由于本人没有电路板焊接经验，所以直接购买了带焊接排针的树莓派电脑，正好可以跟电子墨水屏的驱动板通过排针直接连接。动手能力强的可以自己焊接排针，也可以选择其它的屏幕和连接方式。
- 树莓派 Zero 2w 支持 WIFI 和蓝牙连接，可以通过远程 SSH 连接操作，但如果想直接使用树莓派操作系统，可以通过 HDMI 转接头连接电脑显示器。
- 树莓派 Zero 2w 自带四个外设接口：Micro-usb 电源接口、Micro-usb OTG 接口（可以连接鼠标键盘等）、Mini HDMI 接口和 MicroSD 存储卡插槽。如需要连接更多外部设备，如鼠标键盘网线等，可以单独购买扩展板。

## 2. 树莓派刷机

可以分为两个步骤：烧录操作系统镜像和启动配置树莓派电脑

### 2.1 烧录树莓派操作系统（此次借助 Windows PC）

- 首先在树莓派官网下载最新的[Raspberry Pi Imager](https://www.raspberrypi.com/software/)
- 在 PC 中安装 Raspberry Pi Imager
- 将 MicroSD 存储卡插入读卡器，并连接 PC
- 运行 Raspberry PI Imager 打开烧录 Image 向导
- 根据向导选择需要烧录的操作系统版本，此次我选择 Raspberry Pi OS (64bit)
- 由于步骤比较简单，细节不再赘述。但其中自定义设置步骤比较关键，在询问是否自定义设置时，可以选择“编辑设置”进行一些重要的参数设置，特别是用户名密码和 WIFI 热点连接。设置好后，后面启动树莓派电脑时可以自动联网并可以通过工具远程操作树莓派电脑。当然也可以跳过自定义设置，但在后面启动树莓派电脑时必须借助鼠标和键盘进行设置。<br/>
  <img src="/assets/images/blog/raspberry-pi-imager1.png" width="300px" />&nbsp;<img src="/assets/images/blog/raspberry-pi-imager2.png" width="300px"/>&nbsp;<img src="/assets/images/blog/raspberry-pi-imager3.png" width="300px"/>
- 等待一段时间树莓派操作系统被成功烧录到存储卡中，可以断开 PC 连接，取出存储卡准备用来启动树莓派电脑。

### 2.2 启动和配置树莓派电脑

- 将烧录好操作系统的 MicroSD 卡插入树莓派插槽中
- 通过 Mini HDMI 转接口连接电脑显示器
- 如需要使用鼠标键盘，可以通过 OTG 接口连接
- 接通电源线，树莓派电脑有绿色指示灯闪烁，树莓派电脑启动，可以在电脑显示屏上看到启动信心
- 原则上如果在烧录过程中已经设置了 WIFI 和开启了 SSH 服务，不需要任何其它配置
- 如需要体验树莓派操作系统或调整设置，可以借助鼠标键盘进行操作

至此，树莓派电脑已经成功安装。接下来就可以跟使用 Windows 或 MacOS 操作系统一样使用树莓派电脑了。

## 3. 连接 Waveshare 电子墨水屏并安装驱动调试

此次我购买和使用的是 Waveshare 4.26inch e-Paper HAT 带驱动版本的电子墨水屏。由于自带驱动板，连接比较容易，只需要将 40 针 GPIO 插入即可与树莓派电脑连接。
连接后，需要进行驱动程序的安装。安装步骤可以依照 Waveshare 官网的[详细说明](https://www.waveshare.com/wiki/4.26inch_e-Paper_HAT_Manual#Working_With_Raspberry_Pi)，在此仅描述几个关键步骤和安装过程中遇到的问题的解决方法。

其实 Waveshare 官网已经给出了非常详细的安装及测试步骤，但由于在大陆很多资源不能按正常方式获得，所以在执行官网步骤之前，可以先做以下调整。

- 软件库的镜像源替换。<br/>

  > 查看树莓派操作系统系统版本。

  ```
  lsb_release -a
  ```

  <img src="/assets/images/blog/linux-relese.png" height="100px"><br/>

  > 打开[清华大学 Raspbian 软件仓库](https://mirrors.tuna.tsinghua.edu.cn/help/raspbian/)，选择操作系统版本，并复制软件仓库地址。编辑 sources.list，将软件仓库地址配置在文件中。

  ```
  sudo nano /etc/apt/sources.list
  ```

  <img src="/assets/images/blog/debian-source.png" width="800px"><br/>

  > 打开[Raspberrypi 软件仓库](https://mirrors.tuna.tsinghua.edu.cn/help/raspberrypi/), 选择操作系统版本，并复制地址。编辑 raspi.list，将地址配置在文件中。

  ```
  sudo nano /etc/apt/sources.list.d/raspi.list
  ```

  <img src="/assets/images/blog/raspberrypi-source.png" width="600px"><br/>

  > 分别运行以下命令更新软件

  ```
  sduo apt-get update
  ```

  ```
  sudo apt-get upgrade
  ```

  > 参考文章：[树莓派替换镜像源](https://zhuanlan.zhihu.com/p/662655035)

- 安装 Waveshare 软件。参考[Waveshare 4.26inch e-Paper HAT Manual](https://www.waveshare.com/wiki/4.26inch_e-Paper_HAT_Manual#Working_With_Raspberry_Pi)
- 运行测试程序，如果电子屏幕有页面变化，证明已经成功安装电子屏相关软件

  ```c
  cd ~/e-Paper/RaspberryPi_JetsonNano/
  cd c
  sudo make clean
  sudo make -j4 EPD=epd4in26
  sudo ./epd
  ```

  ```python
  cd ~/e-Paper/RaspberryPi_JetsonNano/
  cd python/examples/
  python3 epd_4in26_test.py
  ```

## 应用安装及调试（PaperPi）

https://github.com/txoof/PaperPi

## 总结
