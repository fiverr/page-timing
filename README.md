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

- **navigation**: [Navigation Timing](https://www.w3.org/TR/navigation-timing/#sec-navigation-timing-interface) [Illustration 🎨](#illustration-of-navigation-events)
- **paint**: [Paint Timing](https://w3c.github.io/paint-timing/#sec-PerformancePaintTiming)
- **assets**: Information about page resources when this function is called
- **connection**: [Network Information](https://developer.mozilla.org/en-US/docs/Web/API/NetworkInformation)
- **memory**: [Memory API information](https://developer.mozilla.org/en-US/docs/Web/API/Performance/memory)
- **display**: Screen and document information
- **dom**: Calculated metrics from the document object
- **elapsed**: Time when the measurements were taken
- **all**: A compound object containing all of the above
- [**measure**](#measure): A helper function: Add measure entries to [navigation timing API](https://www.w3.org/TR/navigation-timing/)


## Metrics
| Name | Meaning | Group | Type
| - | - | - | -
| navigation_start | Termination of previous document upon navigating | **navigation** | _number_
| unload_event_start | Previous document unload | **navigation** | _number_
| unload_event_end | | **navigation** | _number_
| redirect_start | Redirect from previous document | **navigation** | _number_
| redirect_end | | **navigation** | _number_
| fetch_start | Ready to fetch the document | **navigation** | _number_
| domain_lookup_start | | **navigation** | _number_
| domain_lookup_end | | **navigation** | _number_
| duration | Difference between responseEnd and startTime | **navigation** | _number_
| connect_start | Sent request to open a connection | **navigation** | _number_
| connect_end | | **navigation** | _number_
| secure_connection_start | Secure connection handshake | **navigation** | _number_
| request_start | Request the document | **navigation** | _number_
| response_start | Received the first byte of the response | **navigation** | _number_
| response_end | Received the last byte of the response | **navigation** | _number_
| dom_loading | Parser started work | **navigation** | _number_
| dom_interactive | Parser finished work on main document. Changed document readyState to "interactive" | **navigation** | _number_
| dom_content_loaded_event_start | Executed required scripts after parsing the document | **navigation** | _number_
| dom_content_loaded_event_end | | **navigation** | _number_
| dom_complete | Changed document readyState to "complete" | **navigation** | _number_
| load_event_start | Document fires "load" event | **navigation** | _number_
| load_event_end | | **navigation** | _number_
| transfer_size | Size (octets) of response headers and payload body | **navigation** | _number_
| encoded_body_size | Size (octets) of _payload_ body | **navigation** | _number_
| decoded_body_size | Size (octets) of _message_ body | **navigation** | _number_
| worker_start | Time until service worker ran | **navigation** | _number_
| first_paint | User agent first rendered after navigation | **paint** | _number_
| first_contentful_paint | Document contains at least one element that is paintable and [contentful †](#user-content-contentful) | **paint** | _number_
| first_image_paint | TBD | **paint** | _number_
| final_asset_javascript_count | Total **number** of Javascript resources | **assets** | _number_
| final_asset_javascript_load | Loading **time spent** on Javascript resources | **assets** | _number_
| final_asset_javascript_size | Total **size** of Javascript resources | **assets** | _number_
| final_asset_stylesheets_count | Total **number** of CSS resources | **assets** | _number_
| final_asset_stylesheets_load | Loading **time spent** on CSS resources | **assets** | _number_
| final_asset_stylesheets_size | Total **size** of CSS resources | **assets** | _number_
| final_asset_images_count | Total **number** of image resources | **assets** | _number_
| final_asset_images_load | Loading **time spent** on image resources | **assets** | _number_
| final_asset_images_size | Total **size** of image resources | **assets** | _number_
| final_asset_other_count | Total **number** of other resources | **assets** | _number_
| final_asset_other_load | Loading **time spent** on other resources | **assets** | _number_
| final_asset_other_size | Total **size** of other resources | **assets** | _number_
| connection_type | bluetooth, cellular, ethernet, none, wifi, wimax, other, unknown | **connection** | _string_
| effective_bandwidth | Mbps | **connection** | _number_
| effective_connection_type | slow-2g, 2g, 3g, 4g | **connection** | _string_
| effective_max_bandwidth | Mbps | **connection** | _number_
| reduced_data_usage | Vendor's "Data Saver" feature enables | **connection** | _boolean_
| round_trip_time | Estimated effective round-trip in ms | **connection** | _number_
| navigation_type | [navigate, reload, back_forward, prerender](https://w3c.github.io/navigation-timing/#dom-performancenavigationtiming-type) | **connection** | _string_
| js_heap_size_limit | Maximum bytes available for JS heap | **memory** | _number_
| total_js_heap_size | Total allocated bytes for JS heap | **memory** | _number_
| used_js_heap_size | Currently active bytes of JS heap | **memory** | _number_
| window_inner_height | Height of the window's layout viewport | **display** | _number_
| window_inner_width | Width of the window's layout viewport | **display** | _number_
| screen_color_depth | Color depth of the screen | **display** | _number_
| screen_pixel_depth | Bit depth of the screen | **display** | _number_
| screen_orientation_type | landscape-primary, landscape-secondary, portrait-primary, portrait-secondary | **display** | _string_
| final_dom_node_count | Total number of nodes under the document object | **dom** | _number_
| final_dom_nest_depth | Highest nesting depth of DOM element under the document | **dom** | _number_
| final_html_size | Character count of the HTML document | **dom** | _number_
| page_time_elapsed | milliseconds elapsed since the time origin | **elapsed** | _number_

<a name="contentful">

> † **contentful** element: A visible element which contains non empty text, media content or input.

</a>

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
A simple example to add [web vitals](https://web.dev/vitals/) and [TTI](https://docs.google.com/document/d/1GGiI9-7KeY3TPqS3YT271upUVimo-XiL5mwWorDUD4c/preview)

```bash
npm i page-timing web-vitals tti-polyfill
```

```js
import { all, connection } from 'page-timing';
import { getLCP, getFID, getCLS } from 'web-vitals';
import TTI from 'tti-polyfill';

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
                ({ value }) => send({
                    [name]: value,
                    ...connection() // Some connection info
                })
            )
        );

        TTI.getFirstConsistentlyInteractive().then(
            (time_to_interactive) => send({
                time_to_interactive,
                ...connection() // Some connection info
            })
        ).catch(() => null)
    }
);

const send = metrics => fetch('/browser-performance-metrics', {
  method: 'POST',
  body: JSON.stringify({ page_name: 'my page', metrics }),
});

```
