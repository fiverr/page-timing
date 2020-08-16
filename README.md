# page-timing [![](https://img.shields.io/npm/v/page-timing.svg)](https://www.npmjs.com/package/page-timing) [![](https://img.shields.io/badge/source--000000.svg?logo=github&style=social)](https://github.com/fiverr/page-timing) [![](https://circleci.com/gh/fiverr/page-timing.svg?style=svg)](https://circleci.com/gh/fiverr/page-timing) [![](https://badgen.net/bundlephobia/minzip/page-timing)](https://bundlephobia.com/result?p=page-timing)

⏱ Collect and measure browser performance metrics

> All metrics are converted to snake_case

```js
import { navigation, paint } from 'page-timing';

window.addEventListener(
    'load',
    () => {
        const metrics = {
            ...paint(),
            ...navigation()
        };

        fetch('/browser-performance-metrics', {
          method: 'POST',
          body: JSON.stringify({
            page_name: 'my page',
            metrics
          }),
        });
    }
);
```

## API endpoints

- `navigation`: [Navigation Timing](https://www.w3.org/TR/navigation-timing/#sec-navigation-timing-interface) [Illustration 🎨](#illustration-of-navigation-events)
- `paint`: [Paint Timing](https://w3c.github.io/paint-timing/#sec-PerformancePaintTiming)
- `assets`: Information about page resources when this function is called
- `connection`: [Network Information](https://developer.mozilla.org/en-US/docs/Web/API/NetworkInformation)
- `memory`: [Memory API information](https://developer.mozilla.org/en-US/docs/Web/API/Performance/memory)
- `display`: Screen and document information
- `dom`: Calculated metrics from the document object
- `elapsed`: Time when the measurements were taken
- `all`: A compound object containing all of the above
- [`measure`](#measure): A helper function: Add measure entries to [navigation timing API](https://www.w3.org/TR/navigation-timing/)


## Metrics
| Group | Name | Type | Meaning
| - | - | - | -
| **navigation** | `navigation_start` | _number_ | Termination of previous document upon navigating
| **navigation** | `unload_event_start` | _number_ | Previous document unload
| **navigation** | `unload_event_end` | _number_ |
| **navigation** | `redirect_start` | _number_ | Redirect from previous document
| **navigation** | `redirect_end` | _number_ |
| **navigation** | `fetch_start` | _number_ | Ready to fetch the document
| **navigation** | `domain_lookup_start` | _number_ |
| **navigation** | `domain_lookup_end` | _number_ |
| **navigation** | `duration` | _number_ | Difference between responseEnd and startTime
| **navigation** | `connect_start` | _number_ | Sent request to open a connection
| **navigation** | `connect_end` | _number_ |
| **navigation** | `secure_connection_start` | _number_ | Secure connection handshake
| **navigation** | `request_start` | _number_ | Request the document
| **navigation** | `response_start` | _number_ | Received the first byte of the response
| **navigation** | `response_end` | _number_ | Received the last byte of the response
| **navigation** | `dom_loading` | _number_ | Parser started work
| **navigation** | `dom_interactive` | _number_ | Parser finished work on main document. Changed document readyState to "interactive"
| **navigation** | `dom_content_loaded_event_start` | _number_ | Executed required scripts after parsing the document
| **navigation** | `dom_content_loaded_event_end` | _number_ |
| **navigation** | `dom_complete` | _number_ | Changed document readyState to "complete"
| **navigation** | `load_event_start` | _number_ | Document fires "load" event
| **navigation** | `load_event_end` | _number_ |
| **navigation** | `transfer_size` | _number_ | Size (octets) of response headers and payload body
| **navigation** | `encoded_body_size` | _number_ | Size (octets) of _payload_ body
| **navigation** | `decoded_body_size` | _number_ | Size (octets) of _message_ body
| **navigation** | `worker_start` | _number_ | Time until service worker ran
| **paint** | `first_paint` | _number_ | User agent first rendered after navigation
| **paint** | `first_contentful_paint` | _number_ | Document contains at least one element that is paintable and contentful†
| **assets** | `final_asset_javascript_count` | _number_ | Total **number** of Javascript resources
| **assets** | `final_asset_javascript_load` | _number_ | Loading **time spent** on Javascript resources
| **assets** | `final_asset_javascript_size` | _number_ | Total **size** of Javascript resources
| **assets** | `final_asset_stylesheets_count` | _number_ | Total **number** of CSS resources
| **assets** | `final_asset_stylesheets_load` | _number_ | Loading **time spent** on CSS resources
| **assets** | `final_asset_stylesheets_size` | _number_ | Total **size** of CSS resources
| **assets** | `final_asset_images_count` | _number_ | Total **number** of image resources
| **assets** | `final_asset_images_load` | _number_ | Loading **time spent** on image resources
| **assets** | `final_asset_images_size` | _number_ | Total **size** of image resources
| **assets** | `final_asset_other_count` | _number_ | Total **number** of other resources
| **assets** | `final_asset_other_load` | _number_ | Loading **time spent** on other resources
| **assets** | `final_asset_other_size` | _number_ | Total **size** of other resources
| **connection** | `connection_type` | _string_ | bluetooth, cellular, ethernet, none, wifi, wimax, other, unknown
| **connection** | `effective_bandwidth` | _number_ | Mbps
| **connection** | `effective_connection_type` | _string_ | slow-2g, 2g, 3g, 4g
| **connection** | `effective_max_bandwidth` | _number_ | Mbps
| **connection** | `reduced_data_usage` | _boolean_ | Vendor's "Data Saver" feature enables
| **connection** | `round_trip_time` | _number_ | Estimated effective round-trip in ms
| **connection** | `navigation_type` | _string_ | [navigate, reload, back_forward, prerender](https://w3c.github.io/navigation-timing/#dom-performancenavigationtiming-type)
| **memory** | `js_heap_size_limit` | _number_ | Maximum bytes available for JS heap
| **memory** | `total_js_heap_size` | _number_ | Total allocated bytes for JS heap
| **memory** | `used_js_heap_size` | _number_ | Currently active bytes of JS heap
| **display** | `window_inner_height` | _number_ | Height of the window's layout viewport
| **display** | `window_inner_width` | _number_ | Width of the window's layout viewport
| **display** | `screen_color_depth` | _number_ | Color depth of the screen
| **display** | `screen_pixel_depth` | _number_ | Bit depth of the screen
| **display** | `screen_orientation_type` | _string_ | landscape-primary, landscape-secondary, portrait-primary, portrait-secondary
| **dom** | `final_dom_node_count` | _number_ | Total number of nodes under the document object
| **dom** | `final_dom_nest_depth` | _number_ | Highest nesting depth of DOM element under the document
| **dom** | `final_html_size` | _number_ | Character count of the HTML document
| **elapsed** | `page_time_elapsed` | _number_ | milliseconds elapsed since the time origin

> † **contentful** element: A visible element which contains non empty text, media content or input.

## More functions
### `fps`
Measure page frame rate at a certain point in time
```js
import { fps } from 'page-timing';

const frames_per_second = await fps();
console.log({ frames_per_second });
```
Increase sample rate by checking more than one second. (Result is still in frames per second)
```js
const frames_per_second = await fps({ sample: 5 });
console.log({ frames_per_second });
```

### `measure`
Wrap a function and measure it's execution time in milliseconds into a [performance measure](https://developer.mozilla.org/en-US/docs/Web/API/Performance/measure) entry.

```js
import { measure } from 'page-timing';

async function myFunction(
    await wait(50);
    doSomethingElse();
}

await measure(myFunction, 'my-function');

// Example: Convert entries to a named array
Object.assign(
    ...performance.getEntriesByType('measure').map(
        ({ name, duration }) => ({[name]: duration})
    )
);
// {my-function: 53.35999990347773}

// Example: Retrieve a specific entry
const { duration } = performance.getEntriesByName('my-function');
// 53.35999990347773
```

## Illustration of navigation events

[![](https://www.w3.org/TR/navigation-timing/timing-overview.png)](https://www.w3.org/TR/navigation-timing/)

## Bonus
Also send [web vitals](https://web.dev/vitals/), a simple example
```js
import { all } from 'page-timing';
import { getLCP, getFID, getCLS } from 'web-vitals';

window.addEventListener(
    'load',
    () => {
        // Send metrics from browser performance API
        send(all());

        // Send web vitals to the same endpoint
        [
            [getLCP, 'largest_contentful_paint'],
            [getFID, 'first_input_delay'],
            [getCLS, 'comulative_layout_shift'],
        ].forEach(
            ([ fn, name ]) => fn(
                ({ value }) => send({ [name]: value })
            )
        );
    }
);

const send = metrics => fetch('/browser-performance-metrics', {
  method: 'POST',
  body: JSON.stringify({ page_name: 'my page', metrics }),
});

```
