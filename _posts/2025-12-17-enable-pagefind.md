---
layout: post
author: Shao Zelian
title: Pagefind plugin with Jekyll
excerpt: Adding search to a static website is particularly useful when the website contains a large amount of content or when the content is frequently updated. Pagefind is a static search library that can be integrated with various website frameworks. It aims to provide efficient search functionality while minimizing bandwidth usage and without requiring additional infrastructure.
category: Technologies
tags: blog, jekyll
---

Adding search to a static website is particularly useful when the website contains a large amount of content or when the content is frequently updated. [Pagefind](https://pagefind.app/) is a static search library that can be integrated with various website frameworks. It aims to provide efficient search functionality while minimizing bandwidth usage and without requiring additional infrastructure.

In this article, I will demostrate how to enable Pagefind in my Jekyll website.

## Assumptions

- IDE environment: Windows + Visual Studio Code
- A static blog website built using Jekyll framework.
- The website is hosted in GitHub Pages and the source is from main branch of GitHub repository with default Jekyll configuration.
- Local development/debugging environment is set up.

_For Jekyll website set-up, you may refer to my another articles [how to set up Jekyll for personal webiste](/technologies/2025/05/18/jekyll.html)._

## Targets

- To set up Pagefind in existing local development/debugging environment.
- Enable content indexing and search for the published \_site directory.
- Configure GitHub workflow action to automatically enable Pagefind for production website in GitHub Pages.

## Step1 - Pagefind Setup in Local Environment

1. Set up [nodejs](https://nodejs.org/)
2. Open website source code using VSCode.
3. Create folder "\_plugins" under the root folder.
4. Create a file named "pagefind_hook.rb" and update it using the code lines below.

   ```ruby
   Jekyll::Hooks.register :site, :post_write do |site|
        puts ">>> Pagefind hook triggered for #{site.dest}"
        system("npx pagefind --source \"#{site.dest}\"")
   end
   ```

5. Create "search.md" file for Pagefind search page. Code as below.

   ```html
   --- layout: default title: Site Search permalink: /search/ ---
   <link href="/_pagefind/pagefind-ui.css" rel="stylesheet" />
   <script src="/_pagefind/pagefind-ui.js"></script>
   <div id="search"></div>
   <script>
     window.addEventListener("DOMContentLoaded", (event) => {
       new PagefindUI({ element: "#search", showSubResults: true });
     });
   </script>
   ```

6. Run command to indexing content under \_site folder.

   ```ruby
   jekyll serve
   ```

   ```ruby
    ...
    >>> Pagefind hook triggered for C:/Users/xxx/source/repos/xxx/_site
    Running Pagefind v1.4.0 (Extended)
    Running from: "C:/Users/xxx/source/repos/xxx"
    Source:       "_site"
    Output:       "_site\\pagefind
    ...
   ```

7. Preview search by "<https://localhost:4000/search>"

## Step 2: Integrate Pagefind into GitHub Actions

By default,

- GitHub Pages builds websites using Jekyll in “safe mode”.
- In safe mode, custom plugins in "\_plugins/" are ignored. That means the pagefind_hook.rb never runs on GitHub’s servers.
- Pagefind itself is a Node-based tool, not a Ruby gem, so GitHub Pages won’t install or execute it during the build.

To enable Pagefind, we have to override using customized GitHub action. Here're steps:

1. Goto [GitHub](https://github.com/) and open your repository.
2. Navigate to "Settings > Pages".
3. Under "Build and deployment" section. Change Source from "Deploy from a branch" to "GitHub Actions".
4. Click "Configure" button of Jekyll template. It will automatically create a yaml file "jekyll.yml".
5. Rename to ".github/workflows/jekyll_node_pagefind_deploy.yml".
6. Update the yml file.

   Find the code below.

   ```ruby
   ...
           env:
          JEKYLL_ENV: production
   ```

   Add below code lines after above lines.

   ```yaml
        # 👉 Add Node + Pagefind here
        - name: Setup Node.js
            uses: actions/setup-node@v4
            with:
            node-version: '20'

        - name: Install Pagefind
            run: npm install -g pagefind

        - name: Run Pagefind
            run: pagefind --source "_site"

        - name: Upload artifact
            # Automatically uploads an artifact from the './_site' directory by default
            uses: actions/upload-pages-artifact@v3
   ```

7. Commit the GitHub action. It will automaticall trigger the build and deployment.
8. Review final result by "<https://yoursite/search>".
