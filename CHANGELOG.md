# 3.1.5

## Fixes

### Prevent breakage in older browsers that do not support 'navigation' entry type

# 3.1.4

## Fixes

### Return an empty object when 'paint' entries are not supported

# 3.1.3

## Fixes

### Fix failure to execute 'observe' on 'PerformanceObserver' and entryType in not accepted by browser.

# 3.1.1

## Fixes

### Add some backwards compatibility for older browsers

# 3.1.0

## Feature

### Add redirect_count to navigation metrics

# 3.0.1

## Fixes

### Null check for requestAnimationFrame
Escape execution for "fps" after requestAnimationFrame null check has failed

# 3.0.0

## Breaking changes

### Move to async interface
All functions have transformed to async functions.

By utilising PerformanceObserver, async interface allows to decouple from waiting for onload event. User can include an async file and not worry about loading time.

Here are migration examples:

#### Before
```js
const metrics = navigation();
```

#### After
```js
const metrics = await navigation();
```

#### Before
```js
send(all());
```

#### After
No need to wait for window load
```js
all().then(send).catch(console.error);
```

#### Before
```js
const metrics = { ...paint(), ...navigation() };
```

#### After
```js
const metrics = Object.assign.apply(null, await Promise.all([ paint(), navigation() ]));
```

# 2.2.1

## Fixes

### Verify page_time_elapsed
Should not send null value. The rest of the library sends `undefined` when no value is available so it gets dropped in JSON stringification.

# 2.2.0

## New features

### Add navigation metrics
- `duration`: Difference between responseEnd and startTime
- `worker_start`: Time until service worker ran

### Add connection type
- `navigation_type`: [navigate, reload, back_forward, prerender](https://w3c.github.io/navigation-timing/#dom-performancenavigationtiming-type)

# 2.1.1

## Fixes

### Verify numbers are safe
Use max safe integer if result is higher

# 2.1.0

## New features

### Add time elapsed
Time elapsed allows us to have a relative point of comparison between the different measuring.

- `page_time_elapsed`: milliseconds elapsed since the time origin

# 2.0.1

## Fixes
Support for internet explorer Number functions (fallback from Number object to global functions)

# 2.0.0

## Breaking changes

### New interface
Completely new interface. Instead of a callback, expose functions that return structured data. It's different
