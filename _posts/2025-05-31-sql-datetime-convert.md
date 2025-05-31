---
layout: post
author: Shao Zelian
title: SQL - Format date time using CONVERT function
category: Technologies
tags: SQL
excerpt: CONVERT can be used to format DATETIME or SMALLDATETIME.
---

## CONVERT function | ***CONVERT(nvarchar(10), count_time, 121)*** <br/>
> 1st arg | size after conversion.<br/>
> 2nd arg | target date time.<br/>
> 3rd arg | format.<br/>

## Here's the format table. <br/>

 #  | Code | Format  
----------|-------:|--------
0 | 0  or  100 | mon dd yyyy hh:miAM(或PM) 
1 | 101 | mm/dd/yy 
2 | 102 | yy-mm-dd 
3 | 103 | dd/mm/yy 
4 | 104 | dd-mm-yy 
5 | 105 | dd-mm-yy
6 | 106 | dd mon yy
7 | 107 | mon dd,yy
8 | 108 | hh:mm:ss 
9 | 9  or  109 | mon dd yyyy hh:mi:ss:mmmmAM(或PM)
10 | 110 | mm-dd-yy
11 | 111 | yy/mm/dd
12 | 112 | yymmdd
11| 13  or  113 | dd mon yyyy hh:mi:ss:mmm(24小时制) 
14 | 114 | hh:mi:ss:mmm(24小时制)
15 | 20  or  120 | yyyy-mm-dd hh:mi:ss(24小时制)
16 | 21  or  121 | yyyy-mm-dd hh:mi:ss:mmm(24小时制)

## Samples

 SQL  | Output
----------|-------
SELECT  CONVERT ( varchar (100), GETDATE(), 0) | 05 16 2006 10:57AM
SELECT  CONVERT ( varchar (100), GETDATE(), 1) | 05/16/06
SELECT  CONVERT ( varchar (100), GETDATE(), 2) | 06.05.16
SELECT  CONVERT ( varchar (100), GETDATE(), 3) | 16/05/06
SELECT  CONVERT ( varchar (100), GETDATE(), 4) | 16.05.06
SELECT  CONVERT ( varchar (100), GETDATE(), 5) | 16-05-06
SELECT  CONVERT ( varchar (100), GETDATE(), 6) | 16 05 06
SELECT  CONVERT ( varchar (100), GETDATE(), 7) | 05 16, 06
SELECT  CONVERT ( varchar (100), GETDATE(), 8) | 10:57:46
SELECT  CONVERT ( varchar (100), GETDATE(), 9) | 05 16 2006 10:57:46:827AM
SELECT  CONVERT ( varchar (100), GETDATE(), 10) | 05-16-06
SELECT  CONVERT ( varchar (100), GETDATE(), 11) | 06/05/16
SELECT  CONVERT ( varchar (100), GETDATE(), 12) | 060516
SELECT  CONVERT ( varchar (100), GETDATE(), 13) | 16 05 2006 10:57:46:937
SELECT  CONVERT ( varchar (100), GETDATE(), 14) | 10:57:46:967
SELECT  CONVERT ( varchar (100), GETDATE(), 20) | 2006-05-16 10:57:47
SELECT  CONVERT ( varchar (100), GETDATE(), 21) | 2006-05-16 10:57:47.157
SELECT  CONVERT ( varchar (100), GETDATE(), 22) | 05/16/06 10:57:47 AM
SELECT  CONVERT ( varchar (100), GETDATE(), 23) | 2006-05-16
SELECT  CONVERT ( varchar (100), GETDATE(), 24) | 10:57:47
SELECT  CONVERT ( varchar (100), GETDATE(), 25) | 2006-05-16 10:57:47.250
SELECT  CONVERT ( varchar (100), GETDATE(), 100) | 05 16 2006 10:57AM
SELECT  CONVERT ( varchar (100), GETDATE(), 101) | 05/16/2006
SELECT  CONVERT ( varchar (100), GETDATE(), 102) | 2006.05.16
SELECT  CONVERT ( varchar (100), GETDATE(), 103) | 16/05/2006
SELECT  CONVERT ( varchar (100), GETDATE(), 104) | 16.05.2006
SELECT  CONVERT ( varchar (100), GETDATE(), 105) | 16-05-2006
SELECT  CONVERT ( varchar (100), GETDATE(), 106) | 16 05 2006
SELECT  CONVERT ( varchar (100), GETDATE(), 107) | 05 16, 2006
SELECT  CONVERT ( varchar (100), GETDATE(), 108) | 10:57:49
SELECT  CONVERT ( varchar (100), GETDATE(), 109) | 05 16 2006 10:57:49:437AM
SELECT  CONVERT ( varchar (100), GETDATE(), 110) | 05-16-2006
SELECT  CONVERT ( varchar (100), GETDATE(), 111) | 2006/05/16
SELECT  CONVERT ( varchar (100), GETDATE(), 112) | 20060516
SELECT  CONVERT ( varchar (100), GETDATE(), 113) | 16 05 2006 10:57:49:513
SELECT  CONVERT ( varchar (100), GETDATE(), 114) | 10:57:49:547
SELECT  CONVERT ( varchar (100), GETDATE(), 120) | 2006-05-16 10:57:49
SELECT  CONVERT ( varchar (100), GETDATE(), 121) | 2006-05-16 10:57:49.700
SELECT  CONVERT ( varchar (100), GETDATE(), 126) | 2006-05-16T10:57:49.827
SELECT  CONVERT ( varchar (100), GETDATE(), 130) | 18 ???? ?????? 1427 10:57:49:907AM
SELECT  CONVERT ( varchar (100), GETDATE(), 131) | 18/04/1427 10:57:49:920AM
