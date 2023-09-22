
## Introduction

This is a nodeJs based application , which based Express with Nodejs16. 

## Installation

```console
$ npm install 
```

## Launch Service

```console
$ npm run serve 
```

## Loading Mock data

```console
$ npm run load
```

Mock data base dir: /tsc-service/tsc/utl/data/
Mock data example:
```console
{
  "HOMELESS_ID": "a570271f-f8b6-4a07-999f-9b36f5b5c5ef",
  "BIRTHDAY": "2002-04-26",
  "COMMENTS": [
        {
          "COMMENT_AVANTAR": "https://img95.699pic.com/xsj/08/wg/1v.jpg%21/fh/300",
          "COMMENT_TAG": "Healthcare",
          "COMMENT_TIME": "2023-10-20 22:47:05",
          "COMMENT_USER": "Preston",
          "COMMENT_ORG": "Hospital of Delaware"
        }
        ,
        {
          "COMMENT_AVANTAR": "https://img95.699pic.com/xsj/08/wg/1v.jpg%21/fh/300",
          "COMMENT_TAG": "Provide Job",
          "COMMENT_TIME": "2023-04-05 22:47:05",
          "COMMENT_USER": "Brinly",
          "COMMENT_ORG": "IBM"
        }
        ,
        {
          "COMMENT_AVANTAR": "https://img95.699pic.com/xsj/08/wg/1v.jpg%21/fh/300",
          "COMMENT_TAG": "Provide Job",
          "COMMENT_TIME": "2024-04-11 22:47:05",
          "COMMENT_USER": "Journey",
          "COMMENT_ORG": "Apple"
        }
  ],
  "ENTER_DATE": "2022-12-10 22:47:05",
  "ENTER_USER": "SYSTEM",
  "IMAGE": "https://img95.699pic.com/xsj/08/wg/1v.jpg%21/fh/300",
  "JOIN_DATE": "2023-02-26",
  "NAME": "John",
  "ORG1": true,
  "ORG8": true,
  "ORG6": true,
  "SERVICE3": true,
  "SERVICE5": true,
  "ORG_SERVICE": {
      "ORG1": {
          "ORG_NAME": "Hospital of Delaware",
          "SERVICE3": {
              "SERVICE_NAME": "Healthcare",
              "START_DATE": "2024-05-15",
              "PROGRESS_DETAIL": [
                  {
                      "DESC": "Work on phase3",
                      "TIME": "2023-12-01 22:47:05"
                  }
              ],
              "END_DATE": "2023-11-08"
          }
      }
      ,
      "ORG6": {
          "ORG_NAME": "Apple",
          "SERVICE5": {
              "SERVICE_NAME": "Provide Job",
              "START_DATE": "2024-01-30",
              "PROGRESS_DETAIL": [
                  {
                      "DESC": "Work on phase2",
                      "TIME": "2022-10-06 22:47:05"
                  }
                  ,
                  {
                      "DESC": "Work on phase3",
                      "TIME": "2023-04-16 22:47:05"
                  }
                  ,
                  {
                      "DESC": "Work on phase4",
                      "TIME": "2023-11-20 22:47:05"
                  }
                  ,
                  {
                      "DESC": "Work on phase3",
                      "TIME": "2024-03-12 22:47:05"
                  }
                  ,
                  {
                      "DESC": "Work on phase3",
                      "TIME": "2023-11-20 22:47:05"
                  }
              ],
              "END_DATE": "2023-12-30"
          }
      }
      ,
      "ORG8": {
          "ORG_NAME": "IBM",
          "SERVICE5": {
              "SERVICE_NAME": "Provide Job",
              "START_DATE": "2023-11-14",
              "PROGRESS_DETAIL": [
                  {
                      "DESC": "Work on phase3",
                      "TIME": "2023-03-12 22:47:05"
                  }
              ],
              "END_DATE": "2024-02-02"
          }
      }
  },
  "PERMANENT_DATE": "",
  "PHONE": "13215495241",
  "REQUEST": "Need heathcare",
  "STATUS": "UNASSIGNED"
}


```