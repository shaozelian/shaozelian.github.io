---
layout: post
author: Shao Zelian
title: Build cross-platforms development using MAUI on MacOS
excerpt: MAUI was released for a couple of years. It is very helpful to .net developers...
category: Technologies
tags: .net
---

MAUI was released for a couple of years by Microsoft. It is very helpful for .net developers to build cross-platforms applications in Windows, Android, iOS and even MacOS. Especially normally .net developers are used to Microsoft tech stacks and not willing or take long-time leraning curve to catch up new development technologies by Google or Apple.

This article mainly focus on setting up a local MAUI development environment in MacOS. It includes the toolings, detailed steps and also a small hello-world demo. Finally the demo is able to run in Android, iOS and MacOS emulators successfully. So, let's start...

## Preparations

The followings are used in my case.

| Type              | Resource                           | Remark                                                        |
| ----------------- | ---------------------------------- | ------------------------------------------------------------- |
| Hardware          | Mackbook Pro <br/> (Apple silicon) | Development Machine                                           |
| Software          | Xcode 26.0.1                       | By Nov-25, version 26.1 and above versions are not supported. |
| Software          | Android Studio                     | Latest version                                                |
| SDK               | Android SDK                        | Latest version                                                |
| SDK               | Java SDK                           | Version >= 17                                                 |
| Software          | Visual Studio Code                 | Latest version                                                |
| SDK               | .NET SDK                           | version 9.0                                                   |
| VSCode Extensions | C#, C# Dev Kit, .NET MAUI          |                                                               |

## Setup Steps

&nbsp;

### Step #1: Install above software, SDK and VScode extensions.

Something important need pay attention to during installation.

- Java SDK.

  > Java runtime environment is one of key dependencies for others like Xcode, Android Studio, etc. So it is better to install it first. (Note: I downloaded from Microsoft ([Download the Microsoft Build of OpenJDK](https://learn.microsoft.com/en-us/java/openjdk/download))

  > Check if $JAVA_HOME and version is correctly configured or not. If correct path is retured, ignore the next JAVA_HOME configuration steps.

  ```bash
  # Check JAVA_HOME system variable
  % echo $JAVA_HOME
  # Check Java version
  % java -version
  ```

  > To configure $JAVA_HOME, find where java home is firstly using following commands (notes: not all of them are necessarily used.). Remember the path found out.

  ```bash
  % $(dirname $(readlink $(which javac)))/java_home
  # or use java command to find
  % java -XshowSettings:properties -version
  % java -XshowSettings:properties -version 2>&1 > /dev/null | grep 'java.home'
      java.home = /Users/{your username}}/Library/Java/JavaVirtualMachines/corretto-19.0.2/Contents/Home
  ```

  > Configure $JAVA_HOME and \bin in $PATH in ~/.bashrc and ~/.zshrc files. Add the following lines in the end of the two files.

  ```bash
  # Add JAVA_HOME
  export JAVA_HOME="/Users/{your username}/Library/Java/JavaVirtualMachines/corretto-19.0.2/Contents/Home"
  export PATH="$JAVA_HOME/bin:$PATH"
  ```

  > Open a new Terminal window to check if JAVA_HOME is correctly configured.

  ```bash
  # Check JAVA_HOME system variable
  % echo $JAVA_HOME
  # Check Java version
  % java -version
  ```

- Android Studio

  > Download from [Google Developers - Android Studio](https://developer.android.com/studio)

  > Open Android Studio, go to "Settings" --> "SDK Manager" --> "SDK Tools" tab. Make sure "Android SDK Build-tools", "Android SDK Command-line Tools (latest)", "Android Emulator" and "Android SDK Platform-Tools" are selected and installed.

  > Remember the Android SDK location. It is to be configured as $ANDROID_HOME sytem variable.

  > Configure $ANDROID_HOME in ~/.bashrc and ~/.zshrc files.

  ```bash
   # Add ANDROID_HOME
   export ANDROID_HOME="/Users/{your username}/Library/Android/sdk"
  ```

  > Open a new Terminal window to check if ANDROID_HOME is correctly configured.

  ```bash
  % echo $ANDROID_HOME
  ```

- Xcode

  > Only Xcode command line might not be enough. Xcode app should be installed because device emulators are used for debugging and running locally.

  > Don't install Xcode from Mac App Store directly because Microsoft MAUI may not support the latest Xcode version. In my case, Xcode 26.1 is not supported. I had to install Xcode 26.0 specially.

  > Download Xcode from [Apple Resources](https://developer.apple.com/xcode/resources/). Select "View available Xcode betas" link (important). You may be asked for Apple account login. On the download page, slect the suitable version to download the installation package.

  > The package is named like "Xcode_26.0.1_Apple_silicon.xip". Double click it to uncompress. This will take some time.

  > Rename uncompressed file "Xcode" as "Xcode_26.0.1" to reflect version number.

  > Copy the renamed Xcode file into "Applications". It will trig the migration and take some time.

  > Open the Xcode by run it through the command. You may be asked to download additional platform support like iOS simulator, watchOS, tvOS and visionOS. Choose as what simulator(s) you want to use.

  ```bash
  % /Applications/Xcode_26.0.1.app/Contents/MacOS/Xcode
  ```

  > Select menu "Xcode" --> "Settings" --> "Locations", select "Command Line Tools" to use the path "/Applications/Xcode_26.0.1.app" NOT the path of "Download" folder or other version's Xcode.

- Visusal Studio Code

  > Download from [official website](https://code.visualstudio.com/).

  > Install Visusal Studio Code and its Extensions including C#, C# Dev Kit and .NET MAUI.

- Accept Android Licenses

  > This step is to remove errors of .NET MAUI project in later steps.

  > Make sure the previous steps are done. Android SDK is installed. Android Command Line Tool is installed. $JAVA_HOME and $ANDROID_HOME are configured correctly.

  > Run command line using elevated permission (Assume the Android SDK is installed in the path below). Accept all the promopted questions by input "y" (yes).

  ```base
    % sudo /Users/{your username}/Library/Android/sdk/cmdline-tools/latest/bin/sdkmanager --licenses
  ```

### Step #2: Create MAUI Project in VSCode

- Open VSCode. Open command palette by shortcut "Cmd+Shift+P".
- Select command ".NET: New Project..." --> ".NET MAUI App" --> "{your project name}"...
- Make sure the created new project is opened in VScode. By default, it can be runned without any changes. Our target is to run it in different platforms / simulators including Maccatalyst, iOS and Android. <br/> (Note: Windows platform is not supported in MacOS. Refer to [the article](https://learn.microsoft.com/en-us/dotnet/maui/get-started/installation?view=net-maui-10.0&tabs=visual-studio-code))

  | Your Operating System | Supported Target Platforms |
  | --------------------- | -------------------------- |
  | Windows               | Windows, Android           |
  | macOS                 | Android, iOS, macOS        |
  | Linux                 | Android                    |

- Open Terminal window by select menu "Terminal". By default, the current path is the path of your .NET solution. For example,

  ```bash
    # "dotnet-learn" is the path where my .net solution file is located.
    dotnet-learn %
  ```

### Step #3: Run Application in Simulators

- In VSCode, open .csproj file in project folder.
- VSCode will automatically do some pre-checks for a few seconds. You may find loading icons populated in status bar at the bottom of VSCode.
- Once pre-checks are done. Click "{} XML" toolbar button. It will show the readiness of running the project similar as below.
  <img src="/assets/images/blog/2025-11-01-vscode-maui-project.png"/>
- Select the links to configure the project. Normally you should configure as below.
  > "Launch Configuration" > a simulator: Android/iOS phone, iPad, etc.
  > "C# Startup Project" > your MAUI project name.
  > "Debug Target Framework" > .net9.0-iOS, .net9.0-android or .net9.0-maccatalyst
- After configuration, click "Run and Debug" button in the left toolbar of VSCode.
- Click the link "create a launch.json file". This will create launch.json file in project folder ".vscode/launch.json". Accept the default and some json configuraiton code lines are generated in the file. Save the default, for example ".NET MAUI" in my case.
- In the "Run and Debug" section, make sure ".NET MAUI" is selected in the dropdown. Click the arrow button or press F5 to run the application.
- After the build is done, the select simulator will be started. Your app will be installed and started in the simulator.
- You may play the app to experience the demo.
- You can also switch to different simulator and platform by change the configuration.

## End

Till now, the first MAUI project is set up and able to run successfully in different simulators of platforms. Enjoy MAUI for cross-platforms development and have fun!
