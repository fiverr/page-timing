import 'regenerator-runtime';
import { getLCP, getFID, getCLS } from 'web-vitals';
import TTI from 'tti-polyfill';
import { fps, all } from '../src/index.js';

window.addEventListener(
    'load',
    () => {
        window.performance_information = {};

        all().then((result) => {
            console.log('all', performance.now());
            Object.assign(window.performance_information, result);
            print();
        }).catch(console.error);

        [
            [getLCP, 'largest_contentful_paint'],
            [getFID, 'first_input_delay'],
            [getCLS, 'comulative_layout_shift']
        ].forEach(
            ([ fn, name ]) => fn(
                ({ value }) => {
                    console.log(name, performance.now());
                    window.performance_information[name] = value;
                    print();
                }
            )
        );

        fps().then((result) => {
            console.log('fps', performance.now());
            window.performance_information.frames_per_second = result;
            print();
        }).catch(console.error);

        TTI.getFirstConsistentlyInteractive().then((result) => {
            console.log('tti', performance.now());
            window.performance_information.time_to_interactive = result || undefined;
            print();
        }).catch(console.error);

        function print() {
            document.querySelector('table').innerHTML = Object.entries(window.performance_information).map(
                ([key, value]) => `<tr><td>${key}</td><td>${value}</td></tr>`
            ).join('');
        }
    },
    { once: true }
);
