---
external: false
title: The meaning of status code
description: "A comprehensive guide to HTTP status codes"
date: 2022-11-22
---

## This is a status code meaning

```
=====================================================================
Information [100 - 199]			==		Success [200 - 299]
---------------------------------------------------------------------
100 - Continue					==		200 - Ok
101 - Switching Protocols		==		201 - Created
102 - Processing				==		202 - Accepted
103 - Early Hints				==		204 - No Content
								==		206 - Partial Content
======================================================================
Redirect [300 - 399]			==		Client Error [400 - 499]
----------------------------------------------------------------------
300 - Multiple Choices			==		400 - Bad Request
301 - Moved Permanantly			==		401 - Unauthorized
302 - Found (Previously -
Moved Temporarily)				==		402 - Payment Required
304 - Not Modified				==		403 - Forbidden
307 - Temporary Redirect		==		404 - Not Found
308 - Permanant Redirect		==		409 - Conflict
======================================================================
				Server Error [500 - 599]
----------------------------------------------------------------------
				500 - Internal Server Error
				501 - Not Implemented
				502 - Bad Gateway
				503 - Service Unavailable
				504 - Gateway timeout
=======================================================================
```